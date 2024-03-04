const questions = [
    {
        question: "What is the file extension for JavaScript?",
        options: [".html", ".js", ".css"],
        correctAnswer: ".js"
    },
    {
        question: "Where is JavaScript NOT placed inside an HTML document?",
        options: ["<head>", "<body>", "<footer>"],
        correctAnswer: "<footer>"
    },
    {
        question: "How do you declare a variable?",
        options: ["var name", "v name", "variable name"],
        correctAnswer: "var name"
    },
    {
        question: "What operator assigns a value to a variable?",
        options: ["*", "-", "="],
        correctAnswer: "="
    },
    {
        question: "Which of the following prints the message into the web console?",
        options: ["consolelog", "log.console", "console.log"],
        correctAnswer: "console.log"
    },

];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 60;
let score = 0;

function startQuiz() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('quiz-container').style.display = 'block';
    startTimer();
    showQuestion();
}

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestion = questions[currentQuestionIndex];

    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(function (option) {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = function () {
            checkAnswer(option);
        };
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
        score += 20; // Add points for correct answers
    } else {
        timeLeft -= 10; // Subtract time for incorrect answers
    }

    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}
function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endGame();
        }
        // Update the timer display
        document.getElementById('time-left').textContent = timeLeft;
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('game-over-container').style.display = 'block';
    document.getElementById('score').textContent = score;
    document.getElementById('time-left').textContent = '0';
}

function saveScore() {
    const initials = document.getElementById('initials').value.toUpperCase();
    if (initials.length > 0) {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

        // Add the current score to high scores
        highScores.push({ initials: initials, score: score });

        // Sort high scores in descending order
        highScores.sort((a, b) => b.score - a.score);

        // Save high scores to localStorage
        localStorage.setItem('highScores', JSON.stringify(highScores));

        alert(`Score saved for ${initials}!`);
    } else {
        alert("Please enter your initials.");
    }
}

function viewHighScores() {
    // Redirect to the high scores page
    window.location.href = "highscores.html";
}

function goBack() {
// Redirect back to the main quiz page
window.location.href = "index.html";
}