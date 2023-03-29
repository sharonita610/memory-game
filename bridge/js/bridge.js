
// 1. 2차원 배열에서 왼쪽과 오른 쪽 중 하나를 선택합니다. [0,0][1,0]
// 2. 선택한 동그라미가 =
// - 정답이라면 한 칸 앞으로 나갑니다.
// - 오답이라면 처음으로 돌아갑니다.
// 3. 계속해서 정답을 선택하여 앞으로 나아가 종착지에 도착하면 성공입니다.
//
// 오답을 입력했다면 처음으로 돌아가서 다시 시도합니다.
// const let


//  변수이름 선언하기

const left = document.getElementsByName('left');
const right = document.getElementsByName('right');
const go = "C:\\memory-game\\bridge\\bridge-img\\bridge-img-girl1.jpg";
const fail = "C:\\memory-game\\bridge\\bridge-img\\bridge-img-fail.png";
const list = [go , fail];
const imagesOrder = [[]];
const step = 0;
const won = true;

// butt



// 노란칸에 랜덤 이미지를 [ o , o ] 적용해주는 함수 생성
function getRandomImages() {
  for (let i = 0; i < left.length; i++) {
    // get random images
    const randomImages = [list[Math.floor(Math.random() * list.length)], list[Math.floor(Math.random() * list.length)]];
    // swap the images if the first one is 'step' 2차원 배열에서 하나가 1이면 다른것이 0이 자동으로 적용되도록 함
    if (randomImages[0] === step) {
      [randomImages[0], randomImages[1]] = [randomImages[1], randomImages[0]];
    }
    imagesOrder[i] = randomImages;
    console.log(imagesOrder[i][1]);
    console.log(imagesOrder[i][0]);
    console.log("-------------------");
  }
}










