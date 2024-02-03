const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(()=> Math.random() -.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } 
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong") 
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
    {
        question: "Who is the manager of Liverpool FC?",
        answers: [
            {text: "Jürgen Klopp", correct: true},
            {text: "Pep Guardiola", correct: false},
            {text: "Steven Gerrard", correct: false},
            {text: "Harvey Elliott", correct: false}
        ]
    },{
        question: "What year was LFC founded?",
        answers: [
            {text: "1872", correct: false},
            {text: "1892", correct: true},
            {text: "1885", correct: false},
            {text: "1895", correct: false}
        ]},{
       question: "Who is LFC's current #8?",
        answers: [
            {text: "Darwin", correct: false},
            {text: "Szoboszlai", correct: true},
            {text: "Diaz", correct: false},
            {text: "Jones", correct: false}
        ]},{
    
        question: "How long has Pep Lijnders worked for LFC?",
        answers: [
            {text: "since 2019", correct: false},
            {text: "since 2017", correct: false},
            {text: "since 2018", correct: true},
            {text: "since 2016", correct: false}
        ]},{
        question: "What's the name of LFC's training ground?",
        answers: [
            {text: "Melwood", correct: true},
            {text: "Sandalwood", correct: false},
            {text: "Deadwood", correct: false},
            {text: "Rosewood", correct: false}
        ]}
    
]