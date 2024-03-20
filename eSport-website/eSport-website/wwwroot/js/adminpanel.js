﻿//Выбор Формы
const buttonAddMatch = document.getElementById("buttonAddMatch");
const buttonAddTournament = document.getElementById("buttonAddTournament");
const buttonChangeTournament = document.getElementById("buttonChangeTournament");
//Формы
const mainmenu = document.getElementById("mainmenu");
const addMatchMenu = document.getElementById("addMatchMenu");
const addTournamentMenu = document.getElementById("addTournamentMenu");





// Добавляем обработчик события "click" на buttonAddMatch
buttonAddMatch.addEventListener("click", function () {

    //Запрос на загрузку данных о туринрах для select
    const url = "/api/Tournament";
    const request = new XMLHttpRequest();
    const selectTournament = document.getElementById("tournament");
    while (selectTournament.firstChild) {
        selectTournament.removeChild(selectTournament.firstChild);
    }

    request.open("GET", url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            data.forEach(tour => {
                const option = document.createElement("option");
                option.value = tour.id;
                option.text = tour.name;
                selectTournament.appendChild(option);
            });
        } else {
            console.error("Произошла ошибка при выполнении запроса");
        }
    };

    request.onerror = function () {
        console.error("Произошла ошибка при выполнении запроса");
    };

    request.send();
 
    mainmenu.style.display = "none";
    addTournamentMenu.style.display = "none";
    addMatchMenu.style.display = "block";
});

// Добавляем обработчик события "click" на buttonAddTournament
buttonAddTournament.addEventListener("click", function () {

    //Запрос на дисциплины для SELECT
    const url = "/api/Discipline";
    const request = new XMLHttpRequest();
    const selectDiscipline = document.getElementById("discipline");
    while (selectDiscipline.firstChild) {
        selectDiscipline.removeChild(selectDiscipline.firstChild);
    }

    request.open("GET", url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            data.forEach(disc => {
                const option = document.createElement("option");
                option.value = disc.id;
                option.text = disc.name;
                selectDiscipline.appendChild(option);
            });
        } else {
            console.error("Произошла ошибка при выполнении запроса");
        }
    };

    request.onerror = function () {
        console.error("Произошла ошибка при выполнении запроса");
    };

    request.send();

    
    mainmenu.style.display = "none";
    addMatchMenu.style.display = "none";
    addTournamentMenu.style.display = "block";
});


function submitAddMatchForm() {
    

    const matchDate = document.getElementById("matchDate").value;
    const tournament = document.getElementById("tournament").value;
    const opponent = document.getElementById("opponent").value;

    const url = "/api/Match"; 

    //Контракт
    const data = {
        date: matchDate,
        enemy: opponent,
        tournamentId: tournament
    };

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Запрос вернул не ok');
            }
            return response.json();
        })
        .then(data => {
            alert("Успешно!");
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function submitAddTournamentForm() {
    const startTournament = document.getElementById("startTournamentDate").value;
    const endTournament = document.getElementById("endTournamentDate").value;
    const name = document.getElementById("name").value;
    const place = document.getElementById("place").value;
    const prize = document.getElementById("prize").value;
    const discipline = document.getElementById("discipline").value;

    const url = "/api/Tournament";

    //Контракт
    const data = {
        startDate: startTournament,
        endDate: endTournament,
        name: name,
        place: place,
        prize: prize,
        disciplineId: discipline
    };

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Запрос вернул не ok');
            }
            return response.json();
        })
        .then(data => {
            alert("Успешно!");
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


