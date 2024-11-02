const questions = [
    {
        question: "¿Cuál es la fórmula del MRU?",
        answers: ["v = d/t", "F = m * a", "v = t/d"],
        correct: 0
    },
    {
        question: "Un coche viaja a 90 km/h. ¿Cuánto tiempo tarda en recorrer 450 km?",
        answers: ["5 horas", "4 horas", "6 horas"],
        correct: 0
    },
    {
        question: "¿Qué es la velocidad constante?",
        answers: ["Cuando la velocidad no cambia", "Cuando la velocidad disminuye", "Cuando la velocidad aumenta"],
        correct: 0
    },
    {
        question: "Si un coche viaja a 60 km/h, ¿cuánto tiempo tardará en recorrer 240 km?",
        answers: ["4 horas", "3 horas", "5 horas"],
        correct: 0
    },
    {
        question: "Si un coche viaja a 45 km/h, ¿cuánto tiempo tomará recorrer 135 km?",
        answers: ["3 horas", "2 horas", "4 horas"],
        correct: 0
    }
];

let currentQuestion = 0;
let errors = 0;
let startTime = 0;
let carPosition = 0;

const car = document.getElementById('car');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const resultElement = document.getElementById('result');
const scoreboardElement = document.getElementById('scoreboard');

function startGame() {
    startTime = new Date().getTime();
    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentQuestion];
    questionElement.innerText = questionData.question;
    answersElement.innerHTML = '';
    
    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.addEventListener('click', () => checkAnswer(index));
        answersElement.appendChild(button);
    });
}

function checkAnswer(selected) {
    const questionData = questions[currentQuestion];
    if (selected === questionData.correct) {
        moveCar();
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    } else {
        errors++;
    }
}

function moveCar() {
    carPosition += 100 / (questions.length + 1); // Ajustamos para evitar que se pase
    carPosition = Math.min(carPosition, 100); // Limita el movimiento al 100%
    car.style.left = carPosition + '%';
}


function endGame() {
    const totalTime = (new Date().getTime() - startTime) / 1000;
    resultElement.innerHTML = `
        <h3>¡Has llegado al final de la pista!</h3>
        <p>Tiempo total: ${totalTime.toFixed(2)} segundos</p>
        <p>Errores: ${errors}</p>
    `;
    resultElement.classList.remove('hidden');
    saveScore(totalTime);
    showScores();
}

function saveScore(time) {
    const scores = JSON.parse(localStorage.getItem('mruScores')) || [];
    const name = prompt("Introduce tu nombre:");
    const grade = prompt("Introduce tu grado (8° o 9°):");
    scores.push({ name, grade, time, errors });
    localStorage.setItem('mruScores', JSON.stringify(scores));
}

function showScores() {
    const scores = JSON.parse(localStorage.getItem('mruScores')) || [];
    scoreboardElement.innerHTML = '<h3>Resultados de Todos los Jugadores:</h3>';
    scores.forEach(score => {
        scoreboardElement.innerHTML += `
            <p>Nombre: ${score.name}, Grado: ${score.grade}, Tiempo: ${score.time.toFixed(2)} segundos, Errores: ${score.errors}</p>
        `;
    });
    scoreboardElement.classList.remove('hidden');
}

startGame();
