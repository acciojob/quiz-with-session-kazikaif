const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");
const questions = [
    { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
    { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
    { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
    { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" }
];

function renderQuestions() {
    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    questionsElement.innerHTML = "";
    questions.forEach((q, i) => {
        const questionDiv = document.createElement("div");
        questionDiv.textContent = q.question;
        q.choices.forEach(choice => {
            const choiceElement = document.createElement("input");
            choiceElement.type = "radio";
            choiceElement.name = `question-${i}`;
            choiceElement.value = choice;
            if (progress[i] === choice) {
                choiceElement.checked = true;
            }
            choiceElement.addEventListener("change", () => {
                progress[i] = choice;
                sessionStorage.setItem("progress", JSON.stringify(progress));
            });
            questionDiv.appendChild(choiceElement);
            questionDiv.appendChild(document.createTextNode(choice));
        });
        questionsElement.appendChild(questionDiv);
    });
}

submitButton.addEventListener("click", () => {
    let score = 0;
    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    questions.forEach((q, i) => {
        if (progress[i] === q.answer) {
            score++;
        }
    });
    scoreElement.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
});

window.onload = function() {
    renderQuestions();
    const savedScore = localStorage.getItem("score");
    if (savedScore !== null) {
        scoreElement.textContent = `Your last score was ${savedScore} out of 5.`;
    }
};