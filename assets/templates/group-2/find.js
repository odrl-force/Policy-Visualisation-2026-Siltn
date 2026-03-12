(function () {
    let allPolicies = [];
    let filteredPolicies = [];
    let resourceRegistry = {};
    let currentPage = 1;
    const itemsPerPage = 15;
    const lang = localStorage.getItem('lang') || 'en';

    async function init() {
        const [dRes, pRes] = await Promise.all([
            fetch(`assets/data/data-${lang}.json`),
            fetch(`assets/data/policies-${lang}.json`)
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

            const uniquePods = [...new Set(allPolicies.map(p => {
                const res = resourceRegistry[p.dataUri];
                return res ? res.pod : null;
            }).filter(Boolean))];

            const podOptions = uniquePods.map(pod => ({ name: pod, value: pod }));

            new TomSelect('#pod-select', {
                plugins: ['remove_button'],
                options: podOptions,
                labelField: 'name',
                valueField: 'value',
                placeholder: 'Filter by Pod...',
                searchField: ['name'],
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
        const query = document.getElementById("global-search").value.toLowerCase().trim();
        
        const purposeSelect = document.getElementById("purpose-select");
        const selectedPurposes = purposeSelect ? Array.from(purposeSelect.selectedOptions).map(opt => opt.value) : [];
        
        const podSelect = document.getElementById("pod-select");
        const selectedPods = podSelect ? Array.from(podSelect.selectedOptions).map(opt => opt.value) : [];

        const activePerms = Array.from(document.querySelectorAll('[data-type="perm"]:checked')).map(e => e.dataset.val);
        const activeDuties = Array.from(document.querySelectorAll('[data-type="duty"]:checked')).map(e => e.dataset.val);
        
        const sLogic = document.getElementById("start-logic").value;
        const sDate = document.getElementById("start-date").value ? new Date(document.getElementById("start-date").value).getTime() : null;
        const eLogic = document.getElementById("end-logic").value;
        const eDate = document.getElementById("end-date").value ? new Date(document.getElementById("end-date").value).getTime() : null;
        const locVal = document.getElementById("filter-location").value.toLowerCase();
        const usageVal = parseInt(document.getElementById("filter-usage").value);

        filteredPolicies = allPolicies.filter(p => {
            const res = resourceRegistry[p.dataUri] || { name: "", desc: "", pod: "", fullUri: p.dataUri };
            const consumerRaw = p.consumer.toLowerCase();
            const dates = getAuditDates(p);
            const c = p.constraints || {};

            const mPod = selectedPods.length === 0 || selectedPods.includes(res.pod);

            const policyPurposes = p.constraints?.purpose || [];
            const mPurpose = selectedPurposes.length === 0 || 
                            selectedPurposes.some(sp => policyPurposes.includes(sp));

            const mSearch = p.id.toLowerCase().includes(query) || 
                            res.name.toLowerCase().includes(query) || 
                            res.fullUri.toLowerCase().includes(query) ||
                            consumerRaw.includes(query) ||
                            (res.desc && res.desc.toLowerCase().includes(query));

            const mPerm = activePerms.length === 0 || activePerms.some(k => p.permissions[k]);
            const mDuty = activeDuties.length === 0 || (p.duties && activeDuties.some(k => p.duties[k]));
            
            const mLoc = !locVal || (c.Location && c.Location.toLowerCase().includes(locVal));
            const mUsage = isNaN(usageVal) || (c.Usage && parseInt(c.Usage) <= usageVal);

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

            return mPod && mPurpose && mSearch && mPerm && mDuty && mLoc && mUsage && mStart && mEnd;
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

        const translations = {
            read: { en: 'Read', nl: 'Lezen' },
            add: { en: 'Add', nl: 'Toevoegen' },
            modify: { en: 'Modify', nl: 'Bewerken' },
            manage: { en: 'Manage', nl: 'Beheren' },
            delete: { en: 'Delete', nl: 'Verwijderen' },
            anonymize: { en: 'Anonymize', nl: 'Anonimiseren' },
            encrypt: { en: 'Encrypt', nl: 'Encrypteren' },
            notify: { en: 'Notify', nl: 'Melden' }
        };

        Object.keys(p.permissions).filter(k => p.permissions[k]).forEach(k => {
            const key = k.replace('perm', '').toLowerCase();
            const label = lang === 'en' ? (translations[key]?.en || key) : (translations[key]?.nl || key);
            badges.push(`<span class="badge badge-perm">${label}</span>`);
        });

        if (p.duties) {
            Object.keys(p.duties).filter(k => p.duties[k]).forEach(k => {
                const key = k.toLowerCase();
                const label = lang === 'en' ? (translations[key]?.en || key) : (translations[key]?.nl || key);
                badges.push(`<span class="badge badge-duty">${label}</span>`);
            });
        }

            return `
                <tr>
                    <td><code>${p.id}</code></td>
                    <td><span class="res-pod">Pod: ${res.pod}</span><br><strong>${res.name}</strong><br><small>${res.desc || ''}</small></td>
                    <td><code>${p.consumer.split('/')[3]}</code></td>
                    <td><span class="purpose-text">${pNames || (lang === 'en' ? 'General' : 'Algemeen')}</span></td>
                    <td><div class="badge-list">${badges.join('')}</div></td>
                    <td><button class="btn-explain" data-id="${p.id}">${lang === 'en' ? 'Explain' : 'Uitleg'}</button></td>
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

        document.getElementById("page-label").innerText = lang === 'en' 
            ? `Page ${currentPage} of ${Math.ceil(filteredPolicies.length / itemsPerPage) || 1}` 
            : `Pagina ${currentPage} van ${Math.ceil(filteredPolicies.length / itemsPerPage) || 1}`;
        document.getElementById("status-text").innerText = lang === 'en' 
            ? `${filteredPolicies.length} Matches Found`
            : `${filteredPolicies.length} Matches Gevonden`;
    }
    init();
})();