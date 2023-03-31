 // <--------------------------- gameData setup ---------------------------> //
 const gameData = {
    result: [], // 정답 배열
    inputNumbers: [], // 유저가 입력한 숫자들을 모을 배열
    ignoreNumbers: [], // 0볼 0스트라이크인 숫자 제외시키기
    round: 3, // 라운드
    strike: 0, // 스트라이크
    ball: 0, // 볼
    input: 0, // 유저가 입력한 숫자
    clearRound: 0, // 클리어한 라운드
    maxRound: 1,
}

const $inputView = document.getElementById('input-view'); // 유저가 입력한 값을 띄워주는 부모
const $inputBtnBox = document.getElementById('input-btn-box'); // 유저가 누르는 버튼들의 부모
const $resultBtn = document.getElementById('result-btn');
const $scoreInfo = document.getElementById('score-info');
const $resetBtn = document.getElementById('reset-btn');
const $roundView = document.getElementById('round-view');

// 0 이상 10 미만의 난수 생성
function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

// gameData.result 배열에 값을 추가하는 함수
function makeResult() {
    if (gameData.clearRound === gameData.maxRound) {
        $inputBtnBox.setAttribute('id', 'hide');
        $inputView.setAttribute('id', 'hide');
        $resultBtn.setAttribute('id', 'hide');
        $scoreInfo.setAttribute('id', 'hide');
        $resetBtn.setAttribute('id', 'hide');
        $roundView.setAttribute('id', 'hide');
        return;
    }

    gameData.result = [];
    while (gameData.result.length < gameData.round) {
        const number = +getRandomNumber();
        if (!gameData.result.includes(number)) {
            gameData.result.push(number);
        }
    }
}

// gameData.result 셋업
makeResult();

// <--------------------------- gameData setup ---------------------------> //

// <--------------------------- tag를 생성하는 함수 ---------------------------> //

// 태그를 리턴하는 함수
function childTag($tagName) {
    return document.createElement($tagName);
}

// 부모 태그의 자식 태그로 추가하는 함수
function inputTag($parent, $tagName) {
    $parent.appendChild($tagName);
}

// 태그를 생성하는 함수
function makeNewTag({
    $parent,
    $tagName,
}) {
    inputTag($parent, childTag($tagName));
}

// <--------------------------- tag를 생성하는 함수 ---------------------------> //



// <--------------------------- input-btn 을 눌렀을 때 발생하는 이벤트 ---------------------------> //


// 2. gameData.inputNumbers 배열에 값을 꺼내서 input-view 자식태그로 추가하기.
function viewNumbers() {
    const $newTag = childTag('li');
    $newTag.setAttribute('id', `input-btn${gameData.input}`);
    inputTag($inputView, $newTag);
}


// <--------------------------- input-btn-box 버튼 생성 ---------------------------> //

function setInputBtn() {

    for (let i = 0; i < 10; i++) {

        const $newTag = document.createElement('li');

        $newTag.setAttribute('id', `input-btn${i}`);
        $newTag.setAttribute('class', 'btn');
        $newTag.textContent = i;

        // 0. 클릭하면 숨기는 함수
        $newTag.addEventListener('click', () => {
            $newTag.setAttribute('id', 'hide');
        });

        // 1. gameData.inputNumbers 배열에 값 추가하기
        $newTag.addEventListener('click', () => {
            gameData.inputNumbers.push(+$newTag.textContent);
            gameData.input = +$newTag.textContent;
        });


        // 2. gameData.inputNumbers 배열에 값을 꺼내서 input-view 자식태그로 추가하기.
        $newTag.addEventListener('click', viewNumbers);

        // 0볼 0스트라이크면 제외하기
        if (gameData.ignoreNumbers.includes(i)) {
            $newTag.setAttribute('id', 'hide');
        }

        inputTag($inputBtnBox, $newTag);
    }

}

setInputBtn();

// <--------------------------- result-btn 버튼 클릭 이벤트 처리 ---------------------------> //

// 0. 버튼을 초기화 한다.
function reset() {
    // btn 들을 초기화 한다.
    $inputView.replaceChildren();
    $inputBtnBox.replaceChildren();
    setInputBtn();

    // gameData 초기화
    gameData.input = 0;
    gameData.inputNumbers = [];
    gameData.strike = 0;
    gameData.ball = 0;
    gameData.input = 0;
}

// 1. info 에 값 출력하기
function viewInfoScore() {
    checkResult();

    const $scoreTag = document.createElement('li');
    let $inputNumbers = '⚾️';

    gameData.inputNumbers.forEach($number => {
        $inputNumbers += ` ${$number} `;
    });

    $inputNumbers += `👉 ${gameData.strike}스트라이크! ${gameData.ball}볼!`;
    $scoreTag.textContent = $inputNumbers;

    $scoreInfo.prepend($scoreTag);
    roundUp();
}

// 1-1. 결과 비교하기
function checkResult() {

    // asdfasdfasdf
    const list = gameData.inputNumbers;
    const result = gameData.result;

    for (let i = 0; i < list.length; i++) {
        const number = list[i];

        if (result.includes(number)) {
            if (result[i] === number) {
                gameData.strike++;
            } else {
                gameData.ball++;
            }
        }
    }

    if (gameData.strike === 0 && gameData.ball === 0) {
        list.forEach($number => {
            gameData.ignoreNumbers.push($number);
        })
    }
}

$resultBtn.addEventListener('click', viewInfoScore);
$resultBtn.addEventListener('click', reset);
$resultBtn.addEventListener('click', roundUp);

$resetBtn.addEventListener('click', reset);

// <--------------------------- result-btn 버튼 클릭 이벤트 처리 ---------------------------> //

// 2. 정답을 맞췄을 경우 round level up 시키기
function roundUp() {
    if (gameData.strike === gameData.round) {
        gameData.clearRound++;
        gameData.round++;
        gameData.ignoreNumbers = [];

        $scoreInfo.replaceChildren();
        $roundView.replaceChildren();
        makeRoundView();

        reset();
        makeResult();

        const $baseballLogo = document.querySelector('#baseball-logo .img');

        switch (gameData.clearRound) {
            case 1:
                $baseballLogo.setAttribute('id', 'baseballLogo2');
                break;
            case 2:
                $baseballLogo.setAttribute('id', 'baseballLogo3');
                break;
            case 3:
                $baseballLogo.setAttribute('id', 'baseballLogo4');
                break;
        }

    }
}

function makeRoundView() {
    for (let i = 0; i < gameData.round; i++) {
        $roundView.appendChild(document.createElement('li'));
    }
}