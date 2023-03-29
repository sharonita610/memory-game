timeLeft = 4;
const button = document.getElementById('button');

button.onclick = function countdown(){
  timeLeft--;
  document.getElementById("seconds").innerHTML = String( timeLeft );
  if (timeLeft > 0) {
    setTimeout(countdown, 1000);
  } else if (timeLeft === 0){
    document.getElementById("seconds").innerHTML = String( `게임 시작` );

  }
};

setTimeout(countdown, 1000);



