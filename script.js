// Lückentext-Funktionalität (Drag-and-Drop)

// Wörter-Array
const wordList = ["Möglichkeiten", "aussterben", "vereint", "Zusammenarbeit", "eingesetzt"];

// Funktion zum Mischen des Arrays (Fisher-Yates-Algorithmus)
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // Solange noch Elemente zum Mischen vorhanden sind
    while (currentIndex !== 0) {
        // Wähle ein verbleibendes Element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Tausche es mit dem aktuellen Element
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Gemischte Wörter generieren und in den DOM einfügen
function displayShuffledWords() {
    const shuffledWords = shuffle([...wordList]); // Kopie des Arrays erstellen und mischen
    const wordsContainer = document.getElementById('words');
    wordsContainer.innerHTML = ''; // Container leeren

    shuffledWords.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.classList.add('word');
        wordElement.setAttribute('draggable', 'true');
        wordElement.innerText = word;

        wordElement.addEventListener('dragstart', dragStart);
        wordElement.addEventListener('dragend', dragEnd);

        wordsContainer.appendChild(wordElement);
    });
}

// Drag-and-Drop-Funktionen
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.innerText);
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

const dropzones = document.querySelectorAll('.dropzone');

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('drop', drop);
});

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const droppedText = e.dataTransfer.getData('text/plain');
    const correctAnswer = e.target.getAttribute('data-answer');

    if (e.target.innerText.trim() !== '') {
        alert('Diese Lücke ist bereits ausgefüllt.');
        return;
    }

    if (droppedText === correctAnswer) {
        e.target.innerText = droppedText;
        e.target.classList.add('correct');

        // Entferne das Wort aus der Wortliste
        const wordElements = document.querySelectorAll('.word');
        wordElements.forEach(wordElement => {
            if (wordElement.innerText === droppedText) {
                wordElement.style.display = 'none';
            }
        });
    } else {
        e.target.classList.add('incorrect');
        setTimeout(() => {
            e.target.classList.remove('incorrect');
        }, 1000);
        alert('Falsches Wort. Versuchen Sie es erneut.');
    }
}

// Initialisierung der Lückentext-Wörter
displayShuffledWords();

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
            { text: "“Diskurs über die Wissenschaften und Künste”", correct: false },
            { text: "“Julie oder Die neue Heloise”", correct: false },
            { text: "“Emile oder Über die Erziehung”", correct: true },
            { text: "“Die Bekenntnisse”", correct: false },
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
        question: "Welchen Einfluss hatte Rousseau auf die Französische Revolution?",
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
function startTest(questions, cardId, questionId, answersId, progressBarId, feedbackId, nextButtonId, progressTextId, restartButtonId, resultMessageId) {
    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    function updateProgressBar() {
        const progressBar = document.getElementById(progressBarId);
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        const progressText = document.getElementById(progressTextId);
        if (progressText) {
            progressText.textContent = `Frage ${currentQuestionIndex + 1} von ${questions.length}`;
        }
    }

    function showQuestion() {
        updateProgressBar();

        // Elemente abrufen
        const questionElement = document.getElementById(questionId);
        const answersElement = document.getElementById(answersId);
        const feedbackElement = document.getElementById(feedbackId);
        const nextButton = document.getElementById(nextButtonId);
        const resultMessageElement = document.getElementById(resultMessageId);

        // Elemente anzeigen und zurücksetzen
        questionElement.style.display = "block";
        answersElement.style.display = "block";
        feedbackElement.textContent = "";
        feedbackElement.style.display = "block";
        nextButton.disabled = true;
        nextButton.style.visibility = "hidden";
        nextButton.style.display = "block";
        resultMessageElement.style.display = "none";

        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        answersElement.innerHTML = ""; // Antworten zurücksetzen
        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("answer-button");
            button.setAttribute("role", "radio");
            button.setAttribute("aria-checked", "false");
            button.setAttribute("tabindex", "0");

            // Klick-Event für die Auswahl
            button.addEventListener("click", () => selectAnswer(answer.correct, button));

            answersElement.appendChild(button);
        });
    }

    function selectAnswer(correct, button) {
        const buttons = document.querySelectorAll(`#${answersId} .answer-button`);
        buttons.forEach((btn) => {
            btn.disabled = true;
            btn.setAttribute("aria-checked", "false");
        });

        button.setAttribute("aria-checked", "true");

        const feedbackElement = document.getElementById(feedbackId);
        const nextButton = document.getElementById(nextButtonId);
        nextButton.disabled = false;
        nextButton.style.visibility = "visible";

        if (correct) {
            button.classList.add("correct");
            feedbackElement.textContent = "Richtig! Das ist die korrekte Antwort.";
            correctAnswers++;
        } else {
            button.classList.add("wrong");
            feedbackElement.textContent = "Falsch. Das ist nicht die richtige Antwort.";
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            // Test beendet
            const questionElement = document.getElementById(questionId);
            const answersElement = document.getElementById(answersId);
            const feedbackElement = document.getElementById(feedbackId);
            const nextButton = document.getElementById(nextButtonId);
            const resultMessageElement = document.getElementById(resultMessageId);

            // Elemente ausblenden
            questionElement.style.display = "none";
            answersElement.style.display = "none";
            feedbackElement.style.display = "none";
            nextButton.style.display = "none";

            // Ergebnisnachricht anzeigen
            resultMessageElement.innerHTML = `<h1>Test beendet!</h1>
                <p>Sie haben ${correctAnswers} von ${questions.length} Fragen richtig beantwortet.</p>`;
            resultMessageElement.style.display = "block";

            // Neustart-Button anzeigen
            document.getElementById(restartButtonId).style.display = "block";

            // Fortschrittsbalken auf 100% setzen
            const progressBar = document.getElementById(progressBarId);
            progressBar.style.width = `100%`;

            const progressText = document.getElementById(progressTextId);
            if (progressText) {
                progressText.textContent = `Frage ${questions.length} von ${questions.length}`;
            }
        }
    }

    // Event Listener für den Next-Button
    document.getElementById(nextButtonId).addEventListener("click", nextQuestion);

    // Event Listener für den Neustart-Button
    document.getElementById(restartButtonId).addEventListener("click", () => {
        currentQuestionIndex = 0;
        correctAnswers = 0;
        document.getElementById(restartButtonId).style.display = "none";
        showQuestion();

        // Fortschrittsbalken zurücksetzen
        const progressBar = document.getElementById(progressBarId);
        progressBar.style.width = `0%`;

        const progressText = document.getElementById(progressTextId);
        if (progressText) {
            progressText.textContent = `Frage 1 von ${questions.length}`;
        }
    });

    // Test initialisieren
    showQuestion();
}

// Start des ersten und zweiten Tests
startTest(
    questions1,
    "card",
    "question",
    "answers",
    "progress-bar",
    "feedback",
    "next-button",
    "progress-bar-text",
    "restartTest1",
    "result-message"
);

startTest(
    questions2,
    "card-2",
    "question-2",
    "answers-2",
    "progress-bar-2",
    "feedback-2",
    "next-button-2",
    "progress-bar-text-2",
    "restartTest2",
    "result-message-2"
);

// Zeichenbox-Funktionalität
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let currentColor = "#000000";
let currentLineWidth = 2;
let drawingHistory = [];

function saveCanvasState() {
    if (drawingHistory.length > 20) { // Begrenze die Anzahl der gespeicherten Zustände
        drawingHistory.shift();
    }
    drawingHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

// Position holen (für Touch-Events)
function getTouchPos(canvas, touchEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Zeichnen starten - MOUSE
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    saveCanvasState();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Zeichnen starten - TOUCH
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Verhindert Scrollen
    drawing = true;
    saveCanvasState();
    ctx.beginPath();
    const pos = getTouchPos(canvas, e);
    ctx.moveTo(pos.x, pos.y);
});

// Zeichnen fortsetzen - MOUSE
canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
    }
});

// Zeichnen fortsetzen - TOUCH
canvas.addEventListener("touchmove", (e) => {
    if (drawing) {
        e.preventDefault(); // Verhindert Scrollen
        const pos = getTouchPos(canvas, e);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
    }
});

// Zeichnen beenden - MOUSE
canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.closePath();
});

// Zeichnen beenden - TOUCH
canvas.addEventListener("touchend", () => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener("mouseleave", () => {
    drawing = false;
    ctx.closePath();
});

// Optional: touchcancel event
canvas.addEventListener("touchcancel", () => {
    drawing = false;
    ctx.closePath();
});

// Canvas leeren
document.getElementById("clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingHistory = [];
});

// Zeichnung herunterladen
document.getElementById("downloadCanvas").addEventListener("click", () => {
    const link = document.createElement('a');
    link.download = 'zeichnung.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Rückgängig-Funktion
document.getElementById("undoCanvas").addEventListener("click", () => {
    if (drawingHistory.length > 0) {
        const imageData = drawingHistory.pop();
        ctx.putImageData(imageData, 0, 0);
    }
});

// Farbänderung
document.getElementById("colorPicker").addEventListener("input", (e) => {
    currentColor = e.target.value;
});

// Linienstärke ändern
document.getElementById("lineWidth").addEventListener("input", (e) => {
    currentLineWidth = e.target.value;
});
