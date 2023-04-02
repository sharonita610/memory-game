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

// 하단 버튼 이벤트

const $infobtn = document.querySelector('.info-btn');
const $gameExplain =document.querySelector('#index-why-us');

$infobtn.onclick = function() {
  if ($gameExplain.style.display === 'none') {
    $gameExplain.style.display = 'block';
  } else {
    $gameExplain.style.display = 'none';
  }
};

const $resultbtn = document.querySelector('.result-btn');
const $resultScore =document.querySelector('#index-result-score');
$resultbtn.onclick = function() {
  if ($resultScore.style.display === 'none') {
    $resultScore.style.display = 'block';
  } else {
    $resultScore.style.display = 'none';
  }
};
