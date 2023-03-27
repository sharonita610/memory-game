const container = document.querySelector('.img-box'),
  slides = document.querySelectorAll('img'),
  slidecounter = slides.length;
let currentIndex = 0;


var lele = 0;
var i = 0;
function moveleft() {
  if (i < slidecounter - 1) {
    lele += 100;
    i++;
    container.style.transition = '.3s'
    setTimeout('moveleft()', 3000);
  } else {
    container.style.transition = '0s'
    lele = 0;
    i = 0;
    setTimeout('moveleft()', 0);
  }

  container.style.left = "-" + lele + "%";

}

moveleft();