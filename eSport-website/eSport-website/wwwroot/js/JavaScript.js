function generateHTML(date, nameTournament, enemy) {
    const contentDiv = document.getElementById("slider");

    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    contentDiv.appendChild(slide);

    const block = document.createElement("div");
    block.className = "block";
    slide.appendChild(block);

    const blockA = document.createElement("div");
    blockA.className = "blockA";
    blockA.textContent = date.slice(0,10);
    block.appendChild(blockA);
    

    const blockB = document.createElement("div");
    blockB.className = "blockB";
    blockB.textContent = nameTournament;
    block.appendChild(blockB);

    const blockC = document.createElement("div");
    blockC.className = "blockC";
    blockC.textContent = enemy;
    block.appendChild(blockC);

   
}
document.addEventListener("DOMContentLoaded", function () {
    const url = "/api/Match/5"; // пример URL для GET запроса
    const request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            data.forEach(match => {
                const date = match.date;
                const nameTournament = match.tournamentId;
                const enemy = match.enemy;
                generateHTML(date, nameTournament, enemy);
            });
        } else {
            console.error("Произошла ошибка при выполнении запроса");
        }
    };

    request.onerror = function () {
        console.error("Произошла ошибка при выполнении запроса");
    };

    request.send();


});
const swiper = new Swiper('.mySwiper', {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 15,
    freeMode: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 480px
        1024: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 2,
        },
        320: {
            slidesPerView: 1,
        },
    }
});

