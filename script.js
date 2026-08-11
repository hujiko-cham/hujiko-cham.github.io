const skyButton = document.getElementById("sky_button");
const leopardButton = document.getElementById("leopard_button");
const greenwallButton = document.getElementById("greenwall_button");
const bricksButton = document.getElementById("bricks_button");

const pinkButton = document.getElementById("pink_button");
const greenButton = document.getElementById("green_button");
const blueButton = document.getElementById("blue_button");
const yellowButton = document.getElementById("yellow_button");

const colorPicker = document.getElementById("color_picker");
const resetButton = document.getElementById("reset_button");
const applyButton = document.getElementById("apply_button");

const container = document.querySelector(".container");

const savedBackground = localStorage.getItem("background");
const savedColor = localStorage.getItem("color");

let selectedBackground = savedBackground;
let selectedColor = savedColor;


if (skyButton) {
    skyButton.addEventListener("click", function() {
        selectedBackground = "sky";
        setActiveButtons();
    });
}

if (leopardButton) {
    leopardButton.addEventListener("click", function() {
        selectedBackground = "leopard";
        setActiveButtons();
    });
}

if (greenwallButton) {
    greenwallButton.addEventListener("click", function() {
        selectedBackground = "greenwall";
        setActiveButtons();
    });
}

if (bricksButton) {
    bricksButton.addEventListener("click", function() {
        selectedBackground = "bricks";
        setActiveButtons();
    });
}


if (pinkButton) {
    pinkButton.addEventListener("click", function() {
        selectedColor = "lightpink";
        setActiveButtons();
    });
}

if (greenButton) {
    greenButton.addEventListener("click", function() {
        selectedColor = "lightgreen";
        setActiveButtons();
    });
}

if (blueButton) {
    blueButton.addEventListener("click", function() {
        selectedColor = "lightblue";
        setActiveButtons();
    });
}

if (yellowButton) {
    yellowButton.addEventListener("click", function() {
        selectedColor = "khaki";
        setActiveButtons();
    });
}


if (colorPicker) {
    colorPicker.addEventListener("input", function() {
        selectedColor = colorPicker.value;
        setActiveButtons();
    });
}


if (applyButton) {
    applyButton.addEventListener("click", function() {

        if (selectedBackground === "sky") {
            document.body.style.backgroundImage =
                'url("/images/backgrounds/background_sky.png")';
        }

        if (selectedBackground === "leopard") {
            document.body.style.backgroundImage =
                'url("/images/backgrounds/background_leopard.png")';
        }

        if (selectedBackground === "greenwall") {
            document.body.style.backgroundImage =
                'url("/images/backgrounds/background_greenwall.png")';
        }

        if (selectedBackground === "bricks") {
            document.body.style.backgroundImage =
                'url("/images/backgrounds/background_bricks.png")';
        }

        if (selectedColor && container) {
            container.style.backgroundColor = selectedColor;
        }

        if (selectedBackground) {
            localStorage.setItem("background", selectedBackground);
        }

        if (selectedColor) {
            localStorage.setItem("color", selectedColor);
        }
    });
}


if (resetButton) {
    resetButton.addEventListener("click", function() {

        localStorage.removeItem("background");
        localStorage.removeItem("color");

        selectedBackground = null;
        selectedColor = null;

        document.body.style.backgroundImage = "";

        if (container) {
            container.style.backgroundColor = "";
        }

        if (colorPicker) {
            colorPicker.value = "lightpink";
        }

        setActiveButtons();
    });
}


function setActiveButtons() {

    skyButton?.classList.remove("active");
    leopardButton?.classList.remove("active");
    greenwallButton?.classList.remove("active");
    bricksButton?.classList.remove("active");

    pinkButton?.classList.remove("active");
    greenButton?.classList.remove("active");
    blueButton?.classList.remove("active");
    yellowButton?.classList.remove("active");


    if (selectedBackground === "sky") {
        skyButton?.classList.add("active");
    }

    if (selectedBackground === "leopard") {
        leopardButton?.classList.add("active");
    }

    if (selectedBackground === "greenwall") {
        greenwallButton?.classList.add("active");
    }

    if (selectedBackground === "bricks") {
        bricksButton?.classList.add("active");
    }


    if (selectedColor === "lightpink") {
        pinkButton?.classList.add("active");
    }

    if (selectedColor === "lightgreen") {
        greenButton?.classList.add("active");
    }

    if (selectedColor === "lightblue") {
        blueButton?.classList.add("active");
    }

    if (selectedColor === "khaki") {
        yellowButton?.classList.add("active");
    }
}


if (savedBackground === "sky") {
    document.body.style.backgroundImage =
        'url("/images/backgrounds/background_sky.png")';
}

if (savedBackground === "leopard") {
    document.body.style.backgroundImage =
        'url("/images/backgrounds/background_leopard.png")';
}

if (savedBackground === "greenwall") {
    document.body.style.backgroundImage =
        'url("/images/backgrounds/background_greenwall.png")';
}

if (savedBackground === "bricks") {
    document.body.style.backgroundImage =
        'url("/images/backgrounds/background_bricks.png")';
}


if (savedColor && container) {
    container.style.backgroundColor = savedColor;
}

if (savedColor && colorPicker) {
    colorPicker.value = savedColor;
}

setActiveButtons();