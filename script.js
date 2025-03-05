const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Lion", correct: false },
            { text: "Tiger", correct: false }
        ]
    },
    {
        question: "HTML stands for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Machine Language", correct: false },
            { text: "Hyper Text Transfer Protocol", correct: false },
            { text: "Hyper Type Master Language", correct: false }
        ]
    },
    {
        question: "Which is the smallest bird in the world?",
        answers: [
            { text: "Parrot", correct: false },
            { text: "Sparrow", correct: false },
            { text: "Dove", correct: false },
            { text: "Humming Bird", correct: true }
        ]
    },
    {
        question: "Capital of India?",
        answers: [
            { text: "New Delhi", correct: true },
            { text: "Kolkata", correct: false },
            { text: "Chennai", correct: false },
            { text: "Mumbai", correct: false }
        ]
    },
    {
        question: "Who is the Founder of Microsoft?",
        answers: [
            { text: "Jeff Bezos", correct: false },
            { text: "Mark Zuckerberg", correct: false },
            { text: "Bill Gates", correct: true },
            { text: "Larry Page", correct: false }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
nextButton.style.display = "none";
while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
}
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();