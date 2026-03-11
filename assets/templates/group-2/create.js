(function () {
  const root = document.getElementById('create-2');
  if (!root) return;
  const start = Date.now();

  const ME_URI = "https://AliceSmith/profile/card#me";

  const state = {
    permissions: { permRead: false, permAdd: false, permModify: false, permManage: false },
    constraints: {
      purpose: [],
    },
    duties: { delete: false, anonymize: false, encrypt: false, notify: false },
    name: "", id: "", description: "", dataUri: "", 
    provider: ME_URI, consumer: "", policyType: "Offer"
  };

  if (window.q && window.q.body) {
    Object.keys(state).forEach(k => {
        if (window.q.body[k] !== undefined) {
            if (typeof state[k] === 'object' && !Array.isArray(state[k])) Object.assign(state[k], window.q.body[k]);
            else state[k] = window.q.body[k];
        }
    });
  }

  const $ = (s, c = root) => c.querySelector(s);
  const $$ = (s, c = root) => Array.from(c.querySelectorAll(s));

  function updateFieldStatus() {
    const set = (id, filled, req = false) => {
      const el = document.getElementById(`item-${id}`);
      if (!el) return;
      el.classList.toggle('status-filled', filled);
      el.classList.toggle('status-required', !filled && req);
    };
    set('dataUri', !!state.dataUri, true);
    set('actors', (!!state.provider && !!state.consumer), true);
    set('permissions', Object.values(state.permissions).some(v => v), true);
    set('purposes', state.constraints.purpose?.length > 0, true);
    set('temporal', (!!state.constraints.EndTime || (state.constraints.DurationYear|0) + (state.constraints.DurationMonth|0) + (state.constraints.DurationDay|0) + (state.constraints.DurationHour|0) > 0));
    set('usage', !!state.constraints.Usage);
    set('duties', Object.values(state.duties).some(v => v));
    set('semantics', (!!state.name || !!state.id || !!state.description));
    set('location', !!state.constraints.Location);
  }

  const dialog = document.getElementById('create-2-dialog');
  const modalBody = $('#create-2-modal-body');
  const modalTitle = $('#create-2-modal-title');
  let currentEditor = null;

function openModal(kind, isHelp = false) {
    currentEditor = kind;
    $('.modal-footer').style.display = isHelp ? 'none' : 'flex';
    modalTitle.textContent = isHelp ? "Info: " + kind : "Edit " + kind;
    modalBody.innerHTML = isHelp ? `<div class="help-text" style="line-height:1.5;">${getHelp(kind, state)}</div>` : renderEditor(kind, state);
    
    dialog.showModal();

    if (kind === 'purposes' && !isHelp) {
        renderPurposeTables();
        
        const searchInput = $('#purpose-search');
        searchInput.oninput = (e) => {
            renderPurposeTables(e.target.value.toLowerCase());
        };
    }
}

function renderPurposeTables(query = '') {
    const selectedContainer = $('#selected-purposes');
    const availableContainer = $('#available-purposes');
    if (!selectedContainer || !availableContainer) return;

    const selectedValues = state.constraints.purpose || [];
    const allOptions = window.PURPOSES?.options || [];
    const allGroups = window.PURPOSES?.groups || [];

    selectedContainer.innerHTML = '';
    availableContainer.innerHTML = '';

    const matchesQuery = (opt) => {
        if (!query) return true;
        return opt.name.toLowerCase().includes(query) || 
               opt.desc.toLowerCase().includes(query) || 
               opt.group.toLowerCase().includes(query) || 
               opt.value.toLowerCase().includes(query);
    };

    const seenValues = new Set();
    allOptions.forEach(opt => {
        if (selectedValues.includes(opt.value) && opt.value !== 'all:all' && !seenValues.has(opt.value)) {
            if (matchesQuery(opt)) {
                selectedContainer.appendChild(createPurposeRow(opt, true, query));
            }
            seenValues.add(opt.value);
        }
    });

    allGroups.forEach(group => {
        const groupOptions = allOptions.filter(o => 
            o.group === group.value && 
            !selectedValues.includes(o.value) && 
            o.value !== 'all:all' &&
            matchesQuery(o)
        );

        if (groupOptions.length > 0) {
            const header = document.createElement('div');
            header.className = 'purpose-group-header';
            header.textContent = group.label;
            availableContainer.appendChild(header);

            groupOptions.forEach(opt => {
                availableContainer.appendChild(createPurposeRow(opt, false, query));
            });
        }
    });
}

function createPurposeRow(opt, isSelected, query) {
    const row = document.createElement('div');
    row.className = 'purpose-row';
    row.innerHTML = `
        <div class="purpose-info">
            <strong>${opt.name}</strong>
            <div class="purpose-desc">${opt.desc}</div>
        </div>
        <span class="action-icon">${isSelected ? '−' : '+'}</span>
    `;
    
    row.onclick = () => {
        if (isSelected) {
            state.constraints.purpose = state.constraints.purpose.filter(v => v !== opt.value);
        } else {
            if (!state.constraints.purpose.includes(opt.value)) {
                state.constraints.purpose.push(opt.value);
            }
        }
        renderPurposeTables(query);
    };
    return row;
}

  modalBody.addEventListener('change', (e) => {
    if (e.target.name === 'pT') {
      const pIn = $('#in-prov', modalBody), cIn = $('#in-cons', modalBody);
      const curP = pIn.value, curC = cIn.value;
      pIn.value = curC || ME_URI;
      cIn.value = curP || ME_URI;
    }
    if (e.target.name === 'tM') {
      $('#wrap-end', modalBody).style.display = e.target.value === 'endtime' ? 'block' : 'none';
      $('#wrap-dur', modalBody).style.display = e.target.value === 'duration' ? 'block' : 'none';
    }
  });

  modalBody.addEventListener('click', (e) => {
    if (e.target.id === 'toggle-all') {
      const active = e.target.classList.toggle('active');
      $('#ts-wrap', modalBody).style.display = active ? 'none' : 'block';
      e.target.textContent = active ? '✓ No Purpose Limitations' : 'Allow All Purposes';
    }
  });

  $('#create-2-save').onclick = () => {
    const b = modalBody;
    if (currentEditor === 'actors') {
      state.policyType = Array.from($$('input[name="pT"]', b)).find(r => r.checked).value;
      state.provider = $('#in-prov', b).value; state.consumer = $('#in-cons', b).value;
    } else if (currentEditor === 'purposes') {
        const isAll = $('#toggle-all', modalBody).classList.contains('active');
        
        if (isAll) {
            state.constraints.purpose = ['all:all'];
        } else {
            state.constraints.purpose = state.constraints.purpose.filter(v => v !== 'all:all');
        }
    } else if (currentEditor === 'temporal') {
      state.constraints.StartTime = $('#in-start', b).value;
      const mode = Array.from($$('input[name="tM"]', b)).find(r => r.checked).value;
      if (mode === 'endtime') { state.constraints.EndTime = $('#in-end', b).value; state.constraints.DurationYear = 0; }
      else { 
        state.constraints.EndTime = ""; 
        state.constraints.DurationYear = $('#in-dy', b).value; state.constraints.DurationMonth = $('#in-dm', b).value;
        state.constraints.DurationDay = $('#in-dd', b).value; state.constraints.DurationHour = $('#in-dh', b).value;
      }
    }else if (currentEditor === 'semantics') {
      state.name = $('#in-name', b).value; state.id = $('#in-id', b).value; state.description = $('#in-desc', b).value;
    } else if (currentEditor === 'duties') {
      Object.keys(state.duties).forEach(d => state.duties[d] = $(`#d-${d}`, b).checked);
    } else if (currentEditor === 'dataUri') { state.dataUri = $('#in-uri', b).value;
    } else if (currentEditor === 'location') { state.constraints.Location = $('#in-location', b).value;
    } else if (currentEditor === 'usage') { state.constraints.Usage = $('#in-use', b).value;
    } else if (currentEditor === 'permissions') { 
      Object.keys(state.permissions).forEach(p => state.permissions[p] = $(`#p-${p}`, b).checked);
    }
    updateFieldStatus(); dialog.close();
  };

  const savePolicy = (state) => {
    let exportData = JSON.parse(JSON.stringify(state));

    if (!exportData.constraints.StartTime) {
        exportData.constraints.StartTime = new Date().toISOString().slice(0, 16);
    }

    if(exportData.constraints.DurationYear === 0){
      delete exportData.constraints.DurationYear;
    }
    if(exportData.constraints.DurationMonth === 0){
      delete exportData.constraints.DurationMonth;
    }
    if(exportData.constraints.DurationDay === 0){
      delete exportData.constraints.DurationDay;
    }
    if(exportData.constraints.DurationHour === 0){
      delete exportData.constraints.DurationHour;
    }
    if(exportData.constraints.Location === ""){
      delete exportData.constraints.Location;
    }
    if(exportData.constraints.EndTime === ""){
      delete exportData.constraints.EndTime;
    }

    delete exportData.constraints.useStartTime;
    delete exportData.constraints.useEndTime;
    delete exportData.constraints.useLocation;
    delete exportData.constraints.useDuration;
    

    exportData.length = (Date.now() - start) / 1000;

    localStorage.setItem(`question-${q.question}`, JSON.stringify(exportData));
    const summary = document.getElementById("summary-content");
    summary.innerHTML = generatePolicyText(exportData);
    summary.scrollIntoView({ behavior: 'smooth' });
};

  $('#createPolicy').onclick = () => {

    if(!validatePolicy(state)){
      return;
    }

    savePolicy(state);

    const nextBtn = document.getElementById("nextButton");
    if (nextBtn) nextBtn.disabled = false;
  };

  $$('.edit-btn').forEach(btn => btn.onclick = () => openModal(btn.dataset.edit));
  $$('.help-btn').forEach(btn => btn.onclick = () => openModal(btn.dataset.help, true));
  $('#create-2-close').onclick = $('#create-2-cancel').onclick = () => dialog.close();

  updateFieldStatus();
})();