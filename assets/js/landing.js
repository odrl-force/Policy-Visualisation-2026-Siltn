document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startButton");
    const introText = document.getElementById("introText");

    const params = new URLSearchParams(window.location.search);

    if(localStorage.getItem("userId") == null){
        lang = params.get("lang") || "en";
        const group = params.get("group") || "1";
        const userId = params.get("userid") || "guest";
        
        localStorage.setItem("lang", lang.toLowerCase());
        localStorage.setItem("group", group);
        localStorage.setItem("userId", userId);
    }

    lang = localStorage.getItem("lang");

    const introTexts = {
        en: "Welcome to the Policy Visualisation Study. Please read the instructions carefully. Click Start when ready.",
        nl: "Welkom bij de Policy Visualisatie Studie. Lees de instructies aandachtig. Klik op Start wanneer je klaar bent."
    };
    introText.textContent = introTexts[lang] || introTexts.en;

    startBtn.addEventListener("click", () => {
        window.location.href = `questions-${lang}.html`;
    });
});
