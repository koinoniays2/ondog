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
        const temp = Math.floor(json.main.temp);
        // 현재 지역, 온도
        const currentRegion = document.querySelector(".current-region");
        currentRegion.innerText = json.name;
        const temperature = document.querySelector(".temperature");
        temperature.innerText = temp + "º";
        // 설명
        const stap1 = "<span style='color:#67AB59'>위험하지 않은 온도</span>에요.<br />밖에서 신나게 놀아요!";
        const stap2 = "<span style='color:#67AB59'>위험 가능성이 적은 온도</span>에요.<br />재밌게 놀아도 되지만 조심하세요!";
        const stap3 = "<span style='color:#FFA570'>견종에 따라 안전하지 않은 온도</span>에요.<br />산책시 잘 지켜봐주세요!";
        const stap4 = "<span style='color:#FF6933'>위험할 수 있는 온도</span>에요.<br />장시간 산책은 조심하세요!";
        const stap5 = "<span style='color:#BA2336'>생명을 위협하는 온도</span>에요.<br />장시간 산책을 피해주세요!";
        const descS = document.querySelector(".desc-small");
        const descM = document.querySelector(".desc-medium");
        const descL = document.querySelector(".desc-large");
        // stap1
        if(8 <= temp && temp <= 20) {
            descS.innerHTML = stap1;
            descM.innerHTML = stap1;
        }else if(5 <= temp && temp <= 17) {
            descL.innerHTML = stap1;
        }
        // stap2
        if(5 <= temp && temp <= 7 || 21 <= temp && temp <= 22) {
            descS.innerHTML = stap2;
            descM.innerHTML = stap2;
        }else if(2 <= temp && temp <= 4 || 18 <= temp && temp <= 20) {
            descL.innerHTML = stap2;
        }
        // stap3
        if(-3 <= temp && temp <= 4 || 23 <= temp && temp <= 28) {
            descS.innerHTML = stap3;
            descM.innerHTML = stap3;
        }else if(-8 <= temp && temp <= 1 || 21 <= temp && temp <= 25) {
            descL.innerHTML = stap3;
        }
        // stap4
        if(-5 <= temp && temp <= -4 || 29 <= temp && temp <= 31) {
            descS.innerHTML = stap4;
        }else if(-11 <= temp && temp <= -4 || 29 <= temp && temp <= 31) {
            descM.innerHTML = stap4;
        }
        else if(-11 <= temp && temp <= -9 || 26 <= temp && temp <= 28) {
            descL.innerHTML = stap4;
        }
        // stap5
        if(32 <= temp || temp <= -6) {
            descS.innerHTML = stap5;
        }else if(32 <= temp || temp <= -12) {
            descM.innerHTML = stap5;
        }
        else if(29 <= temp || temp <= -12) {
            descL.innerHTML = stap5;
        }
    });
}
function onGeoFail() {
    alert("현재 위치를 가져올 수 없습니다.");
}
// 매개변수(성공, 실패)
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);