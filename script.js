document.addEventListener("DOMContentLoaded", function () {


    const welcomeScreen = document.getElementById("welcome-screen");
    const questionScreen = document.getElementById("question-screen");
    const resultScreen = document.getElementById("result-screen");

    const showAdminFormBtn = document.getElementById("show-admin-form-btn");
    const adminForm = document.getElementById("admin-form");

    const playerForm = document.getElementById("player-form");
    const playerNameInput = document.getElementById("player-name");
    const selectedTheme = document.getElementById("questions-theme-select");
    const selectedLimit = document.getElementById("questions-limit-select");

    const currentPlayerDisplay = document.getElementById("current-player");
    const currentQuestionsDisplay = document.getElementById("current-question");
    const currentScoreDisplay = document.getElementById("current-score");
    const totalQuestionsDisplay = document.getElementById("total-questions");

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const optionTemplate = document.getElementById("option-template");

    const feedbackContainer = document.getElementById("feedback-container");
    const feedbackText = document.getElementById("feedback-text");
    const nextButton = document.getElementById("next-button");

    const resultPlayerName = document.getElementById("result-player-name");
    const resultScore = document.getElementById("result-score");
    const resultTotal = document.getElementById("result-total");
    const resultPercentage = document.getElementById("result-percentage");
    const restartButton = document.getElementById("restart-button");


    let currentQuestion = 0;
    let score = 0;
    let currentPlayer = "";
    let hasAnswered = false;
    let quizQuestions = [];

    let questionsCount = quizQuestions.length;
    resultTotal.innerText = questionsCount;
    totalQuestionsDisplay.innerText = questionsCount;
    currentScoreDisplay.innerText = score;

    playerForm.addEventListener("submit", startGame);

    showAdminFormBtn.addEventListener("click", () => {
        adminForm.classList.toggle("hidden");
    })

    nextButton.addEventListener("click", () => {
        questionScreen.classList.add("fade-out");
        feedbackContainer.classList.add("hidden");
        setTimeout(() => {
            currentQuestion++;
            hasAnswered = false;
            questionScreen.classList.remove("fade-out");
            feedbackContainer.classList.add("hidden");


            if (currentQuestion < questionsCount) {
                loadQuestion(currentQuestion);
            } else {
                showResults();
            }
        }, 1000);

    });

    restartButton.addEventListener("click", resetQuiz);

    adminForm.addEventListener("submit", handleAdminSubmit);

    function loadQuestion(index) {
        currentQuestionsDisplay.textContent = index + 1;
        const question = quizQuestions[index];
        questionText.innerText = question.question;
        optionsContainer.innerHTML = "";
        feedbackContainer.classList.add("hidden");
        feedbackContainer.classList.remove("correct");
        feedbackContainer.classList.remove("incorrect");

        question.options.forEach((option, i) => {
            const optionElement = optionTemplate.content.cloneNode(true);
            const radioInput = optionElement.querySelector("input");
            const label = optionElement.querySelector("label");

            const optionId = `option-${index}-${i}`;
            radioInput.id = optionId;
            label.htmlFor = optionId;
            label.innerText = option;

            const optionContainer = optionElement.querySelector(".option");

            optionContainer.addEventListener("click", () => {
                if (!hasAnswered) {
                    selectOption(i);
                }
            });
            optionsContainer.appendChild(optionElement);
        });
    }

    function selectOption(selectedIndex) {
        if (hasAnswered) return;

        hasAnswered = true;
        const question = quizQuestions[currentQuestion];
        const options = optionsContainer.querySelectorAll(".option");
        feedbackContainer.classList.remove("hidden");

        options.forEach(opt => {
            opt.classList.remove("correct");
            opt.classList.remove("incorrect");
        });

        const isCorrect = selectedIndex === question.correctAnswer;
        if (isCorrect) {
            score++;
            options[selectedIndex].classList.add("correct");
            feedbackText.innerText = `Correct! ${question.explanation}`;
            currentScoreDisplay.innerText = score;
            feedbackContainer.classList.add("correct");

        } else {
            options[selectedIndex].classList.add("incorrect");
            feedbackText.innerText = `Incorrect! ${question.explanation}`;
            currentScoreDisplay.innerText = score;
            feedbackContainer.classList.add("incorrect");

        }
    }

    function showResults() {
        questionScreen.classList.remove("active");
        resultScreen.classList.add("active");

        const percentage = Math.round((score / questionsCount) * 100);
        resultPercentage.innerText = `${percentage}%`;
        resultScore.innerText = score;
    }

    function resetQuiz() {
        currentQuestion = 0;
        score = 0;
        currentPlayer = "";
        hasAnswered = false;
        currentPlayerDisplay.innerText = "";
        currentQuestionsDisplay.innerText = currentQuestion;
        feedbackContainer.classList.remove("correct", "incorrect");
        playerNameInput.value = "";
        welcomeScreen.classList.add("active");
        resultScreen.classList.remove("active");
        playerForm.classList.remove("hidden");
    }

    function startGame(e) {
        e.preventDefault();
        currentPlayer = playerNameInput.value.trim();
        checkUserName()
            .then((message) => {
                console.log(message);

                const theme = selectedTheme.value;
                const limit = selectedLimit.value;

                requestQuestions(`https://js-quiz-questions-server.vercel.app/api/questions?limit=${limit}&theme=${theme}`)
                    .then(() => {
                        let countDown = 3;
                        const countDownElement = document.createElement("div");
                        countDownElement.classList.add("countdown");
                        welcomeScreen.appendChild(countDownElement);
                        countDownElement.innerText = countDown;

                        playerForm.classList.add("hidden");

                        const timer = setInterval(() => {
                            countDown--;
                            countDownElement.innerText = countDown;
                            if (countDown <= 0) {
                                countDownElement.remove();
                                clearInterval(timer);

                                currentPlayerDisplay.innerText = currentPlayer;
                                resultPlayerName.innerText = currentPlayer;

                                welcomeScreen.classList.remove("active");
                                questionScreen.classList.add("active");
                                loadQuestion(currentQuestion);
                            }
                        }, 1000);
                    });
            })
            .catch((error) => {
                alert(error);
                return;
            });
    }

    async function requestQuestions(url) {
        return fetch(url)
            .then(response => response.json())
            .then(responseObject => {
                quizQuestions = responseObject.data;
                questionsCount = quizQuestions.length;
                resultTotal.innerText = questionsCount;
                totalQuestionsDisplay.innerText = questionsCount;
            })
            .catch((error) => {
                console.log(`Request failed with error: ${error}`);
            });
    }

    function handleAdminSubmit(e) {
        e.preventDefault();
        const action = adminForm.querySelector('#admin-action').value;
        const questionData = {
            action,
            question: adminForm.querySelector('#question-input').value,
            options: [
                adminForm.querySelector('#option1').value,
                adminForm.querySelector('#option2').value,
                adminForm.querySelector('#option3').value,
                adminForm.querySelector('#option4').value,
            ],
            correctAnswer: parseInt(adminForm.querySelector('#correct-answer').value),
            explanation: adminForm.querySelector('#explanation').value,
            theme: adminForm.querySelector('#theme').value,
        };

        console.log(questionData);

        if (action === "post") {
            submitNewQuestion(questionData);
        } else if (action === "put") {
            updateQuestion(questionData);
        } else if (action === "patch") {
            partialUpdateQuestion(questionData);
        } else if (action === "delete") {
            deleteQuestion(questionData.theme, questionData.correctAnswer);
        } else {
            alert("Invalid action. Please select POST.");
        }
    }

    function submitNewQuestion(questionData) {
        fetch("https://js-quiz-questions-server.vercel.app/api/resource", {
            method: "POST",
            body: JSON.stringify(questionData),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    function updateQuestion(questionData) {
        fetch("https://js-quiz-questions-server.vercel.app/api/resource", {
            method: "PUT",
            body: JSON.stringify(questionData),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    function partialUpdateQuestion(questionData) {
        fetch("https://js-quiz-questions-server.vercel.app/api/resource", {
            method: "PATCH",
            body: JSON.stringify(questionData),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    function deleteQuestion(theme, question) {
        fetch(`https://js-quiz-questions-server.vercel.app/api/resource?theme=${theme}&question=${question}`, {
            method: "DELETE",
        });
    }

    async function checkUserName() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("User name is available!");
            }, 50)
        });
    }

});