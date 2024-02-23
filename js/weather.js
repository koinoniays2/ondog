// 현재 기온 불러오기
const API_KEY = "6b8662b4d475e9fba4dc9aa9156bd3e9";
function onGeoSuccess(position) {
    // console.log(position);
    // 위치정보를 구해서 API주소에 넣기
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
    .then(response => response.json())
    .then(json => {
        const currentRegion = document.querySelector(".current-region");
        currentRegion.innerText = json.name;
        const temperature = document.querySelector(".temperature");
        temperature.innerText = Math.floor(json.main.temp) + "º";
    });
}
function onGeoFail() {
    alert("현재 위치를 가져올 수 없습니다.");
}
// 매개변수(성공, 실패)
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);