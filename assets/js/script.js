document.addEventListener("DOMContentLoaded", async () => {
    const main = document.querySelector(".main-content");
    const sidebar = document.querySelector(".sidebar-inner");
    const headerLabel = document.querySelector(".header-label");
    const nextButton = document.getElementById("nextButton");
    const progressFill = document.getElementById("progressFill");

    let group = localStorage.getItem("group") || "1";
    let lang = localStorage.getItem("lang") || "en";
    localStorage.setItem("group", group);
    localStorage.setItem("lang", lang);

    const res = await fetch("assets/data/questions.json");
    const questions = await res.json();

    const savedQNumber = parseInt(localStorage.getItem("question")) || 0;

    // Find the index of the first entry that matches the saved question number
    currentIndex = questions.findIndex(q => q.question === savedQNumber);

    // Fallback: if not found, start at the beginning
    if (currentIndex === -1) currentIndex = 0;

    async function loadQuestion(index) {
        const q = questions[index];
        if (!q) {
            const lang = localStorage.getItem("lang") || "en";
            window.location.href = `final.html`;
            return;
        }

        // Save q globally for template JS
        window.q = q;
        localStorage.setItem("question", q.question);
        // Update header & progress
        headerLabel.textContent = `Question ${q.question} / ${questions[questions.length -1].question}`;
        progressFill.style.width = `${(index / questions.length) * 100}%`;

        // Load main template
        templateUrl = "";
        if(q.type == "review"){
          templateUrl = `assets/templates/${q.type}-${lang}.html`;
        }
        else{
          templateUrl = `assets/templates/group-${group}/${q.type}-${lang}.html`;
        }
        try {
            const templateRes = await fetch(templateUrl);
            main.innerHTML = await templateRes.text();
        } catch (err) {
            main.innerHTML = `<p>Error loading template: ${err.message}</p>`;
            return;
        }

        // Build sidebar from JSON
        let sidebarHtml = `<h2>${q.title}</h2>`;
        if (q.sidebar?.instructions) {
            sidebarHtml += `<p>${q.sidebar.instructions}</p>`;
        }

        // Multiselect
        if (q.sidebar?.select) {
            sidebarHtml += `
            <label for="actors">${q.sidebar.select.title}:</label>
            <select id="actors" name="actors" multiple="multiple">
                ${q.sidebar.select.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
            <button id="submitTask">Submit Task</button>
            `;
        }

        if (q.sidebar?.params) {
            sidebarHtml += `<div class="params-container">`;
            sidebarHtml += `<p class="params-title">Reference Data (Click to copy):</p>`;
            
            q.sidebar.params.forEach(p => {
                sidebarHtml += `
                    <div class="param-item" onclick="copyText('${p.value}', this)" data-label="${p.label}">
                        <span class="param-label">${p.label}</span>
                        <code class="param-value">${p.value}</code>
                        <span class="copy-status">Copied!</span>
                    </div>
                `;
            });
            sidebarHtml += `</div>`;
        }

    sidebar.innerHTML = sidebarHtml;

    var multi = document.getElementById("actors");

    if(multi) {
      new TomSelect("#actors", {
        plugins: ['remove_button'],
      });
    }
      
    // Show/hide submit button
    const sidebarSubmit = document.getElementById("submitTask");
    if (!sidebarSubmit) {
      // No multiselect → hide button
      if (document.getElementById("submitTask")) {
        document.getElementById("submitTask").style.display = "none";
      }
    } else {
      sidebarSubmit.onclick = () => {
        nextButton.disabled = false;
        const data = {};
        for(i = 0; i < multi.selectedOptions.length; i++){
          data[i] = multi.selectedOptions[i].value;
        }
        localStorage.setItem(`question-${q.question}`, JSON.stringify(data));
      };
    }

  const injectScript = (src, callback) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      if (callback) s.onload = callback;
      main.appendChild(s);
  };

  if (q.type === "review") {
      injectScript(`assets/templates/${q.type}.js`);
  } else {
      const varPath = `assets/templates/group-${group}/var-${lang}.js`;
      const logicPath = `assets/templates/group-${group}/${q.type}.js`;

      injectScript(varPath, function() {
          injectScript(logicPath);
      });
  }
  }

  nextButton.addEventListener("click", () => {
    currentIndex++;
    //nextButton.disabled = true;
    loadQuestion(currentIndex);
  });

  // Initial load
  loadQuestion(currentIndex);
});

function joinList(arr) {
    if (!arr || arr.length === 0) return "";
    if (arr.length === 1) return arr[0];
    const arrCopy = [...arr]; // Copy to avoid mutating original
    const last = arrCopy.pop();
    return arrCopy.join(", ") + " and " + last;
}

function copyText(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const status = element.querySelector('.copy-status');
        status.classList.add('visible');
        
        setTimeout(() => {
            status.classList.remove('visible');
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}