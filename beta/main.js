document.getElementById("loginBtn").addEventListener("click", () => {
    signin();
});

function signin() {
    var username = document.getElementById("agent").value.replace(/ /gi, "");
    var store = document.getElementById("store").value;
    var area = document.getElementById("area").value;
    if (username == "admin") {
        var randomAgent = document.getElementById("agent").value + Math.floor(Math.random() * 100);
        login.style.display = "none";
        welcome.style.display = "block";
        welcomeAgent();
    } else if (username !== "admin" && username !== "" && username.length >= "8" && store !== "" && area !== "") {
        login.style.display = "none";
        welcome.style.display = "block";
        welcomeAgent();
    } else if (username == "" || username.length < "8") {
        document.getElementById("agent").focus();
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "Invalid Username";
    } else if (store == "") {
        document.getElementById("store").focus();
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "Choose Your Store Name";
    } else {
        document.getElementById("area").focus();
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "Choose Your Area Manager Name";
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
    document.getElementById("welcomeMsg").innerHTML = "Welcome " + document.getElementById("agent").value + ", <br /><br /> This Quiz consists of 10 Questions, with 10 Minutes time frame, only One attempt available.";
}

function signout() {
    location.reload();
}

document.getElementById("start").addEventListener("click", () => {
    let text = "You can access this quiz one-time only, are you ready now?";
    if (confirm(text) == true) {
        document.getElementById("firstSubmit").click();
        document.getElementById("welcome").style.display = "none";
        document.getElementById("loading").style.display = "inline-block";
    } else {
        return false;
    }
});

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
    formData.append("Store", document.getElementById("store").value);
    formData.append("Area", document.getElementById("area").value);
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
    document.getElementById("welcome").style.display = "none";
    document.getElementById("tabs").style.display = "block";
    document.getElementById("buttons").style.display = "block";
    document.getElementById("loading").style.display = "none";
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
            secSubmit();
        }
    }, 1000);
}

async function secSubmit() {
    tabs.forEach((tab) => {
        tab.style.display = "none";
    });
    clearInterval(countdownInterval);
    document.getElementById("buttons").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("qNum").style.display = "none";
    document.getElementById("loading").style.display = "inline-block";
    getResult();
}

async function getResult() {
    let totalScore = 0;
    for (let i = 1; i <= 20; i++) {
        const selectedAnswer = document.querySelector(`input[type='radio'][name=Q-${i}]:checked`)?.value;
        const correctAnswer = document.getElementById(`A-${i}`).value;
        totalScore += selectedAnswer === correctAnswer ? 1 : 0;
    }
    const formData = new FormData();
    formData.append("agentID", agentID);
    formData.append("Result", totalScore);
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
    tabs.forEach((tab) => {
        tab.style.display = "none";
    });
    if (countdownInterval) clearInterval(countdownInterval);
    document.getElementById("buttons").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("qNum").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert").textContent = `Error: ${errorMessage}`;
}

const tabs = Array.from(document.querySelectorAll(".tab"));
const selectedTabs = [];
const numToShow = 10;
let currentIndex = 0;
function selectRandomTabs() {
    const indices = Array.from({ length: tabs.length }, (_, i) => i);
    while (selectedTabs.length < numToShow) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        selectedTabs.push(indices.splice(randomIndex, 1)[0]);
    }
}

function showTab(index) {
    if (index === selectedTabs.length - 1) {
        document.getElementById("next").style.display = "none";
        document.getElementById("lastClick").style.display = "inline-block";
    } else {
        document.getElementById("next").style.display = "inline-block";
        document.getElementById("lastClick").style.display = "none";
    }
    if (index === 0) {
        document.getElementById("prev").style.display = "none";
        tabs.forEach((tab, i) => {
            tab.style.display = i === selectedTabs[index] ? "block" : "none";
        });
    } else {
        document.getElementById("prev").style.display = "inline-block";
        tabs.forEach((tab, i) => {
            tab.style.display = i === selectedTabs[index] ? "block" : "none";
        });
    }
}

document.getElementById("next").addEventListener("click", () => {
    const currentTabElement = tabs[selectedTabs[currentIndex]];
    const radioInputChecked = currentTabElement.querySelector('input[type="radio"]:checked');
    if (!radioInputChecked) {
        alert("Please select an answer before proceeding.");
        return;
    }
    currentIndex = (currentIndex + 1) % selectedTabs.length;
    showTab(currentIndex);
    document.getElementById("qNum").textContent = "Question No. " + (parseInt(currentIndex) + 1);
    NextTransform();
});

document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + selectedTabs.length) % selectedTabs.length;
    showTab(currentIndex);
    document.getElementById("qNum").textContent = "Question No. " + (parseInt(currentIndex) + 1);
    BackTransform();
});
selectRandomTabs();
showTab(currentIndex);

function NextTransform() {
    for (let i = 1; i <= 20; i++) {
        gsap.from(`#tab${i}`, { duration: 0.2, xPercent: 50, opacity: 0 });
    }
}

function BackTransform() {
    for (let i = 1; i <= 20; i++) {
        gsap.from(`#tab${i}`, { duration: 0.2, xPercent: -50, opacity: 0 });
    }
}
