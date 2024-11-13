// Fragen für den ersten Test
const questions1 = [
    {
        question: "Was war Rousseaus Hauptkritik an der Zivilisation?",
        answers: [
            { text: "Sie förderte technologische Fortschritte und Reichtum.", correct: false },
            { text: "Sie hatte einen korruptierenden Einfluss auf die Menschen.", correct: true },
            { text: "Sie machte die Menschen glücklicher und tugendhafter.", correct: false },
            { text: "Sie ermöglichte den Menschen ein einfacheres Leben.", correct: false },
        ],
    },
    {
        question: "Wie beschrieb Rousseau den Zustand der Natur?",
        answers: [
            { text: "Als einen moralischen Zustand, geprägt von Mitgefühl und Zufriedenheit.", correct: true },
            { text: "Als einen gefährlichen Zustand, der durch Konflikte und Unsicherheit geprägt war.", correct: false },
            { text: "Als eine primitive Zeit, in der die Menschen nur für sich selbst sorgten.", correct: false },
            { text: "Als eine Phase der Unwissenheit und Unmoral.", correct: false },
        ],
    },
    {
        question: "Welches Werk Rousseaus befasst sich mit der Erziehung von Kindern?",
        answers: [
            { text: "“Discourse on the Arts and Sciences”", correct: false },
            { text: "“Julie”", correct: false },
            { text: "“Emile or On Education”", correct: true },
            { text: "“Confessions”", correct: false },
        ],
    },
    {
        question: "Was bedeutet der Begriff „edler Wilder“ in Rousseaus Werk?",
        answers: [
            { text: "Eine Person, die in der Zivilisation moralisch überlegen ist.", correct: false },
            { text: "Die Unschuld und Moralität unserer Vorfahren im Gegensatz zur modernen Dekadenz.", correct: true },
            { text: "Ein Idealbild der technologisch fortgeschrittenen Gesellschaft.", correct: false },
            { text: "Ein Begriff, der Rousseaus eigene Lebensweise beschreibt.", correct: false },
        ],
    },
    {
        question: "Welchen Einfluss hatte Rousseau auf die französische Revolution?",
        answers: [
            { text: "Er organisierte die Revolution persönlich.", correct: false },
            { text: "Seine Ideen inspirierten viele Revolutionäre und beeinflussten deren Werte.", correct: true },
            { text: "Er verurteilte die Revolution als moralisch falsch.", correct: false },
            { text: "Seine Werke wurden während der Revolution vollständig ignoriert.", correct: false },
        ],
    },
];

// Fragen für den zweiten Test
const questions2 = [
    {
        question: "Wie definiert Rousseau die Grundlage einer rechtmäßigen Herrschaft?",
        answers: [
            { text: "Die natürliche Überlegenheit eines Einzelnen.", correct: false },
            { text: "Die Stärke des Herrschers.", correct: false },
            { text: "Vereinbarungen zwischen Menschen.", correct: true },
            { text: "Die Fähigkeit eines Despoten, Ruhe zu sichern.", correct: false },
        ],
    },
    {
        question: "Was kritisiert Rousseau an der Herrschaft eines Despoten?",
        answers: [
            { text: "Dass sie immer auf natürlichen Rechten beruht.", correct: false },
            { text: "Dass die bürgerliche Ruhe unter seiner Herrschaft wertvoller ist als Freiheit.", correct: false },
            { text: "Dass sie die Untertanen oft elender macht als ihre eigenen Konflikte.", correct: true },
            { text: "Dass sie niemals langfristig Bestand hat.", correct: false },
        ],
    },
    {
        question: "Warum lehnt Rousseau den Verzicht auf Freiheit ab?",
        answers: [
            { text: "Weil der Mensch ohne Freiheit nicht moralisch handeln kann.", correct: true },
            { text: "Weil ein solcher Verzicht zu viel Verantwortung mit sich bringt.", correct: false },
            { text: "Weil Freiheit die Grundlage für die gesellschaftliche Ordnung ist.", correct: false },
            { text: "Weil es keine Möglichkeit gibt, die Freiheit zurückzugewinnen.", correct: false },
        ],
    },
    {
        question: "Was bedeutet es laut Rousseau, “auf seine Freiheit zu verzichten”?",
        answers: [
            { text: "Man gibt seine Pflichten als Bürger auf.", correct: false },
            { text: "Man verliert seine Menschlichkeit und seine Rechte.", correct: true },
            { text: "Man wird Teil eines natürlichen Herrschaftsverhältnisses.", correct: false },
            { text: "Man erlangt Ruhe und Frieden in der Gesellschaft.", correct: false },
        ],
    },
    {
        question: "Was ist laut Rousseau das Problem mit unumschränkter Macht und unbegrenztem Gehorsam?",
        answers: [
            { text: "Es führt zu häufigen Konflikten und Kriegen.", correct: false },
            { text: "Es widerspricht der Natur des Menschen und ist ein nichtiger Vertrag.", correct: true },
            { text: "Es fördert den moralischen Verfall der Untertanen.", correct: false },
            { text: "Es basiert auf der natürlichen Überlegenheit eines Herrschers.", correct: false },
        ],
    },
];

// Funktion zum Starten eines Tests
function startTest(questions, cardId, questionId, answersId, progressBarId) {
    let currentQuestionIndex = 0;

    function updateProgressBar() {
        const progressBar = document.getElementById(progressBarId);
        const progressPercentage = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function showQuestion() {
        updateProgressBar();

        const questionElement = document.getElementById(questionId);
        const answersElement = document.getElementById(answersId);

        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        answersElement.innerHTML = ""; // Antworten zurücksetzen
        currentQuestion.answers.forEach((answer) => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("answer-button");

            // Klick-Event für die Auswahl
            button.addEventListener("click", () => selectAnswer(answer.correct, button));

            answersElement.appendChild(button);
        });
    }

    function selectAnswer(correct, button) {
        const buttons = document.querySelectorAll(`#${answersId} .answer-button`);
        buttons.forEach((btn) => (btn.disabled = true)); // Alle Buttons deaktivieren

        if (correct) {
            button.classList.add("correct"); // Grün bei richtiger Antwort
            setTimeout(nextQuestion, 1000);
        } else {
            button.classList.add("wrong"); // Rot bei falscher Antwort
            setTimeout(() => buttons.forEach((btn) => (btn.disabled = false)), 1000);
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            const card = document.getElementById(cardId);
            card.innerHTML = `<h1>Test beendet!</h1>`;
        }
    }

    // Setze Fortschrittsbalken auf 0 % beim Start
    document.getElementById(progressBarId).style.width = "0%";

    showQuestion();
}

// Start des ersten und zweiten Tests
startTest(questions1, "card", "question", "answers", "progress-bar");
startTest(questions2, "card-2", "question-2", "answers-2", "progress-bar-2");

// Zeichenbox-Funktionalität
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let currentColor = "#000000";
let currentLineWidth = 2;

// Zeichnen starten (Maus und Touch)
function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    const { x, y } = getCursorPosition(e);
    ctx.moveTo(x, y);
}

// Zeichnen fortsetzen (Maus und Touch)
function draw(e) {
    if (!drawing) return;

    const { x, y } = getCursorPosition(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentLineWidth;
    ctx.lineCap = "round";
    ctx.stroke();
}

// Zeichnen beenden (Maus und Touch)
function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Hilfsfunktion: Cursor-Position berechnen (Maus und Touch)
function getCursorPosition(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
        // Touch-Position
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top,
        };
    } else {
        // Maus-Position
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }
}

// Event-Listener für Maus
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Event-Listener für Touch
canvas.addEventListener("touchstart", startDrawing);
canvas
