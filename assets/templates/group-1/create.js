// create-loaddata.js
(function () {

  if (!window.q || !q.body) return;

  const body = q.body;
  const start = Date.now();
  
  // Policy type logic
  document.getElementById("policyType").addEventListener("change", togglePolicyType);
  togglePolicyType();
  
  document.getElementById("provider").value = "https://AliceSmith/profile/card#me";
  
  // Accesible multi select
  const purposeSelect = new TomSelect('#purpose', {
      plugins: ['remove_button'],
      options: PURPOSES.options,
      optgroups: PURPOSES.groups,
      optgroupField: 'group',
      labelField: 'name',
      valueField: 'value',
      searchField: ['name', 'desc', 'value'],
      render: {
          optgroup_header: data => `<div class="optgroup-header">${data.label}</div>`,
          option: data => `<div><strong>${data.name}</strong><div>${data.desc}</div></div>`
      },
      onInitialize() {
          this.initialized = true;
      }
    });
    
  document.getElementById("purpose").tomselect = purposeSelect;
    
  fillFormFromJson(body);
  
  bindToggle("useDuration", "Duration");
  bindToggle("useDuration", "DurationYear");
  bindToggle("useDuration", "DurationMonth");
  bindToggle("useDuration", "DurationDay");
  bindToggle("useDuration", "DurationHour");
  bindToggle("useStartTime", "StartTime");
  bindToggle("useEndTime", "EndTime");
  bindToggle("useLocation", "Location");
  bindToggle("useUsage", "Usage");
  
  //permissions validation
  document.querySelectorAll('input[name="permission"]').forEach(cb => {
    cb.addEventListener("change", function () {
      const checkboxes = document.querySelectorAll('input[name="permission"]');
      const firstCheckbox = checkboxes[0];
      
      const oneChecked = Array.from(checkboxes).some(cb => cb.checked);
      
      if (oneChecked) {
        firstCheckbox.setCustomValidity("");
      }
    });
  });
  

  // Submit Form logic
  document.getElementById("policyForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const checkboxes = document.querySelectorAll('input[name="permission"]');
    oneChecked = [...checkboxes].some(cb => cb.checked);

    checkboxes[0].setCustomValidity(
      oneChecked ? "" : "Please select at least one option."
    );

    if (!oneChecked) {
      checkboxes[0].reportValidity();
      return;
    }

    const form = e.target;
    const data = {};
    const perm = {};
    const dut = {}
    const cons = {}
    const permissions = document.querySelectorAll("#permissions *");
    const duties = document.querySelectorAll("#duties *");
    const constraints = document.querySelectorAll("#constraints [required]");

    //constraints
    for (const input of constraints) {
        if (input.tagName === "SELECT" && input.multiple) {
            const selectedValues = Array.from(input.selectedOptions).map(option => option.value);
            cons[input.id] = selectedValues;
        } else {
            cons[input.id] = input.value;
        }
    }

    if (!cons["StartTime"] || cons["StartTime"] === "") {
        cons["StartTime"] = new Date().toISOString().slice(0, 16); 
    }

    //duties
    for(const input of duties){
      dut[input.id] = input.checked;
    }

    //permissions
    for(const input of permissions){
      perm[input.id] = input.checked;
    }
    
    data["permissions"] = perm;
    data["constraints"] = cons;
    data["duties"] = dut;
    data["length"] = (Date.now() - start) / 1000; //how long did it take
    data["name"] = document.getElementById("name").value;
    data["id"] = document.getElementById("id").value|| "p-1482";
    data["description"] = document.getElementById("description").value;
    data["dataUri"] = document.getElementById("dataUri").value;
    data["provider"] = document.getElementById("provider").value;
    data["consumer"] = document.getElementById("consumer").value;
    data["policyType"] = document.getElementById("policyType").value;

    //save to localStorage
    localStorage.setItem(`question-${q.question}`, JSON.stringify(data));
    
    const summary = document.getElementById("summary-content");
    summary.innerHTML = generatePolicyText(data);
    summary.scrollIntoView({ behavior: 'smooth' });
    const nextBtn = document.getElementById("nextButton");
    if (nextBtn) nextBtn.disabled = false;
    
  });

})();

// Optional Fields logic
function bindToggle(checkboxId, inputId) {
  const check = document.getElementById(checkboxId);
  const input = document.getElementById(inputId);
  if (!check || !input) return;

  const update = () => {
    if (check.checked) {
      input.style.display = "block";
      input.setAttribute("required", "true");
    } else {
      input.style.display = "none";
      input.removeAttribute("required");
    }
  };

  check.addEventListener("change", update);
  update(); // initialize
}

function fillFormFromJson(data) {
  function traverse(obj, prefix = "") {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
        traverse(obj[key], key);
      } else {
        const elementId = key;
        const el = document.getElementById(elementId);
        
        if (!el) continue;

        const value = obj[key];

        if (el.tagName === "INPUT") {
          if (el.type === "checkbox" || el.type === "radio") {
            el.checked = Boolean(value);
          } else if (el.type === "datetime-local") {
            el.value = value;
          } else {
            el.value = value;
          }
        } else if (el.tagName === "TEXTAREA") {
          el.value = value;
        } else if (el.tagName === "SELECT") {
        if (el.tomselect) {
            const ts = el.tomselect;
            function applyValues() {
                if (ts.initialized) {
                    if (el.multiple && Array.isArray(value)) {
                        ts.setValue(value, true);
                    } else {
                        ts.setValue([value], true);
                    }
                } else {
                    // Retry until TomSelect fully initializes
                    setTimeout(applyValues, 30);
                }
            }

            applyValues();

        } else {
            // fallback for normal <select>
            if (el.multiple && Array.isArray(value)) {
                Array.from(el.options).forEach(opt => opt.selected = value.includes(opt.value));
            } else {
                el.value = value;
            }
        }

        el.dispatchEvent(new Event("change", { bubbles: true }));
    }
      }
    }
  }

  traverse(data);
}

function togglePolicyType() {
  const typeSwitch = document.getElementById("policyType");
  const provider = document.getElementById("provider");
  const consumer = document.getElementById("consumer");
  const temp = consumer.value;
  consumer.value = provider.value;
  provider.value = temp
  if(typeSwitch.value == "Offer"){
    consumer.removeAttribute("disabled");
    provider.setAttribute("disabled", "true");
  }
  else {
    provider.removeAttribute("disabled");
    consumer.setAttribute("disabled", "true");
  }
}