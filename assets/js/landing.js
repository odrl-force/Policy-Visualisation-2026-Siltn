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

    const scenarioTexts = {
        en: `
            <p><strong>The Scenario: Managing Your Family’s Digital Life</strong></p>
            
            <p>In this part of the study, we would like you to place yourself a specific situation. You will be asked to manage data sharing policies based on the following story:</p>

            <p><strong>The Story:</strong><br>
            Your mother, <strong>Jane Doe</strong>, recently fell and broke her feet. She is staying at an elderly care facility until she recovers, but you have now decided that she will stay there permanently. Because she finds digital management difficult, Jane has asked you, <strong>Alice Smith</strong>, to make sure all her data access is set up correctly.</p>

            <p>At the same time, you (<strong>Alice Smith</strong>) are moving out of your rental home and back into your childhood home (where Jane used to live) to save on rent and be closer to her.</p>

            <p><strong>Your Goal:</strong><br>
            You need to ensure that the right people (doctors, care staff, insurance) have access to the right data, while removing access for people who no longer need it (like your old landlord or former nurses who visited the old house).</p>

            <p><strong>How it works:</strong><br>
            On the next screens, you will see a tool designed to manage these rules. You will be given several tasks to complete as <strong>Alice Smith</strong>, managing both your own data and the data <strong>Jane Doe</strong> has shared with you.</p>

            <div style="margin: 20px 0; padding: 15px; background-color: white; border-radius: 8px; border-left: 5px solid #0a8bdb;">
                <p>If something feels confusing or difficult, please report it (space will be given).</p>
            </div>

            <div style="margin: 20px 0; padding: 15px; background-color: white; border-radius: 8px; border-left: 5px solid #ff4d4d;">
                <p>If you're stuck on a question you can skip it by clicking on "Give up".</p>
                <p>If you want to quit entirely, please skip through the remaining questions instead of closing the page. This ensures your data is submitted, as responses are only recorded once the final question is reached.</p>
            </div>
        `,
        nl: `
            <p><strong>Het Scenario: Het beheren van de digitale gegevens van uw familie</strong></p>
            
            <p>In dit deel van het onderzoek vragen we u om zich in te leven in een specifieke situatie. U zult gevraagd worden om regels voor het delen van gegevens (policies) te beheren op basis van het volgende verhaal:</p>

            <p><strong>Het Verhaal:</strong><br>
            Uw moeder, <strong>Jane Doe</strong>, is onlangs gevallen en heeft haar voeten gebroken. Ze verblijft momenteel in een zorginstelling om te herstellen, maar u heeft inmiddels besloten dat ze daar permanent zal blijven wonen. Omdat zij digitaal beheer lastig vindt, heeft Jane aan u, <strong>Alice Smith</strong>, gevraagd om ervoor te zorgen dat alle toegang tot haar gegevens correct is ingesteld.</p>

            <p>Tegelijkertijd gaat u (<strong>Alice Smith</strong>) verhuizen van uw huurwoning naar uw ouderlijk huis (waar Jane voorheen woonde) om huur te besparen en dichter bij haar te zijn.</p>

            <p><strong>Uw Doel:</strong><br>
            U moet ervoor zorgen dat de juiste personen (artsen, zorgpersoneel, verzekering) toegang hebben tot de juiste gegevens, terwijl u de toegang intrekt voor mensen die dit niet meer nodig hebben (zoals uw oude huisbaas of verpleegkundigen die aan huis kwamen in de oude woning).</p>

            <p><strong>Hoe het werkt:</strong><br>
            Op de volgende schermen ziet u een tool die ontworpen is om deze regels te beheren. U krijgt verschillende taken die u moet uitvoeren als <strong>Alice Smith</strong>, waarbij u zowel uw eigen gegevens beheert als de gegevens die <strong>Jane Doe</strong> met u heeft gedeeld.</p>

            <div style="margin: 20px 0; padding: 15px; background-color: white; border-radius: 8px; border-left: 5px solid #0a8bdb;">
                <p>Als iets onduidelijk of moeilijk aanvoelt, gelieve dit dan te melden (er is hiervoor ruimte voorzien).</p>
            </div>

            <div style="margin: 20px 0; padding: 15px; background-color: white; border-radius: 8px; border-left: 5px solid #ff4d4d;">
                <p>Als je vast zit op een vraag kan je deze overslaan door op "opgeven" te klikken.</p>
                <p>Wil je helemaal stoppen? Sla dan alle resterende vragen over in plaats van de pagina te sluiten. Je antwoorden worden namelijk pas verzonden en opgeslagen zodra de laatste vraag is voltooid.</p>
            </div>
        `
    };

    // Use this to inject the text
    introText.innerHTML = scenarioTexts[lang] || scenarioTexts.en;

    startBtn.addEventListener("click", () => {
        window.location.href = `questions-${lang}.html`;
    });
});