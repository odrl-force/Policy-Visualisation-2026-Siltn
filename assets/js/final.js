let questions; // Global variable

const translations = {
    en: {
        header: "Final Step: Quick Feedback",
        subtext: "Your data has been saved successfully.",
        instruction: "To help us improve our policy visualisations, please answer <b>two final questions</b> about your experience.",
        timeLabel: "Estimated time:",
        timeValue: "Less than 1 minute",
        button: "Complete Final 2 Questions"
    },
    nl: {
        header: "Laatste stap: Korte feedback",
        subtext: "Je gegevens zijn succesvol opgeslagen.",
        instruction: "Om onze policy visualisaties te verbeteren, vragen we je om nog <b>twee laatste vragen</b> over je ervaring te beantwoorden.",
        timeLabel: "Geschatte tijd:",
        timeValue: "Minder dan 1 minuut",
        button: "Beantwoord de laatste 2 vragen"
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    const lang = localStorage.getItem("lang") || "en";
    applyTranslations(lang);

    const button = document.getElementById("qualtricsButton");
    if (button) {
        button.addEventListener("click", () => {
            const group = localStorage.getItem("group") || "0";
            const userId = localStorage.getItem("userId") || "unknown";
            const baseUrl = "https://ugent.qualtrics.com/jfe/form/SV_1LbQTgJnGYwK6Ts";
            const targetUrl = `${baseUrl}?Q_Language=${lang}&GroupNumber=${group}&userId=${userId}`;
            window.location.href = targetUrl;
        });
    }

    try {
        const res = await fetch("assets/data/questions.json");
        questions = await res.json(); 
        postData(); 
    } catch (error) {
        console.error("Failed to load questions:", error);
    }
});

function applyTranslations(lang) {
    const t = translations[lang] || translations.en;
    document.getElementById("thankYouHeader").innerText = t.header;
    document.getElementById("thankYouSubtext").innerText = t.subtext;
    document.getElementById("surveyInstruction").innerHTML = t.instruction;
    document.getElementById("timeLabel").innerText = t.timeLabel;
    document.getElementById("timeValue").innerText = t.timeValue;
    document.getElementById("qualtricsButton").innerText = t.button;
}

function buildBody() {
    let body = {};
    let group = localStorage.getItem("group");
    let userId = localStorage.getItem("userId");
    body.timestamp = Date.now();
    body.broken = (group == null || userId == null);
    body.group = group;
    body.userId = userId;
    body.questions = [];
    body.reviews = [];

    // Now 'questions' is globally accessible
    for (let i = 0; i <= questions[questions.length - 1].question; i++) {
        let questionData = JSON.parse(localStorage.getItem(`question-${i}`));
        let reviewScore = localStorage.getItem(`review-${i}`);
        
        if (questionData) {
            questionData.question = i;
            body.questions.push(questionData);
        }
        body.reviews.push({ question: i, score: reviewScore });
    }
    return body;
}

function postData() {
    fetch("https://solidweb.me/SiltnData/MasterThesisSiltn/UserStudy/", {
        method: "POST",
        body: JSON.stringify(buildBody()),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .catch(err => {
        console.error("Fetch failed:", err);
        const lang = localStorage.getItem("lang") || "en";
        const msg = lang === "nl" 
            ? "Er ging iets mis bij het verzenden. Herlaad de pagina of stuur een e-mail als het probleem aanhoudt."
            : "Something went wrong sending your data. Try again by reloading the page. If this persists, please send an email.";
        alert(msg);
    });
}