(function () {
    let allPolicies = [];
    let filteredPolicies = [];
    let resourceRegistry = {};
    let currentPage = 1;
    const itemsPerPage = 15;

    async function init() {
        const [dRes, pRes] = await Promise.all([
            fetch("assets/data/data.json"), fetch("assets/data/policies.json")
        ]);
        const data = await dRes.json();
        allPolicies = await pRes.json();

        const pods = Array.isArray(data) ? data : [data];
        pods.forEach(pod => crawl(pod, "", pod.name));
        initTomSelect();
        initEvents();
        applyFilters();
    }

    function crawl(node, path, rootPod) {
        const fullPath = path + "/" + node.name;
        const uri = "https://solidweb.me" + fullPath;
        resourceRegistry[uri] = { name: node.name, desc: node.description, pod: rootPod, fullUri: uri };
        if (node.children) node.children.forEach(c => crawl(c, fullPath, rootPod));
    }

    function initTomSelect() {
        if (typeof TomSelect !== "undefined") {
            new TomSelect('#purpose-select', {
                plugins: ['remove_button'],
                options: PURPOSES.options,
                optgroups: PURPOSES.groups,
                optgroupField: 'group',
                labelField: 'name',
                valueField: 'value',
                searchField: ['name', 'desc', 'value'],
                onChange: applyFilters
            });
        }
    }

    function initEvents() {
        const triggers = ['global-search', 'filter-location', 'filter-usage', 'start-logic', 'start-date', 'end-logic', 'end-date'];
        triggers.forEach(id => document.getElementById(id).addEventListener('input', applyFilters));
        document.querySelectorAll('.filter-check').forEach(c => c.onchange = applyFilters);
        document.getElementById("prev-btn").onclick = () => { if(currentPage > 1) { currentPage--; render(); }};
        document.getElementById("next-btn").onclick = () => { if(currentPage * itemsPerPage < filteredPolicies.length) { currentPage++; render(); }};
    }

    function getAuditDates(p) {
        const c = p.constraints || {};
        let s = c.StartTime ? new Date(c.StartTime) : null;
        let e = c.EndTime ? new Date(c.EndTime) : null;
        if (!e && s) {
            e = new Date(s);
            if (c.DurationYear) e.setFullYear(e.getFullYear() + parseInt(c.DurationYear));
            if (c.DurationMonth) e.setMonth(e.getMonth() + parseInt(c.DurationMonth));
            if (c.DurationDay) e.setDate(e.getDate() + parseInt(c.DurationDay));
        }
        const norm = (d) => d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() : null;
        return { start: norm(s), end: norm(e) };
    }

    function applyFilters() {
        // 1. Get current filter values
        const query = document.getElementById("global-search").value.toLowerCase().trim();
        
        // Get selected purposes from the dropdown (handles multiple selection)
        const purposeSelect = document.getElementById("purpose-select");
        const selectedPurposes = purposeSelect ? Array.from(purposeSelect.selectedOptions).map(opt => opt.value) : [];

        const activePerms = Array.from(document.querySelectorAll('[data-type="perm"]:checked')).map(e => e.dataset.val);
        const activeDuties = Array.from(document.querySelectorAll('[data-type="duty"]:checked')).map(e => e.dataset.val);
        
        // Time & Context values
        const sLogic = document.getElementById("start-logic").value;
        const sDate = document.getElementById("start-date").value ? new Date(document.getElementById("start-date").value).getTime() : null;
        const eLogic = document.getElementById("end-logic").value;
        const eDate = document.getElementById("end-date").value ? new Date(document.getElementById("end-date").value).getTime() : null;
        const locVal = document.getElementById("filter-location").value.toLowerCase();
        const usageVal = parseInt(document.getElementById("filter-usage").value);

        // 2. Filter the master list
        filteredPolicies = allPolicies.filter(p => {
            const res = resourceRegistry[p.dataUri] || { name: "", desc: "", pod: "", fullUri: p.dataUri };
            const consumerRaw = p.consumer.toLowerCase();
            const c = p.constraints || {};
            const dates = getAuditDates(p);

            // --- PURPOSE MATCHING LOGIC ---
            const policyPurposes = p.constraints?.purpose || [];
            // If nothing is selected in the dropdown, we show everything.
            // If purposes are selected, the policy must contain at least one of the selected purposes.
            const mPurpose = selectedPurposes.length === 0 || 
                            selectedPurposes.some(sp => policyPurposes.includes(sp));

            // Global Search (URI-friendly)
            const mSearch = p.id.toLowerCase().includes(query) || 
                            res.name.toLowerCase().includes(query) || 
                            res.fullUri.toLowerCase().includes(query) ||
                            consumerRaw.includes(query) ||
                            (res.desc && res.desc.toLowerCase().includes(query));

            // Permissions and Duties
            const mPerm = activePerms.length === 0 || activePerms.some(k => p.permissions[k]);
            const mDuty = activeDuties.length === 0 || (p.duties && activeDuties.some(k => p.duties[k]));
            
            // Location and Usage
            const mLoc = !locVal || (c.Location && c.Location.toLowerCase().includes(locVal));
            const mUsage = isNaN(usageVal) || (c.Usage && parseInt(c.Usage) <= usageVal);

            // Temporal Logic
            let mStart = true;
            if (sDate && sLogic !== 'any') {
                if (sLogic === 'after') mStart = dates.start >= sDate;
                else if (sLogic === 'before') mStart = dates.start <= sDate;
                else if (sLogic === 'exact') mStart = dates.start === sDate;
            }
            let mEnd = true;
            if (eDate && eLogic !== 'any') {
                if (eLogic === 'after') mEnd = dates.end >= eDate;
                else if (eLogic === 'before') mEnd = dates.end <= eDate;
                else if (eLogic === 'exact') mEnd = dates.end === eDate;
            }

            // Return true only if ALL conditions are met
            return mPurpose && mSearch && mPerm && mDuty && mLoc && mUsage && mStart && mEnd;
        });

        currentPage = 1; 
        render();
    }

    function render() {
        const tbody = document.getElementById("audit-tbody");
        const pageData = filteredPolicies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        tbody.innerHTML = pageData.map(p => {
            const res = resourceRegistry[p.dataUri] || { name: "External", desc: p.dataUri, pod: "N/A" };
            const pNames = (p.constraints?.purpose || []).map(s => s.split(':').pop()).join(', ');
            
            const badges = [];
            Object.keys(p.permissions).filter(k => p.permissions[k]).forEach(k => badges.push(`<span class="badge badge-perm">${k.replace('perm','')}</span>`));
            if(p.duties) Object.keys(p.duties).filter(k => p.duties[k]).forEach(k => badges.push(`<span class="badge badge-duty">${k}</span>`));

            return `
                <tr>
                    <td><code>${p.id}</code></td>
                    <td><span class="res-pod">Pod: ${res.pod}</span><br><strong>${res.name}</strong><br><small>${res.desc || ''}</small></td>
                    <td><code>${p.consumer.split('/')[3]}</code></td>
                    <td><span class="purpose-text">${pNames || 'General'}</span></td>
                    <td><div class="badge-list">${badges.join('')}</div></td>
                    <td><button class="btn-explain" data-id="${p.id}">Explain</button></td>
                </tr>
            `;
        }).join('');

        tbody.querySelectorAll('.btn-explain').forEach(btn => {
            btn.onclick = () => {
                const summary = document.getElementById("summary-content");
                summary.innerHTML = generatePolicyText(
                    allPolicies.find(x => x.id === btn.dataset.id)
                );
                summary.scrollIntoView({ behavior: 'smooth' });
            };
        });

        document.getElementById("page-label").innerText = `Page ${currentPage} of ${Math.ceil(filteredPolicies.length / itemsPerPage) || 1}`;
        document.getElementById("status-text").innerText = `${filteredPolicies.length} Matches Found`;
    }
    init();
})();