let questions;

document.addEventListener("DOMContentLoaded", async () => {
    const button = document.getElementById("qualtricsButton");
    button.addEventListener("click", () => {
        window.location.href = "https://TODO";
    });
    
    const res = await fetch("assets/data/questions.json");
    questions = await res.json();
    postData();
});

function buildBody(){
    let body = {};
    let group = localStorage.getItem("group");
    let userId = localStorage.getItem("userId");
    body.timestamp = Date.now();
    if(group == null || userId == null){
        body.broken = true;
    }
    body.group = group;
    body.userId = userId;
    body.questions = [];
    body.reviews = [];
    for (let i = 0; i <= questions[questions.length -1].question; i++) {
        let question;
        let review = {};
        question = JSON.parse(localStorage.getItem(`question-${i}`));
        review.score = localStorage.getItem(`review-${i}`);
        question.question = i;
        review.question = i;
        body.questions.push(question);
        body.reviews.push(review);
    }
    return body;
}

function postData(){
    fetch("https://solidweb.me/SiltnData/MasterThesisSiltn/UserStudy/", {
    method: "POST",
    body: JSON.stringify(buildBody()),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    .catch(err => {
        console.error("Fetch failed:", err);
        alert("something went wrong sending your data, try again by reloading this page. /nIf this error persist send an email.");
    });
}
