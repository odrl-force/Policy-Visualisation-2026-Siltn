(function () {
    if (!window.q || !q.body) return;

    let fullStructure = null;
    let allPolicies = [];
    let navigationStack = []; 
    let currentView = "file";
    let uriToDescriptionMap = {}; 
    const BASE_URI = "https://solidweb.me";

    async function loadData() {
        try {
            const [dataRes, polyRes] = await Promise.all([
                fetch("assets/data/data.json"),
                fetch("assets/data/policies.json")
            ]);
            const data = await dataRes.json();
            allPolicies = await polyRes.json();
            fullStructure = Array.isArray(data) ? data : [data];
            buildUriMap(fullStructure, "");
            
            initTabs();
            renderView();
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    }

    function buildUriMap(items, parentPath) {
        items.forEach(item => {
            const currentPath = parentPath + "/" + item.name;
            const uri = BASE_URI + currentPath;
            uriToDescriptionMap[uri] = item.description || "No description provided.";
            if (item.children) buildUriMap(item.children, currentPath);
        });
    }

    function initTabs() {
        const tabFile = document.getElementById("tab-file");
        const tabPerson = document.getElementById("tab-person");

        tabFile.addEventListener("click", () => {
            currentView = "file";
            tabFile.classList.add("selected");
            tabPerson.classList.remove("selected");
            tabFile.setAttribute("aria-selected", "true");
            tabPerson.setAttribute("aria-selected", "false");
            resetPolicies();
            renderView();
        });

        tabPerson.addEventListener("click", () => {
            currentView = "person";
            tabPerson.classList.add("selected");
            tabFile.classList.remove("selected");
            tabPerson.setAttribute("aria-selected", "true");
            tabFile.setAttribute("aria-selected", "false");
            resetPolicies();
            renderView();
        });
    }

    // --- Core Rendering Logic ---
    function renderView() {
        const thead = document.querySelector("#files-table thead tr");
        // SWITCH CASE ADDED HERE
        switch (currentView) {
            case "file":
                thead.innerHTML = `<th>Filename</th><th>Access Level</th><th>Actions</th>`;
                renderFiles();
                break;
            case "person":
                thead.innerHTML = `<th>User</th><th>Access Level</th><th>Action</th>`;
                renderPersons();
                break;
        }
    }

    function renderFiles() {
        const tbody = document.querySelector("#files-table tbody");
        const currentItems = navigationStack.length === 0 ? fullStructure : (navigationStack[navigationStack.length - 1].children || []);
        updateBreadcrumbs();
        tbody.innerHTML = "";
        
        if(currentItems.length > 0){
            currentItems.forEach((item, index) => {
                const tier = getHighestTierRecursive(item, navigationStack);
                const isFolder = item.children && Array.isArray(item.children);
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><strong>${item.name}</strong></td>
                    <td>
                        <div class="flex-wrapper">
                            <div aria-hidden="true" class="dot ${tier.color}"></div>
                            <span>${tier.label}</span>
                        </div>
                    </td>
                    <td>
                        <button class="policy-btn" data-idx="${index}">Check Access</button>
                        ${isFolder ? `<button class="enter-btn" data-idx="${index}">Open</button>` : ''}
                    </td>`;
                tbody.appendChild(row);
            });
        } else {
            tbody.innerHTML = '<tr><td class="empty-placeholder" colspan="3">No files in this folder.</td></tr>';
        }
    }

    function renderPersons() {
        const tbody = document.querySelector("#files-table tbody");
        const pathEl = document.getElementById("path");
        pathEl.innerHTML = "<strong>Global Permissions Index</strong>";
        tbody.innerHTML = "";

        const aggregatedUsers = aggregatePoliciesByUser(allPolicies);

        aggregatedUsers.forEach((user, index) => {
            let maxRank = 1;
            user.policies.forEach(p => {
                if (p.permissions.permManage) maxRank = Math.max(maxRank, 4);
                else if (p.permissions.permModify) maxRank = Math.max(maxRank, 3);
                else if (p.permissions.permAdd) maxRank = Math.max(maxRank, 2);
                else if (p.permissions.permRead) maxRank = Math.max(maxRank, 1);
            });
            const tiers = { 1: { label: "Can View", color: "green" }, 2: { label: "Can Add", color: "yellow" }, 3: { label: "Can Edit", color: "orange" }, 4: { label: "Full Control", color: "red" } };
            const tier = tiers[maxRank];

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><strong>${user.name}</strong></td>
                <td>
                    <div class="flex-wrapper">
                        <div aria-hidden="true" class="dot ${tier.color}"></div>
                        <span>${tier.label}</span>
                    </div>
                </td>
                <td><button class="view-person-btn" data-idx="${index}">View</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    function renderPoliciesForItem(item) {
        const policyTitle = document.getElementById("policy-title");
        const tbody = document.getElementById("policy-body");
        const itemUri = getItemUri(item, navigationStack);
        const relevant = allPolicies.filter(p => itemUri.startsWith(p.udataUri));

        policyTitle.innerHTML = `Access Rules: ${item.name}`;

        if (relevant.length === 0) {
            tbody.innerHTML = '<tr><td class="empty-placeholder" colspan="6">No policies regarding this file.</td></tr>';
            return;
        }

        tbody.innerHTML = "";
        const aggregatedUsers = aggregatePoliciesByUser(relevant);

        aggregatedUsers.forEach((user, uIdx) => {
            const row = document.createElement("tr");
            row.className = "user-main-row";
            const hasMany = user.policies.length > 1;
            
            const allPurposes = [...new Set(user.policies.flatMap(p => p.constraints.purpose || []))];
            let purposeDisplay = allPurposes.length > 0 ? allPurposes[0].split(':')[1] : "Any Purpose";
            if (allPurposes.length > 1) purposeDisplay = `${allPurposes[0].split(':')[1]} + ${allPurposes.length - 1}`;

            row.innerHTML = `
                <td><strong>${user.name}</strong><span>${purposeDisplay}</span></td>
                <td>${user.perms.Read ? '✅' : ''}</td>
                <td>${user.perms.Add ? '✅' : ''}</td>
                <td>${user.perms.Edit ? '✅' : ''}</td>
                <td>${user.perms.Manage ? '🚨' : ''}</td>
                <td>
                    <button class="main-action-btn" data-u-idx="${uIdx}">
                        ${hasMany ? `Rules (${user.policies.length})` : 'Explain'}
                    </button>
                </td>`;
            tbody.appendChild(row);

            if (hasMany) renderSubRows(user.policies, uIdx, tbody, itemUri);
        });

        window.currentPolicyView = aggregatedUsers;
    }

    function renderPoliciesForPerson(user) {
        const policyTitle = document.getElementById("policy-title");
        const tbody = document.getElementById("policy-body");
        policyTitle.innerHTML = `Access for User: ${user.name}`;
        tbody.innerHTML = "";

        const resourceMap = {};
        user.policies.forEach(p => {
            if (!resourceMap[p.udataUri]) resourceMap[p.udataUri] = [];
            resourceMap[p.udataUri].push(p);
        });

        Object.keys(resourceMap).forEach((uri, rIdx) => {
            const policies = resourceMap[uri];
            const hasMany = policies.length > 1;
            const fileName = uri.split('/').pop();
            const podName = uri.split('/')[3] || "Root";
            const description = uriToDescriptionMap[uri] || "External Pod Resource";

            const row = document.createElement("tr");
            row.className = "user-main-row";
            row.innerHTML = `
                <td>
                    <strong>${fileName}</strong>
                    <small style="display:block; color:#666;">Pod: ${podName}</small>
                    <i style="font-size: 0.8em; color:#888;">${description}</i>
                </td>
                <td>${policies.some(p => p.permissions.permRead) ? '✅' : ''}</td>
                <td>${policies.some(p => p.permissions.permAdd) ? '✅' : ''}</td>
                <td>${policies.some(p => p.permissions.permModify) ? '✅' : ''}</td>
                <td>${policies.some(p => p.permissions.permManage) ? '🚨' : ''}</td>
                <td>
                    <button class="main-action-btn" data-u-idx="${rIdx}">
                        ${hasMany ? `Rules (${policies.length})` : 'Explain'}
                    </button>
                </td>`;
            tbody.appendChild(row);

            if (hasMany) {
                policies.forEach((p, pIdx) => {
                    const subRow = document.createElement("tr");
                    subRow.className = `sub-policy-row user-child-${rIdx}`;
                    subRow.style.display = "none";
                    const purpose = p.constraints.purpose ? p.constraints.purpose[0].split(':')[1] : "General Access";
                    
                    subRow.innerHTML = `
                        <td style="padding-left: 20px;"><em>${purpose}</em></td>
                        <td>${p.permissions.permRead ? '✅' : ''}</td>
                        <td>${p.permissions.permAdd ? '✅' : ''}</td>
                        <td>${p.permissions.permModify ? '✅' : ''}</td>
                        <td>${p.permissions.permManage ? '🚨' : ''}</td>
                        <td><button class="sub-explain-btn" data-u-idx="${rIdx}" data-p-idx="${pIdx}">Explain</button></td>`;
                    tbody.appendChild(subRow);
                });
            }
        });

        window.currentPersonView = Object.values(resourceMap);
    }

    function renderSubRows(policies, uIdx, tbody, itemUri) {
        policies.forEach((p, pIdx) => {
            const subRow = document.createElement("tr");
            subRow.className = `sub-policy-row user-child-${uIdx}`;
            subRow.style.display = "none";
            
            let sourceTitle = p.name || "Access Rule";
            if (itemUri) {
                const isDirect = p.udataUri === itemUri;
                const folderName = p.udataUri.split('/').pop() || "parent folder";
                sourceTitle = isDirect ? "Direct Permission" : `From ${folderName}`;
            }

            const allPurposes = p.constraints.purpose || [];
            let purposeDisplay = allPurposes.length > 0 ? allPurposes[0].split(':')[1] : "Any Purpose";

            subRow.innerHTML = `
                <td style="padding-left: 20px;"><strong>${sourceTitle}</strong><span>${purposeDisplay}</span></td>
                <td>${p.permissions.permRead ? '✅' : ''}</td>
                <td>${p.permissions.permAdd ? '✅' : ''}</td>
                <td>${p.permissions.permModify ? '✅' : ''}</td>
                <td>${p.permissions.permManage ? '🚨' : ''}</td>
                <td><button class="sub-explain-btn" data-u-idx="${uIdx}" data-p-idx="${pIdx}">Explain</button></td>`;
            tbody.appendChild(subRow);
        });
    }

    document.getElementById("files-table").addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-idx");
        if (idx === null) return;

        const row = e.target.closest("tr");
        document.querySelectorAll("#files-table tr").forEach(r => r.classList.remove("selected"));
        row.classList.add("selected");

        if (currentView === "file") {
            const currentItems = navigationStack.length === 0 ? fullStructure : (navigationStack[navigationStack.length - 1].children || []);
            const item = currentItems[idx];
            if (e.target.classList.contains("enter-btn")) {
                navigationStack.push(item);
                renderFiles();
                resetPolicies();
            } else if (e.target.classList.contains("policy-btn")) {
                renderPoliciesForItem(item);
            }
        } else {
            if (e.target.classList.contains("view-person-btn")) {
                const users = aggregatePoliciesByUser(allPolicies);
                renderPoliciesForPerson(users[idx]);
            }
        }
    });

    document.getElementById("policies-table").addEventListener("click", (e) => {
        const uIdx = e.target.getAttribute("data-u-idx");
        if (uIdx === null) return;
        
        let contextData;
        if (currentView === "file") {
            contextData = window.currentPolicyView[uIdx].policies;
        } else {
            contextData = window.currentPersonView[uIdx]; // In person view, grouped by resource array
        }

        if (e.target.classList.contains("main-action-btn")) {
            if (contextData.length > 1) {
                const subRows = document.querySelectorAll(`.user-child-${uIdx}`);
                const isHidden = subRows[0].style.display === "none";
                subRows.forEach(r => r.style.display = isHidden ? "table-row" : "none");
                e.target.innerText = isHidden ? "Hide" : `Rules (${contextData.length})`;
            } else {
                updateSummary(contextData[0]);
            }
        }

        if (e.target.classList.contains("sub-explain-btn")) {
            const pIdx = e.target.getAttribute("data-p-idx");
            updateSummary(contextData[pIdx]);
        }
    });

    function updateSummary(policy) {
        const summaryDiv = document.getElementById("summary");
        if (typeof generatePolicyText === "function") {
            summaryDiv.innerHTML = `<h3>Policy Details</h3><div class="summary-card">${generatePolicyText(policy)}</div>`;
        } else {
            summaryDiv.innerHTML = `<h3>Policy Details</h3><p>${policy.name || 'Unnamed policy'}</p>`;
        }
        summaryDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function aggregatePoliciesByUser(policies) {
        const userMap = {};
        policies.forEach(p => {
            const userId = p.consumer;
            if (!userMap[userId]) {
                userMap[userId] = {
                    name: userId.split('/')[3] || "User",
                    perms: { Read: false, Add: false, Edit: false, Manage: false },
                    policies: []
                };
            }
            userMap[userId].perms.Read ||= p.permissions.permRead;
            userMap[userId].perms.Add ||= p.permissions.permAdd;
            userMap[userId].perms.Edit ||= p.permissions.permModify;
            userMap[userId].perms.Manage ||= p.permissions.permManage;
            userMap[userId].policies.push(p);
        });
        return Object.values(userMap);
    }

    function getFullPath(item, stack) {
        const parts = stack.map(f => f.name);
        if (stack.length === 0 || stack[stack.length - 1] !== item) parts.push(item.name);
        return "/" + parts.join("/");
    }

    function getItemUri(item, stack) {
        return BASE_URI + getFullPath(item, stack);
    }

    function getHighestTierRecursive(item, currentStack) {
        const itemUri = getItemUri(item, currentStack);
        const allUris = [itemUri];
        const collectChildrenUris = (obj, parentPath) => {
            if (obj.children) {
                obj.children.forEach(child => {
                    const childPath = parentPath + "/" + child.name;
                    allUris.push(BASE_URI + childPath);
                    collectChildrenUris(child, childPath);
                });
            }
        };
        collectChildrenUris(item, getFullPath(item, currentStack));
        const relevant = allPolicies.filter(p => allUris.includes(p.udataUri));
        let maxRank = 1; 
        relevant.forEach(p => {
            if (p.permissions.permManage) maxRank = Math.max(maxRank, 4);
            else if (p.permissions.permModify) maxRank = Math.max(maxRank, 3);
            else if (p.permissions.permAdd) maxRank = Math.max(maxRank, 2);
            else if (p.permissions.permRead) maxRank = Math.max(maxRank, 1);
        });
                const tiers = {
            1: { label: "Can View", color: "green" },
            2: { label: "Can Add", color: "yellow" },
            3: { label: "Can Edit", color: "orange" },
            4: { label: "Full Control", color: "red" }
        };
                return tiers[maxRank];
    }

    function updateBreadcrumbs() {
        const pathEl = document.getElementById("path");
        pathEl.innerHTML = "";
        const createBreadcrumb = (label, action) => {
            const span = document.createElement("span");
            span.className = "breadcrumb-link";
            span.innerText = label;
            span.onclick = action;
            return span;
        };
        pathEl.appendChild(createBreadcrumb("Home", () => { navigationStack = []; renderFiles(); resetPolicies(); }));
        navigationStack.forEach((folder, index) => {
            const sep = document.createElement("span");
            sep.innerText = " > ";
            pathEl.appendChild(sep);
            pathEl.appendChild(createBreadcrumb(folder.name, () => {
                navigationStack = navigationStack.slice(0, index + 1);
                renderFiles();
                resetPolicies();
            }));
        });
    }

    function resetPolicies() {
        document.getElementById("policy-title").innerHTML = '<th colspan="6">Access Rules: No Selection</th>';
        document.getElementById("policy-body").innerHTML = '<tr><td class="empty-placeholder" colspan="6">Select an item to view permissions.</td></tr>';
        document.getElementById("summary").innerHTML = '<p class="empty-placeholder">Detailed explanation will appear here.</p>';
        window.currentPolicyView = null;
        window.currentPersonView = null;
    }

    loadData();
})();