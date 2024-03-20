//Выбор Формы
const buttonAddMatch = document.getElementById("buttonAddMatch");
const buttonAddTournament = document.getElementById("buttonAddTournament");
const buttonChangeTournament = document.getElementById("buttonChangeTournament");
const buttonChangeUser = document.getElementById("buttonChangeUser");
//Формы
const mainmenu = document.getElementById("mainmenu");
const addMatchMenu = document.getElementById("addMatchMenu");
const addTournamentMenu = document.getElementById("addTournamentMenu");
const changeTourForm = document.getElementById("changeTourForm");
const buttonAddTournamentForm = document.getElementById("buttonAddTournamentForm");
const buttonChangeTournamentForm = document.getElementById("buttonChangeTournamentForm");
const changeUser = document.getElementById("changeUser");

document.addEventListener("DOMContentLoaded", function () {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
        window.location.href = "/login"; // Перенаправление на страницу входа, если токен отсутствует
    }
});

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

    changeUser.style.display = "none";
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



    changeUser.style.display = "none";
    mainmenu.style.display = "none";
    addMatchMenu.style.display = "none";
    addTournamentMenu.style.display = "block";
    changeTourForm.style.display = "none";
    buttonChangeTournamentForm.style.display = "none";
    buttonAddTournamentForm.style.display = "block";


    const form = document.getElementById("tourForm");
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = false;
    }
});

buttonChangeTournament.addEventListener("click", function () {

    //Блокировка формы
    const form = document.getElementById("tourForm");
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("disabled", ""); 
    }

    //Запрос на загрузку данных о туринрах для select
    const url = "/api/Tournament";
    const request = new XMLHttpRequest();
    const selectTournament = document.getElementById("tourList");
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

    const url2 = "/api/Discipline";
    const request2 = new XMLHttpRequest();
    const selectDiscipline = document.getElementById("discipline");
    while (selectDiscipline.firstChild) {
        selectDiscipline.removeChild(selectDiscipline.firstChild);
    }

    request2.open("GET", url2, true);

    request2.onload = function () {
        if (request2.status >= 200 && request2.status < 400) {
            const data = JSON.parse(request2.responseText);
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

    request2.onerror = function () {
        console.error("Произошла ошибка при выполнении запроса");
    };

    request2.send();

    changeUser.style.display = "none";
    mainmenu.style.display = "none";
    addMatchMenu.style.display = "none";
    addTournamentMenu.style.display = "block";
    changeTourForm.style.display = "block";
    buttonChangeTournamentForm.style.display = "block";
    buttonAddTournamentForm.style.display = "none";

});

function downloadTournamentForm() {

    const startTournament = document.getElementById("startTournamentDate");
    const endTournament = document.getElementById("endTournamentDate");
    const name = document.getElementById("name");
    const place = document.getElementById("place");
    const prize = document.getElementById("prize");
    const discipline = document.getElementById("discipline");
    const selectTournament = document.getElementById("tourList");

    const url = "/api/Tournament";
    const request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            data.forEach(tour => {
                if (tour.id == selectTournament.value) {
                    startTournament.value = tour.startDate.slice(0,10);
                    endTournament.value = tour.endDate.slice(0, 10);
                    name.value = tour.name;
                    place.value = tour.place;
                    prize.value = tour.prize;
                    discipline.value = tour.disciplineId;
                }
            });
        } else {
            console.error("Произошла ошибка при выполнении запроса");
        }
    };

    request.onerror = function () {
        console.error("Произошла ошибка при выполнении запроса");
    };

    request.send();

    const form = document.getElementById("tourForm");
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = false;
    }
}

async function submitChangeTournamentForm() {

    const startTournament = document.getElementById("startTournamentDate").value;
    const endTournament = document.getElementById("endTournamentDate").value;
    const name = document.getElementById("name").value;
    const place = document.getElementById("place").value;
    const prize = document.getElementById("prize").value;
    const discipline = document.getElementById("discipline").value;
    const selectTournament = document.getElementById("tourList");
    
    if (startTournament === '' || endTournament === '' || name === '' || discipline === '') {
        alert("Некорректный ввод данных");
    }
    else {
        const id = selectTournament.value;
        const url = "/api/Tournament/"+id;
        //Контракт
        const data = {
            startDate: startTournament,
            endDate: endTournament,
            name: name,
            place: place,
            prize: prize,
            disciplineId: discipline
        };

        //Получение токена
        const token = sessionStorage.getItem("accessToken");
        console.log(token);
        await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        alert("Неверный/истекший токен");
                        window.location.href = "/login";
                    }
                    else throw new Error('Запрос вернул не ok');
                }
                return response.json();
            })
            .then(data => {
                alert("Успешно!");
            })
            .catch(error => {
                console.error('Error:', error);
            });
        const form = document.getElementById("tourForm");
        const elements = form.elements;

        for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute("disabled", "");
        }

    }
    const url = "/api/Tournament";
    const request = new XMLHttpRequest();
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

}

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
    if (startTournament === '' || endTournament === '' || name === '' || discipline === '') {
        alert("Некорректный ввод данных");
    }
    else {
        //Контракт
        const data = {
            startDate: startTournament,
            endDate: endTournament,
            name: name,
            place: place,
            prize: prize,
            disciplineId: discipline
        };

        //Получение токена
        const token = sessionStorage.getItem("accessToken");
        console.log(token);
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        alert("Неверный/истекший токен");
                        window.location.href = "/login";
                    }
                    else throw new Error('Запрос вернул не ok');
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
    
}

buttonChangeUser.addEventListener("click", function () {

    changeUser.style.display = "block";
    mainmenu.style.display = "none";
    addTournamentMenu.style.display = "none";
    addMatchMenu.style.display = "none";


    const nickname = document.getElementById("nickname");
    const password = document.getElementById("password");


})

async function submitChangeUser() {
    const nickname = document.getElementById("nickname");
    const password = document.getElementById("password");

    const url = "/api/User";

    //Контракт
    const data = {
        nickname: nickname.value,
        password: password.value
    };

    const token = sessionStorage.getItem("accessToken");
    console.log(token);

    await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    alert("Неверный/истекший токен");
                    window.location.href = "/login";
                }
                else throw new Error('Запрос вернул не ok');
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