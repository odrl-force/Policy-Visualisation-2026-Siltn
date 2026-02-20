(function () {
    // Standard guard
    if (!window.q || !q.body) return;

    let fullStructure = null;
    let navigationStack = []; // Empty = home/root level

    async function loadData() {
        try {
            const res = await fetch("assets/data/data.json");
            const data = await res.json();
            
            // Supporting both a single root object or an array of roots
            fullStructure = Array.isArray(data) ? data : [data];
            
            renderFiles();
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    }

    function renderFiles() {
        const tbody = document.querySelector("#files-table tbody");
        const pathLabel = document.getElementById("path");
        const backBtn = document.getElementById("back-btn");

        // 1. Determine Current Level Data
        const isAtHome = navigationStack.length === 0;
        const currentItems = isAtHome 
            ? fullStructure 
            : navigationStack[navigationStack.length - 1].children || [];

        // 2. Update Path Header & Back Button
        pathLabel.innerText = isAtHome ? "/" : "/" + navigationStack.map(f => f.name).join("/");
        backBtn.style.visibility = isAtHome ? "hidden" : "visible";

        // 3. Clear and Render Table
        tbody.innerHTML = "";

        currentItems.forEach((item, index) => {
            const row = document.createElement("tr");
            const isFolder = item.children && Array.isArray(item.children);
            
            // Class is hardcoded to green for now as per your request
            row.className = "green"; 

            row.innerHTML = `
                <td>${item.name}</td>
                <td class="flex"><div aria-hidden="true" class="dot green"></div>Read Data</td>
                <td>
                    ${isFolder ? `<button class="enter-btn" data-idx="${index}">View Files</button>` : ''}
                </td>
            `;

            // Clicking the row (not the button) will eventually trigger the policy side
            row.onclick = (e) => {
                if (e.target.tagName !== 'BUTTON') {
                    console.log("Selected for policy view:", item.name);
                    // This is where you'll call your policy loader later
                }
            };

            tbody.appendChild(row);
        });
    }

    // Handle "View Files" click
    document.getElementById("files-table").addEventListener("click", (e) => {
        if (e.target.classList.contains("enter-btn")) {
            const idx = e.target.getAttribute("data-idx");
            const isAtHome = navigationStack.length === 0;
            const currentItems = isAtHome ? fullStructure : navigationStack[navigationStack.length - 1].children;
            
            navigationStack.push(currentItems[idx]);
            renderFiles();
        }
    });

    // Handle "Back" button click (Bubble Up)
    document.getElementById("back-btn").onclick = () => {
        if (navigationStack.length > 0) {
            navigationStack.pop();
            renderFiles();
        }
    };

    loadData();
})();