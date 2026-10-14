const englishTexts = document.querySelectorAll(".english");

englishTexts.forEach(english => {
    const text = english.textContent;

    english.textContent = "";

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");

        span.textContent = text[i];
        english.appendChild(span);
    }

    function playAnimation() {
        const letters = english.querySelectorAll("span");

        letters.forEach(letter => {
            letter.classList.remove("show");
        });

        letters.forEach((letter, i) => {
            setTimeout(() => {
                letter.classList.add("show");
            }, 300 + i * 150);
        });
    }

    playAnimation();

    setInterval(() => {
        playAnimation();
    }, 4500);
});