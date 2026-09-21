const startButton = document.getElementById("start_button");
const titleScreen = document.getElementById("title_screen");
const kitchenScreen = document.getElementById("kitchen_screen");
const demoEndScreen = document.getElementById("demo_end_screen");

const retryButton = document.getElementById("retry_button");
const titleButton = document.getElementById("title_button");

const serve = document.getElementById("serve");
const serveImage = serve.querySelector("img");

const bin = document.getElementById("bin");
const binImage = bin.querySelector("img");

const information = document.getElementById("information");

const ingredients = document.querySelectorAll("#ingredients img");
const table = document.getElementById("table");

const orderSlots = [
    document.getElementById("order1"),
    document.getElementById("order2"),
    document.getElementById("order3"),
    document.getElementById("order4"),
    document.getElementById("order5")
];

const tabs = [
    document.getElementById("tab1"),
    document.getElementById("tab2"),
    document.getElementById("tab3"),
    document.getElementById("tab4"),
    document.getElementById("tab5")
];

const imageNames = {
    topBun: "top_bun.png",
    tomato: "tomato.png",
    patty: "patty.png",
    lettuce: "lettuce.png",
    cheese: "cheese.png",
    bottomBun: "bottom_bun.png"
};

let burgerIngredients = [];
let orders = [];
let orderTimer = null;

let money = 0;
let gameFinished = false;
let resultTimer = null;

serve.disabled = true;
serveImage.src = "images/serve_disabled.png";

bin.disabled = true;
binImage.src = "images/bin_disabled.png";

tab1.disabled = false;
tab2.disabled = true;
tab3.disabled = true;
tab4.disabled = true;
tab5.disabled = true;


function createOrder() {
    const middleIngredients = [
        "tomato",
        "patty",
        "lettuce",
        "cheese"
    ];

    const order = ["bottomBun"];

    for (let i = 0; i < 4; i++) {
        const randomIndex =
            Math.floor(Math.random() * middleIngredients.length);

        order.push(middleIngredients[randomIndex]);
    }

    order.push("topBun");

    return order;
}


function displayOrder(order, slot) {
    slot.innerHTML = "";

    [...order].reverse().forEach(function (ingredientName, index) {
        const image = document.createElement("img");

        image.src = "images/" + imageNames[ingredientName];

        image.style.zIndex = order.length - index;

        slot.appendChild(image);
    });
}


function displayAllOrders() {
    for (let i = 0; i < orderSlots.length; i++) {
        orderSlots[i].innerHTML = "";

        if (orders[i] !== undefined) {
            displayOrder(orders[i], orderSlots[i]);
        }
    }
}


function findMatchingOrder() {
    for (let i = 0; i < orders.length; i++) {
        if (burgerIngredients.length !== orders[i].length) {
            continue;
        }

        let match = true;

        for (let j = 0; j < orders[i].length; j++) {
            if (burgerIngredients[j] !== orders[i][j]) {
                match = false;
                break;
            }
        }

        if (match) {
            return i;
        }
    }

    return -1;
}


function clearTable() {
    table.innerHTML = "";
    burgerIngredients = [];

    serve.disabled = true;
    serveImage.src = "images/serve_disabled.png";

    bin.disabled = true;
    binImage.src = "images/bin_disabled.png";
}


function addOrder() {
    if (orders.length >= 5) {
        return;
    }

    orders.push(createOrder());

    displayAllOrders();
}


function displayInformation(result) {
    if (resultTimer !== null) {
        clearTimeout(resultTimer);
    }

    information.innerHTML =
        "<div>" + result + "</div>" +
        "<div>売上: ¥" + money + "</div>";

    resultTimer = setTimeout(function () {
        information.innerHTML =
            "<div></div>" +
            "<div>売上: ¥" + money + "</div>";
    }, 5000);
}


function startGame() {
    titleScreen.style.display = "none";
    demoEndScreen.style.display = "none";
    kitchenScreen.style.display = "block";

    orders = [createOrder()];

    money = 0;
    gameFinished = false;

    clearTable();

    information.innerHTML =
        "<div></div>" +
        "<div>売上: ¥0</div>";

    displayAllOrders();

    if (orderTimer !== null) {
        clearInterval(orderTimer);
    }

    orderTimer = setInterval(function () {
        if (orders.length < 5) {
            addOrder();
        }
    }, 5000);
}


startButton.addEventListener("click", function () {
    startGame();
});


serve.addEventListener("click", function () {
    if (gameFinished) {
        return;
    }

    const matchingIndex = findMatchingOrder();

    if (matchingIndex !== -1) {
        money += 300;

        orders.splice(matchingIndex, 1);

        displayAllOrders();

        if (money >= 3000) {
            gameFinished = true;

            clearInterval(orderTimer);
            orderTimer = null;

            kitchenScreen.style.display = "none";
            demoEndScreen.style.display = "flex";
        } else {
            displayInformation("+¥300");
        }

    } else {
        money -= 150;

        displayInformation("-¥150");
    }

    clearTable();
});


bin.addEventListener("click", function () {
    clearTable();
});


ingredients.forEach(function (ingredient) {
    ingredient.addEventListener("click", function () {
        if (gameFinished) {
            return;
        }

        if (burgerIngredients.length >= 6) {
            return;
        }

        const ingredientName =
            ingredient.dataset.ingredient;

        burgerIngredients.push(ingredientName);

        console.log(burgerIngredients);

        const image = document.createElement("img");

        image.src =
            "images/" + imageNames[ingredientName];

        table.appendChild(image);

        serve.disabled = false;
        serveImage.src = "images/serve.png";

        bin.disabled = false;
        binImage.src = "images/bin.png";
    });
});


retryButton.addEventListener("click", function () {
    startGame();
});


titleButton.addEventListener("click", function () {
    if (orderTimer !== null) {
        clearInterval(orderTimer);
        orderTimer = null;
    }

    gameFinished = false;

    demoEndScreen.style.display = "none";
    kitchenScreen.style.display = "none";
    titleScreen.style.display = "flex";

    clearTable();
});