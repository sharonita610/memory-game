// 👇 ---------------------------- gameData setup ---------------------------- 👇 //

// gameData
const gameData = {
  result: [], // 정답을 가지고 있을 배열
  round: 1, // 현재 단계
  clearRound: 0, // 최종 클리어한 단계
  checkFinal: 0,
  clickCount: 0,
  endRound: 0,
}

gameData.checkFinal = gameData.clearRound;

// 난수 생성 함수 (return 0 or 1)
function getRandomNumber() {
  return Math.floor(Math.random() * 10) % 2;
}

// result setup [ ex) console.log(gameData.result) 👉 [0, 1, 1, 0, 1, 1] ]
function setResult() {
  gameData.result.push(getRandomNumber());
}

// 6단계까지 답 생성하기 (위의 함수 6번 호출(번호 6개 추가))
for (let i = 0; i < 6; i++) {
  setResult();

}
// 👆 ---------------------------- gameData setup ---------------------------- 👆 //


// 👇 ---------------------------- bridge setup ---------------------------- 👇 //
// 부모를 호출해서 자식태그들을 배열로 선언
const $leftBtn = [...document.getElementById('bridge-left-btn').children];
const $rightBtn = [...document.getElementById('bridge-right-btn').children];

// 클릭했을 때 알람을 띄우는 함수 (왼쪽 다리, 테스트용)
function clickLeftAlert() {
  alert("왼쪽 다리 클릭됨!");
  return true;
}

// 클릭했을 때 알람을 띄우는 함수 (오른쪽 다리, 테스트용)
function clickRightAlert() {
  alert("오른쪽 다리 클릭됨!");
  return true;

}

// 왼쪽 다리 버튼 onclick 이벤트에 alert 띄우는 함수 추가하기
$leftBtn.forEach($li => {
  if (gameData.round <= 7) {
    $li.addEventListener('click', clickLeftAlert);
  }
});

// 오른쪽 다리 버튼 onclick 이벤트에 alert 띄우는 함수 추가하기
$rightBtn.forEach($li => {
  if (gameData.round <= 7) {
    $li.addEventListener('click', clickRightAlert);
  }
});

// $btn 태그에게 disabled=true 를 추가하는 함수 (true는 클릭이 안 됨)
function setDisabled($btn) {
  $btn.setAttribute('disabled', true);
}

// $btn 태그에게 disabled를 삭제함 (클릭이 됨)
function removeDisabled($btn) {
  $btn.removeAttribute('disabled');
}

// 왼쪽 다리와 오른쪽 다리 전부를 클릭 불가하게 만듬
$leftBtn.forEach($li => setDisabled($li));
$rightBtn.forEach($li => setDisabled($li));

// 왼쪽, 오른쪽 다리의 첫번째 자식은 클릭이 되게끔 disabled 해제
removeDisabled($leftBtn[0]);
removeDisabled($rightBtn[0]);

// gameData.result 가 가지고 있는 정답 배열을 기준으로
// 다리들에게 정답을 부여하기
// key 값은 'result' 이며 밸류는 0과 1 두 개만 존재
for (let i = 0; i < 6; i++) {
  if (gameData.result[i]) {
    $leftBtn[i].setAttribute('result', 1);
    $rightBtn[i].setAttribute('result', 0);
  } else {
    $leftBtn[i].setAttribute('result', 0);
    $rightBtn[i].setAttribute('result', 1);
  }
}

// 👆 현재 상태는 1번째 다리만 클릭이되고 나머지 다리는 클릭이 불가함

// --- 아래의 코드부터는 클릭 했을 때 정답(1)일 경우와, 오답(0)일 경우로 나누어 로직을 구현 --- //

// ✅ 정답(1)일 경우 ✅
// ->> 클릭된 버튼에게 disabled=true를 부여해 클릭이 안 되게 만듬
// ->> left, right 버튼 둘 다 클릭이 안 되게 만들어야함
// ❌ 오답(1)일 경우 ❌
// ->> round를 1단계로 초기화하고 맨 처음 셋업(1번 다리만 클릭이 가능하게)으로 돌려놔야 함


// ❌ 오답(1)일 경우 ❌ 초기화하는 함수
function resetBridge() {

  // 왼쪽 다리와 오른쪽 다리 전부를 클릭 불가하게 만듬
  $leftBtn.forEach($li => setDisabled($li));
  $rightBtn.forEach($li => setDisabled($li));

  // 왼쪽, 오른쪽 다리의 첫번째 자식은 클릭이 되게끔 disabled 해제
  removeDisabled($leftBtn[0]);
  removeDisabled($rightBtn[0]);

  // round 1단계로 초기화
  gameData.round = 1;
}
// 점수 배점
//



const $leftBtnList = [...document.querySelector('#bridge-left-btn').children];
const $rightBtnList = [...document.querySelector('#bridge-right-btn').children];


[$leftBtnList, $rightBtnList].forEach($list => {

  $list.forEach($btn => {
    console.log($btn);
    $btn.onclick = function checkResult() {

      let checkNum = +$btn.getAttribute('result');

      // 1. click ++
      gameData.clickCount++;

      if (checkNum) {
        if (gameData.round === 6) {
          alert(`승리하셨습니다.\n${gameData.clickCount}번만에 성공하셨습니다\n 최종점수는 100점 입니다.`);

        } else {
          alert("※정답입니다!※\n\n한 칸 앞으로 이동했습니다! \n다음 다리를 선택하세요");
        }

        // 나랑 짝꾹 클릭 x
        setDisabled($leftBtnList[gameData.round - 1]);
        setDisabled($rightBtnList[gameData.round - 1]);

        // 형 클릭 되게 하고
        removeDisabled($leftBtnList[gameData.round]);
        removeDisabled($rightBtnList[gameData.round]);


        // 라운드 올리기
        gameData.round++; //6 7
      } else {
        alert(`    ※정답이 아닙니다※ \n 처음부터 다시 시작하세요!`);
        resetBridge();
      }

    }


})
});
// 하단 게임설명 버튼 이벤트
const $infobtn = document.querySelector('.info-btn1');
const $gameExplain = document.querySelector('#bridge-howto');


console.log($infobtn);
console.log($gameExplain);


$infobtn.onclick = function () {
  if ($gameExplain.style.display === 'none') {
    $gameExplain.style.display = 'block';
  } else {
    $gameExplain.style.display = 'none';
  }
};

// <————————————— 광고 클릭 이벤트 —————————————> //
const $slider = document.getElementById('slider');
const $rightSlider = document.getElementById('right-slider');
$slider.addEventListener('click', coupang);
$rightSlider.addEventListener('click', coupang);

function coupang() {
  window.location.href = 'https://link.coupang.com/a/TPqZ7';
}