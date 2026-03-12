document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startButton");
    const introText = document.getElementById("introText");
    const params = new URLSearchParams(window.location.search);

    const urlUserId = params.get("userId");
    const storedUserId = localStorage.getItem("userId");

    const isNewUser = urlUserId && urlUserId !== storedUserId;
    const isFirstTimeGuest = !urlUserId && !storedUserId;

    if (isNewUser || isFirstTimeGuest) {
        const lang = (params.get("lang") || "en").toLowerCase();
        const group = params.get("group") || (Math.random() > 0.5 ? "1" : "2");
        const userId = urlUserId || `guest-${Math.floor(Math.random() * 9000) + 1000}`;

        localStorage.setItem("lang", lang);
        localStorage.setItem("group", group);
        localStorage.setItem("userId", userId);
        localStorage.setItem("question", "0");
    }

    const lang = localStorage.getItem("lang") || "en";

    const introTexts = {
        en: "Welcome to the Policy Visualisation Study. Please read the instructions carefully. Click Start when ready.",
        nl: "Welkom bij de Policy Visualisatie Studie. Lees de instructies aandachtig. Klik op Start wanneer je klaar bent."
    };
    
    introText.textContent = introTexts[lang] || introTexts.en;

    startBtn.addEventListener("click", () => {
        window.location.href = `questions-${lang}.html`;
    });
});