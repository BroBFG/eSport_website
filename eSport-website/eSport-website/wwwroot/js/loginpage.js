var tokenKey = "accessToken";

// при нажатии на кнопку отправки формы идет запрос к /login для получения токена
document.getElementById("submitLogin").addEventListener("click", async e => {
    e.preventDefault();
    // отправляет запрос и получаем ответ
    const response = await fetch("/login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            nickname: document.getElementById("nickname").value,
            password: document.getElementById("password").value
        })
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const data = await response.json();
        console.log(data);
        // сохраняем в хранилище sessionStorage токен доступа
        sessionStorage.setItem(tokenKey, data.access_token);
        console.log(data.access_token);
        window.location.replace("/adminpanel");
    }
    else  // если произошла ошибка, получаем код статуса
    {
        console.log("Status: ", response.status);
        alert("Неверный логин/пароль");
    }
});

