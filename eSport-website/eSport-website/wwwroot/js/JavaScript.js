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

function generateHTMLtable(place, tournament, startdate, enddate, prize) {
    const table = document.getElementById("table");

    const li = document.createElement("li");
    li.style = "margin: 10px;"
    table.appendChild(li);

    const table_mini = document.createElement("div");
    table_mini.className = "table";
    li.appendChild(table_mini);

    const tableA = document.createElement("div");
    tableA.className = "blockA";
    //blockA.textContent = date.slice(0, 10);
    table_mini.appendChild(tableA);


    const tableB = document.createElement("div");
    tableB.className = "tableB";
    tableB.textContent = place;
    table_mini.appendChild(tableB);

    const tableC = document.createElement("div");
    tableC.className = "tableC";
    tableC.textContent = tournament;
    table_mini.appendChild(tableC);

    const tableD = document.createElement("div");
    tableD.className = "tableD";
    tableD.textContent = startdate.slice(0, 10) + "-" + enddate.slice(0, 10);
    table_mini.appendChild(tableD);

    const tableE = document.createElement("div");
    tableE.className = "tableE";
    tableE.textContent = prize + "$";
    table_mini.appendChild(tableE);
}

function getCurrentTime() {
    const time = document.getElementById("time");
    

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}


function updateTime() {
    const currentTime = getCurrentTime();
    document.getElementById('time').textContent = currentTime;
}

document.addEventListener("DOMContentLoaded", function () {
    setInterval(updateTime, 1000);
    


    const url = "/api/Match/5"; // пример URL для GET запроса
    const request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            data.forEach(match => {
                const date = match.date;
                const nameTournament = match.nameTournament;
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

    const url2 = "/api/Tournament/5"; // пример URL для GET запроса
    const request2 = new XMLHttpRequest();

    request2.open("GET", url2, true);

    request2.onload = function () {
        if (request2.status >= 200 && request2.status < 400) {
            const data = JSON.parse(request2.responseText);
            data.forEach(match => {
                console.log(match);
                const place = match.place;
                const tournament = match.name;
                const startdate = match.startDate;
                const enddate = match.endDate;
                const prize = match.prize;
                generateHTMLtable(place, tournament, startdate, enddate, prize);
            });
        } else {
            console.error("Произошла ошибка при выполнении запроса");
        }
    };

    request2.onerror = function () {
        console.error("Произошла ошибка при выполнении запроса");
    };

    request2.send();


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

