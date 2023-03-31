// import userInfo from "./user";
(function () {

    const $nameStartBtn = document.getElementById('name-start-btn');
    $nameStartBtn.onclick = () => {
        const $userInfo = document.getElementById('user-info');
        $userInfo.style.display = 'flex';

        console.log(userInfo);
        userInfo.cardScore += 100;
        console.log(userInfo);
    }
})()