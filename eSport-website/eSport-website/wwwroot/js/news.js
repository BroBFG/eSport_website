
function submitAddNews() {

    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;
    const date = new Date();
    console.log(date);
    url = "/api/News";
    //Контракт
    const data = {
        title: title,
        text: text,
        date: date
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
            alert("Ошибка");
            console.error('Error:', error);
        });
}