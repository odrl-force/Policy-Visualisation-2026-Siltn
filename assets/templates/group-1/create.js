// create-loaddata.js
(function () {

  if (!window.q || !q.body) return;

  const body = q.body;
  const start = Date.now();

  // Policy type logic
  document.getElementById("policyType").addEventListener("change", togglePolicyType);
  togglePolicyType();
  
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


  // Accesible multi select
  new TomSelect('#purpose', {
    plugins: ['remove_button'],
    options: PURPOSES.options,
    optgroups: PURPOSES.groups,
    optgroupField: 'group',
    labelField: 'name',
    valueField: 'value',
    searchField: ['name', 'desc'],
    render: {
        optgroup_header: function(data, escape) {
            return '<div class="optgroup-header" style="font-weight:bold; color:#333;">' + escape(data.label) + '</div>';
        },
        option: function(data, escape) {
            return '<div>' +
                        '<strong>' + escape(data.name) + '</strong>' +
                        '<div class="text-muted" style="font-size:0.8em;">' + escape(data.desc) + '</div>' +
                    '</div>';
        }
    }
  });

  // Submit Form logic
  document.getElementById("policyForm").addEventListener("submit", function (e) {
    e.preventDefault();

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
    data["udataUri"] = document.getElementById("dataUri").value;
    data["provider"] = document.getElementById("provider").value;
    data["consumer"] = document.getElementById("consumer").value;
    data["policyType"] = document.getElementById("policyType").value;

    //save to localStorage
    localStorage.setItem(`question-${q.question}`, JSON.stringify(data));

    const policyTranslation = document.getElementById("policyTranslation");
    policyTranslation.style.display = "block"

    policyTranslation.innerHTML = generatePolicyText(data);
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

function togglePolicyType() {
  const typeSwitch = document.getElementById("policyType");
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

function joinList(arr) {
    if (!arr || arr.length === 0) return "";
    if (arr.length === 1) return arr[0];
    const arrCopy = [...arr]; // Copy to avoid mutating original
    const last = arrCopy.pop();
    return arrCopy.join(", ") + " and " + last;
}

function generatePolicyText(p) {
    if (!p) return "No policy data provided.";
    const con = p.constraints || {};

    //Base
    const perms = p.permissions || {};
    const allowedActions = Object.entries(perms)
        .filter(([_, val]) => val === true)
        .map(([key]) => key.replace('perm', '').toLowerCase());
    const actionsText = allowedActions.length > 0 ? joinList(allowedActions) : "access";

    //Purpose
    const purposes = con.purpose || [];
    let purposeSection = "";
    if (purposes.length > 0) {
        purposeSection = `<p>They can only use the data for the following purposes:</p><ul>${purposes.map(pt => `<li>${pt}</li>`).join('')}</ul>`;
    }

    //Time restrictions
    let timeText = "";

    const durFields = ['DurationYear', 'DurationMonth', 'DurationDay', 'DurationHour'];
    const isDurationPresent = durFields.some(key => con[key] !== undefined && con[key] !== null && con[key] !== "");

    let totalDurationMs = Infinity;
    let durParts = [];

    if (isDurationPresent) {
        const durY = (parseInt(con.DurationYear) || 0) * 31536000000;
        const durM = (parseInt(con.DurationMonth) || 0) * 2628000000;
        const durD = (parseInt(con.DurationDay) || 0) * 86400000;
        const durH = (parseInt(con.DurationHour) || 0) * 3600000;
        totalDurationMs = durY + durM + durD + durH;

        if (parseInt(con.DurationYear) > 0) durParts.push(`${con.DurationYear} years`);
        if (parseInt(con.DurationMonth) > 0) durParts.push(`${con.DurationMonth} months`);
        if (parseInt(con.DurationDay) > 0) durParts.push(`${con.DurationDay} days`);
        if (parseInt(con.DurationHour) > 0) durParts.push(`${con.DurationHour} hours`);
    }

    const hasEnd = con.EndTime && con.EndTime !== "";
    const rangeMs = hasEnd ? (new Date(con.EndTime) - new Date(con.StartTime)) : Infinity;

    const startStr = new Date(con.StartTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

    if (!isDurationPresent && !hasEnd) {
        timeText = `<p>The access starts on <strong>${startStr}</strong>.</p>`;
    }
    else if (totalDurationMs <= rangeMs) {
        if (totalDurationMs === 0) {
            timeText = `<p>This agreement grants <strong>no access</strong> (duration is 0).</p>`;
        } else {
            timeText = `<p>The agreement grants access for <strong>${joinList(durParts)}</strong> (starting ${startStr}).</p>`;
        }
    }
    else {
        const endStr = new Date(con.EndTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        timeText = `<p>This access is valid from <strong>${startStr}</strong> until <strong>${endStr}</strong>.</p>`;
    }

    //Restrictions
    let extraRestrictions = "";
    if (con.Usage && con.Usage !== "0") {
        extraRestrictions += `<p>Usage is limited to a maximum of <strong>${con.Usage}</strong> uses.</p>`;
    }
    if (con.Location) {
        extraRestrictions += `<p>Access is restricted to the location: <strong>${con.Location}</strong>.</p>`;
    }

    //Duties
    const dutyMap = {
        delete: "delete all data when access is revoked",
        anonymize: "ensure the data is anonymized",
        encrypt: "keep the data encrypted",
        notify: "notify you whenever the data is accessed"
    };

    const activeDutyTexts = Object.entries(p.duties || {})
        .filter(([_, val]) => val === true)
        .map(([key]) => dutyMap[key]);
    
    let dutySection = "";
    if (activeDutyTexts.length > 0) {
        dutySection = `<p>Regarding duties, they are required to <strong>${joinList(activeDutyTexts)}</strong>.</p>`;
    }

    //Assembly
    return `
      <div class="policy-summary">
        <p>This policy (ID: <strong>${p.id}</strong>) entails access to <strong>${p.udataUri || 'the data'}</strong> for the consumer <strong>${p.consumer || 'the consumer'}</strong>.</p>
        <p>They are allowed to <strong>${actionsText}</strong> the data, which is provided by <strong>${p.provider || 'the provider'}</strong>.</p>
        
        ${purposeSection}
        ${timeText}
        ${extraRestrictions}
        ${dutySection}
      </div>
    `;
}