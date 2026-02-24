(function () {
    if (!window.q || !q.body) return;

    let fullStructure = null;
    let allPolicies = [];
    let navigationStack = []; 
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
            renderFiles();
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    }

    function getFullPath(item, stack) {
        const parts = stack.map(f => f.name);
        if (stack.length === 0 || stack[stack.length - 1] !== item) {
            parts.push(item.name);
        }
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
            span.tabIndex = 0;
            span.role = "button";
            
            span.onclick = action;
            
            span.onkeydown = (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    action();
                }
            };
            
            return span;
        };

        const rootLink = createBreadcrumb("Home", () => { 
            navigationStack = []; 
            renderFiles(); 
            resetPolicies(); 
        });
        pathEl.appendChild(rootLink);

        navigationStack.forEach((folder, index) => {
            const sep = document.createElement("span");
            sep.innerText = " > ";
            sep.ariaHidden = "true";
            pathEl.appendChild(sep);

            const folderLink = createBreadcrumb(folder.name, () => {
                navigationStack = navigationStack.slice(0, index + 1);
                renderFiles();
                resetPolicies();
            });
            pathEl.appendChild(folderLink);
        });
    }

    function resetPolicies() {
        document.getElementById("policies-table").innerHTML = '<tbody><tr><td class="empty-placeholder">Select a file to view its permissions.</td></tr></tbody>';
        document.getElementById("summary").innerHTML = '<p class="empty-placeholder">Detailed explanation will appear here.</p>';
    }

    function renderFiles() {
        const tbody = document.querySelector("#files-table tbody");
        const isAtHome = navigationStack.length === 0;
        const currentItems = isAtHome ? fullStructure : (navigationStack[navigationStack.length - 1].children || []);

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
                        <button class="policy-btn" data-idx="${index}">See Permissions</button>
                        ${isFolder ? `<button class="enter-btn" data-idx="${index}">Open</button>` : ''}
                        </td>
                        `;
                        tbody.appendChild(row);
                    });
        }
        else{
            tbody.innerHTML = '<tbody><tr><td class="empty-placeholder" colspan="3">No files in this folder.</td></tr></tbody>';
        }
    }

    function renderPoliciesForItem(item) {
        const policyTable = document.getElementById("policies-table");
        const itemUri = getItemUri(item, navigationStack);
        
        const direct = allPolicies.filter(p => p.udataUri === itemUri);
        const inherited = allPolicies.filter(p => itemUri.startsWith(p.udataUri) && p.udataUri !== itemUri);

        if (direct.length === 0 && inherited.length === 0) {
            policyTable.innerHTML = '<tbody><tr><td class="empty-placeholder">No access policies found for this item.</td></tr></tbody>';
            return;
        }

        policyTable.innerHTML = `
            <thead>
                <tr class="table-title-row"><th colspan="6">Access for: ${item.name}</th></tr>
                <tr><th>User</th><th>Read</th><th>Add</th><th>Edit</th><th>Manage</th><th></th></tr>
            </thead>
            <tbody></tbody>
        `;
        const tbody = policyTable.querySelector("tbody");

        const addRows = (list, label) => {
            if (list.length === 0) return;
            const header = document.createElement("tr");
            header.className = "policy-group-header";
            header.innerHTML = `<td colspan="6">${label}</td>`;
            tbody.appendChild(header);

            list.forEach(p => {
                const row = document.createElement("tr");
                const userName = p.consumer.split('/')[3] || "User";
                row.innerHTML = `
                    <td>${userName}</td>
                    <td>${p.permissions.permRead ? '✓' : 'X'}</td>
                    <td>${p.permissions.permAdd ? '✓' : 'X'}</td>
                    <td>${p.permissions.permModify ? '✓' : 'X'}</td>
                    <td>${p.permissions.permManage ? '✓' : 'X'}</td>
                    <td><button class="details-btn">Explain</button></td>
                `;
                row.querySelector('.details-btn').onclick = () => {
                    const summary = document.getElementById("summary");
                    summary.innerHTML = `<h3>Explaination</h3><p>${generatePolicyText(p)}</p>`;
                };
                tbody.appendChild(row);
            });
        };

        addRows(direct, "Direct Permissions (Set on this file)");
        addRows(inherited, "Inherited Permissions (From parent folders)");
    }

    document.getElementById("files-table").addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-idx");
        if (idx === null) return;
        const currentItems = navigationStack.length === 0 ? fullStructure : navigationStack[navigationStack.length - 1].children;
        const item = currentItems[idx];

        if (e.target.classList.contains("enter-btn")) {
            navigationStack.push(item);
            renderFiles();
            resetPolicies();
        } else if (e.target.classList.contains("policy-btn")) {
            renderPoliciesForItem(item);
        }
    });

    loadData();
})();