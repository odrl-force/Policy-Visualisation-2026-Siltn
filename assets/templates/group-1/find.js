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

    function getHighestTier(item, currentStack) {
        const itemUri = getItemUri(item, currentStack);
        const relevant = allPolicies.filter(p => p.udataUri.startsWith(itemUri));

        let maxRank = 1; 
        relevant.forEach(p => {
            if (p.permissions.permManage) maxRank = Math.max(maxRank, 4);
            else if (p.permissions.permModify) maxRank = Math.max(maxRank, 3);
            else if (p.permissions.permAdd) maxRank = Math.max(maxRank, 2);
        });

        const tiers = {
            1: { label: "Read Data", color: "green" },
            2: { label: "Add Data", color: "yellow" },
            3: { label: "Modify Data", color: "orange" },
            4: { label: "Manage Access", color: "red" }
        };
        return tiers[maxRank];
    }

    function renderFiles() {
        const tbody = document.querySelector("#files-table tbody");
        const pathLabel = document.getElementById("path");
        const backBtn = document.getElementById("back-btn");

        const isAtHome = navigationStack.length === 0;
        const currentItems = isAtHome ? fullStructure : (navigationStack[navigationStack.length - 1].children || []);

        pathLabel.innerText = isAtHome ? "/" : getFullPath(navigationStack[navigationStack.length-1], navigationStack.slice(0, -1));
        backBtn.style.visibility = isAtHome ? "hidden" : "visible";

        tbody.innerHTML = "";

        currentItems.forEach((item, index) => {
            const tier = getHighestTier(item, navigationStack);
            const isFolder = item.children && Array.isArray(item.children);
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="file-name-cell"><strong>${item.name}</strong></td>
                <td>
                    <div class="flex-wrapper">
                        <div aria-hidden="true" class="dot ${tier.color}"></div>
                        <span>${tier.label}</span>
                    </div>
                </td>
                <td>
                    <button class="policy-btn" data-idx="${index}">Permissions</button>
                    ${isFolder ? `<button class="enter-btn" data-idx="${index}">Open Folder</button>` : ''}
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function renderPoliciesForItem(item) {
        const policyTable = document.querySelector("#policies table");
        const fullPath = getFullPath(item, navigationStack);
        const itemUri = getItemUri(item, navigationStack);
        
        const relevantPolicies = allPolicies.filter(p => itemUri.startsWith(p.udataUri));

        const headerRows = Array.from(policyTable.querySelectorAll("tr")).slice(0, 2);
        policyTable.innerHTML = "";
        headerRows.forEach(r => policyTable.appendChild(r));

        const firstRow = policyTable.querySelector("tr:first-child");
        firstRow.innerHTML = ""; 
        const pathHeader = document.createElement("th");
        pathHeader.setAttribute("colspan", "6");
        pathHeader.className = "policy-header-path";
        pathHeader.innerText = "Target: " + fullPath;
        firstRow.appendChild(pathHeader);

        const secondRow = policyTable.querySelector("tr:nth-child(2)");
        if (secondRow.cells.length < 6) {
            const detailsTh = document.createElement("th");
            detailsTh.innerText = "Info";
            secondRow.appendChild(detailsTh);
        }

        relevantPolicies.forEach(p => {
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
                const summaryDiv = document.getElementById("summary");
                summaryDiv.innerHTML = "";
                summaryDiv.innerHTML = generatePolicyText(p);
                summaryDiv.scrollIntoView({ behavior: 'smooth' });
            };

            policyTable.appendChild(row);
        });
    }

    document.getElementById("files-table").addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-idx");
        if (idx === null) return;

        const isAtHome = navigationStack.length === 0;
        const currentItems = isAtHome ? fullStructure : navigationStack[navigationStack.length - 1].children;
        const item = currentItems[idx];

        if (e.target.classList.contains("enter-btn")) {
            navigationStack.push(item);
            renderFiles();
        } else if (e.target.classList.contains("policy-btn")) {
            renderPoliciesForItem(item);
        }
    });

    document.getElementById("back-btn").onclick = () => {
        if (navigationStack.length > 0) {
            navigationStack.pop();
            renderFiles();
        }
    };

    loadData();
})();
