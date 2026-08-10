let three_leaf_count = 0;
let game_started = false;
let stopwatch_start_time = 0;
let stopwatch_time = 0;
let stopwatch_timer = null;
const startButton = document.getElementById("start_button");
const titleScreen = document.getElementById("title_screen");
const gameScreen = document.getElementById("game_screen");
const countdown = document.getElementById("countdown");
const startMessage = document.getElementById("start_message");
const cloverArea = document.getElementById("clover_area");
const three_leaf_count_element = document.getElementById("three_leaf_count");
const stopwatch = document.getElementById("stopwatch");
const clearScreen = document.getElementById("clear_screen");
const clearTime = document.getElementById("clear_time");
const scoreElement = document.getElementById("score");
const retryButton = document.getElementById("retry_button");
const titleButton = document.getElementById("title_button");

function start_countdown() {
    let count = 3;
    countdown.textContent = count;
    countdown.style.display = "block";
    const countdown_timer = setInterval(function () {
        count--;
        if (count > 0) {
            countdown.textContent = count;
        } else {
            clearInterval(countdown_timer);
            countdown.style.display = "none";
            startMessage.style.display = "block";
            game_started = true;
            start_stopwatch();
            setTimeout(function () {
                startMessage.style.display = "none";
            }, 500);
        }
    }, 1000);
}

function create_clovers() {
    const four_leaf_number = Math.floor(Math.random() * 300);
    start_countdown();
    for (let i = 0; i < 300; i++) {
        setTimeout(function () {
            const clover = document.createElement("div");
            const clover_image = document.createElement("img");
            clover_image.draggable = false;
            if (i === four_leaf_number) {
                clover_image.src = "images/four_leaf.png";
                clover_image.addEventListener("click", function () {
                    if (!game_started) {
                        return;
                    }
                    stop_stopwatch();
                    const score = Math.max((1000 - stopwatch_time * 5)
                    - three_leaf_count * 5, 0);
                    clearTime.textContent = stopwatch_time;
                    scoreElement.textContent = score;
                    gameScreen.style.display = "none";
                    clearScreen.style.display = "flex";
                });
            } else {
                clover_image.src = "images/three_leaf.png";
                clover_image.addEventListener("click", function () {
                    if (!game_started) {
                        return;
                    }
                    clover.remove();
                    three_leaf_count++;
                    three_leaf_count_element.textContent = three_leaf_count;
                });
            }
            clover.appendChild(clover_image);
            clover.className = "clover";
            clover.style.left = Math.random() * 448 + "px";
            clover.style.top = Math.random() * 298 + "px";
            cloverArea.appendChild(clover);
            if (i === 299) {
                startMessage.style.display = "block";
            }
        }, i * 10);
    }
}

function start_stopwatch() {
    stopwatch_start_time = Date.now();
    stopwatch_timer = setInterval(function () {
        const elapsed_time =
            Math.floor((Date.now() - stopwatch_start_time) / 1000);
        if (elapsed_time >= 999) {
            stopwatch_time = 999;
            stopwatch.textContent = "TIME 999s";
            clearInterval(stopwatch_timer);
            return;
        }
        stopwatch_time = elapsed_time;
        stopwatch.textContent =
            "TIME:" + elapsed_time + "s";
    }, 1000);
}

function stop_stopwatch() {
    clearInterval(stopwatch_timer);
    stopwatch_time =
        Math.floor((Date.now() - stopwatch_start_time) / 1000);
    if (stopwatch_time > 999) {
        stopwatch_time = 999;
    }
    stopwatch.textContent =
        "TIME:" + stopwatch_time + "s";
}

startButton.addEventListener("click", function () {
    titleScreen.style.display = "none";
    gameScreen.style.display = "block";
    create_clovers();
});

retryButton.addEventListener("click", function () {
    cloverArea.innerHTML = "";
    three_leaf_count = 0;
    three_leaf_count_element.textContent = three_leaf_count;
    game_started = false;
    if (stopwatch_timer !== null) {
        clearInterval(stopwatch_timer);
    }
    stopwatch_time = 0;
    stopwatch.textContent = "TIME:0s"
    clearScreen.style.display = "none";
    gameScreen.style.display = "block";
    create_clovers();
});

titleButton.addEventListener("click", function () {
    cloverArea.innerHTML = "";
    three_leaf_count = 0;
    three_leaf_count_element.textContent =three_leaf_count;
    game_started = false;
    if (stopwatch_timer !== null) {
        clearInterval(stopwatch_timer);
    }
    stopwatch_time = 0;
    stopwatch.textContent = "TIME 0.00s";
    clearScreen.style.display = "none";
    titleScreen.style.display = "flex";
});