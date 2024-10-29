window.onload = function () {
    var day = new Date().getDate();
    if (day <= 1) {
        document.getElementById("noQuiz").style.display = "none";
        document.getElementById("login").style.display = "block";
    } else {
        document.getElementById("noQuiz").style.display = "block";
        document.getElementById("login").style.display = "none";
    }
};
function pressEnterToLogin() {
    if (event.which == 13 || event.keyCode == 13) {
        signin();
    }
}
document.getElementById("loginBtn").addEventListener("click", () => {
    signin();
});
function signin() {
    var username = document.getElementById("agent").value.replace(/ /gi, "");
    var store = document.getElementById("store").value;
    if (username == "admin") {
        var randomAgent = document.getElementById("agent").value + Math.floor(Math.random() * 100);
        login.style.display = "none";
        welcome.style.display = "block";
        footer.style.display = "block";
        welcomeAgent();
    } else if (username !== "admin" && username !== "" && username.length >= "8" && store !== "") {
        login.style.display = "none";
        welcome.style.display = "block";
        footer.style.display = "block";
        welcomeAgent();
    } else if (username == "" || username.length < "8") {
        document.getElementById("agent").focus();
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "Invalid Username";
    } else if (store == "") {
        document.getElementById("store").focus();
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "Choose Your Store Name";
    }
}
function welcomeAgent() {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if (month == 1) {
        month = "January";
    }
    if (month == 2) {
        month = "February";
    }
    if (month == 3) {
        month = "March";
    }
    if (month == 4) {
        month = "April";
    }
    if (month == 5) {
        month = "May";
    }
    if (month == 6) {
        month = "June";
    }
    if (month == 7) {
        month = "July";
    }
    if (month == 8) {
        month = "August";
    }
    if (month == 9) {
        month = "September";
    }
    if (month == 10) {
        month = "October";
    }
    if (month == 11) {
        month = "November";
    }
    if (month == 12) {
        month = "December";
    }
    document.getElementById("month").innerHTML = "Quiz - " + month + " " + year;
    agentName = document.getElementById("agent").value.split(".")[1] || document.getElementById("agent").value;
    document.getElementById("welcomeMsg").innerHTML = "Welcome " + agentName + ", <br /><br /> This Quiz consists of 10 Questions, with 10 Minutes time frame, only One attempt available.";
}
function signout() {
    location.reload();
}
document.getElementById("start").addEventListener("click", () => {
    let text = "You can access this quiz one-time only, are you ready now?";
    if (confirm(text) == true) {
        document.getElementById("firstSubmit").click();
        document.getElementById("welcome").style.display = "none";
        document.getElementById("footer").style.display = "none";
        document.getElementById("loading").style.display = "inline-block";
    } else {
        return false;
    }
});
let quizQuestions = [];
let userAnswers = [];
let currentQuestionIndex = 0;
function selectRandomQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    quizQuestions = shuffled.slice(0, 10);
    userAnswers = Array(quizQuestions.length).fill(null);
}
function showQuestion(index) {
    const questionContainer = document.getElementById("questionContainer");
    const question = quizQuestions[index];
    questionContainer.innerHTML = `
        <p>${question.question}</p>
        ${question.options
            .map(
                (option, i) => `
            <label>
                <input type="radio" name="answer" value="${i}" ${userAnswers[index] === i ? "checked" : ""}>
                ${option}
            </label>
        `
            )
            .join("")}
    `;
    document.querySelector('button[onclick="changeQuestion(-1)"]').style.display = index === 0 ? "none" : "inline-block";
    document.querySelector('button[onclick="changeQuestion(1)"]').innerText = index === 9 ? "Submit" : "Next";
}
function changeQuestion(direction) {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption && direction === 1) {
        alert("Please select an answer before proceeding.");
        return;
    }
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
    currentQuestionIndex += direction;
    if (currentQuestionIndex >= quizQuestions.length) {
        submitQuiz();
    } else if (currentQuestionIndex < 0) {
        currentQuestionIndex = 0;
    } else {
        showQuestion(currentQuestionIndex);
    }
    document.getElementById("qNum").textContent = "Question No. " + (parseInt(currentQuestionIndex) + 1);
}
const scriptURL = "https://script.google.com/macros/s/AKfycbzrysbkVOvpCu2GEPKGuSE0tg3gTOMgICJrgZukHZgMk-fPRMam9yPfs2yCbTubT5A8/exec?sheetName=Result";
const quizForm = document.forms["quiz"];
const agentID = crypto.randomUUID();
quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.getElementById("attendanceTime").value = new Date().toLocaleString("en-EG");
    document.getElementById("agentName").value = document.getElementById("agent").value;
    const formData = new FormData(quizForm);
    formData.append("agentID", agentID);
    try {
        const response = await fetch(scriptURL, { method: "POST", body: formData });
        const result = await response.json();
        if (result.error) alertError(result.error);
        else addStoreAndArea();
    } catch (error) {
        alertError(error.message);
    }
});
async function addStoreAndArea() {
    const formData = new FormData();
    formData.append("agentID", agentID);
    formData.append("Store", document.getElementById("store").options[document.getElementById("store").selectedIndex].text);
    formData.append("Area", document.getElementById("store").value);
    try {
        const response = await fetch(scriptURL, { method: "POST", body: formData });
        const result = await response.json();
        if (result.error) alertError(result.error);
        else start();
    } catch (error) {
        alertError(error.message);
    }
}
let countdownInterval;
function start() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("tabs").style.display = "block";
    selectRandomQuestions();
    showQuestion(currentQuestionIndex);
    const countDownDate = new Date().getTime() + 600166;
    countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById("timer").innerHTML = `( ${formattedMinutes}:${formattedSeconds} )`;
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("timer").innerHTML = "Time's up!";
            submitQuiz();
        }
    }, 1000);
}
async function submitQuiz() {
    let score = 0;
    quizQuestions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) {
            score++;
        }
    });
    clearInterval(countdownInterval);
    document.getElementById("tabs").style.display = "none";
    document.getElementById("loading").style.display = "inline-block";
    const formData = new FormData();
    formData.append("agentID", agentID);
    formData.append("Result", score);
    try {
        const response = await fetch(scriptURL, { method: "POST", body: formData });
        const result = await response.json();
        if (result.error) alertError(result.error);
        else submitted();
    } catch (error) {
        alertError(error.message);
    }
}
function submitted() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert").textContent = "Your submission has been received.";
}
function alertError(errorMessage) {
    if (countdownInterval) clearInterval(countdownInterval);
    document.getElementById("tabs").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert").style.color = "red";
    document.getElementById("alert").textContent = "Sorry, something went wrong. Your request may have been repeated.";
}
