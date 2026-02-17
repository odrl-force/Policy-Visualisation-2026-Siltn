// create-loaddata.js
(function () {
  if (!window.q || !q.body) return;

  const body = q.body;
  const start = Date.now();

  // Accesible multi select
  new TomSelect("#purpose", {
    plugins: ['remove_button'],
  });

  // Policy type logic
  const typeSwitch = document.getElementById("policyType");
  typeSwitch.addEventListener("change", togglePolicyType);

  function togglePolicyType() {
    const provider = document.getElementById("provider");
    const consumer = document.getElementById("consumer");

    if(typeSwitch.value == "Offer"){
      consumer.value = provider.value;
      consumer.removeAttribute("disabled");

      provider.value = "https://solidweb.me/Me/"
      provider.setAttribute("disabled", "true");
    }
    else {
      provider.value = consumer.value;
      provider.removeAttribute("disabled");

      consumer.value = "https://solidweb.me/Me/"
      consumer.setAttribute("disabled", "true");
    }
  }

  togglePolicyType();

  // Optional Fields logic
  function bindToggle(checkboxId, inputId) {
    const check = document.getElementById(checkboxId);
    const input = document.getElementById(inputId);
    if (!check || !input) return;

    const update = () => {
      if (check.checked) {
        input.style.display = "inline-block";
        input.setAttribute("required", "true");
      } else {
        input.style.display = "none";
        input.removeAttribute("required");
      }
    };

    check.addEventListener("change", update);
    update(); // initialize
  }


  bindToggle("useDuration", "Duration");
  bindToggle("useDuration", "DurationYear");
  bindToggle("useDuration", "DurationMonth");
  bindToggle("useDuration", "DurationDay");
  bindToggle("useDuration", "DurationHour");
  bindToggle("useStartTime", "StartTime");
  bindToggle("useEndTime", "EndTime");
  bindToggle("useLocation", "Location");
  bindToggle("useUsage", "Usage");

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
          if (el.multiple) {
            if (Array.isArray(value)) {
              Array.from(el.options).forEach(option => {
                option.selected = value.includes(option.value);
              });
            }
          } else {
            el.value = value;
          }
        }
      }
    }
  }

  traverse(data);
}
  if(body){
    fillFormFromJson(body);
}

  // Submit Form logic
  document.getElementById("policyForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {};
    const perm = {};
    const req = {}
    const rest = {}
    const permissions = document.querySelectorAll("#permissions *");
    const requirements = document.querySelectorAll("#requirements *");
    const restrictions = document.querySelectorAll("#restrictions [required]");

    //all enabeled restriction fields
    for (const input of restrictions) {
        if (input.tagName === "SELECT" && input.multiple) {
            // Handle Multi-Select
            const selectedValues = Array.from(input.selectedOptions).map(option => option.value);
            rest[input.id] = selectedValues;
        } else {
            // Handle standard inputs
            rest[input.id] = input.value;
        }
    }

    data["restrictions"] = rest;

    //all requirements
    for(const input of requirements){
      req[input.id] = input.checked;
    }

    data["requirements"] = req;

    //Tacker of how long it took
    const length = (Date.now() - start) / 1000;
    data["length"] = length;

    //permissions
    for(const input of permissions){
      perm[input.id] = input.checked;
    }

    
    data["permissions"] = perm;

    data["name"] = document.getElementById("name").value;
    data["id"] = document.getElementById("id").value;
    data["description"] = document.getElementById("description").value;
    data["udataUri"] = document.getElementById("dataUri").value;
    data["provider"] = document.getElementById("provider").value;
    data["consumer"] = document.getElementById("consumer").value;
    data["policyType"] = document.getElementById("policyType").value;

    //save to localStorage
    localStorage.setItem(`question-${q.question}`, JSON.stringify(data));

    const policyTranslation = document.getElementById("policyTranslation");
    policyTranslation.style.display = "block"

    const nextBtn = document.getElementById("nextButton");
    if (nextBtn) nextBtn.disabled = false;

  });

})();
