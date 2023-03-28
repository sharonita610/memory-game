glasses = document.getElementsByClassName('glass');
left = document.getElementsByClassName('left');
right = document.getElementsByClassName('right');
div_finish = document.getElementById('#char-finish');
step = "C://Users//1BestCsharp//Downloads//steps.png";
nostep = "C://Users//1BestCsharp//Downloads//nostep.png";
list = [step, nostep];
imagesOrder = [[]];
counter = 0;
won = true;
index = 0;

// create a function to enable buttons
function enableButton()
{
  if(counter <= left.length - 1)
  {
    left[counter].disabled = false;
    right[counter].disabled = false;
  }
}

// create a function to populate imagesOrder with random images
function getRandomImages()
{
  for(let i = 0; i < left.length; i++)
  {
    imagesOrder[i] = [];
    // get random image
    random_image = list[Math.floor(Math.random()*list.length)];

    if(random_image == step)
    {
      imagesOrder[i][0] = random_image;
      imagesOrder[i][1] = nostep;
    }
    else
    {
      imagesOrder[i][0] = random_image;
      imagesOrder[i][1] = step;
    }

    console.log(imagesOrder[i][1]);
    console.log(imagesOrder[i][0]);
    console.log("-------------------");

  }
}

function stepInThis(pic)
{
  if(pic.classList.contains('left'))
  {
    if(pic.disabled == false)
    {
      if(imagesOrder[counter][0] == nostep)
      {
        won = false;
      }
      if(counter == imagesOrder.length-1 && won == true)
      {
        div_finish.setAttribute("style",
          "background-image: url('"+imagesOrder[counter][0]+"');");
        alert("You've Won");
      }
      else if(won == false)
      {
        alert("You've Lost");
      }

      pic.setAttribute("style",
        "background-image: url('"+imagesOrder[counter][0]+"');");
      pic.disabled = true;
      right[counter].disabled = true;
      counter++;
      enableButton();
    }

  }
  else if(pic.classList.contains('right'))
  {
    if(pic.disabled == false)
    {
      if(imagesOrder[counter][1] == nostep)
      {
        won = false;
      }
      if(counter == imagesOrder.length-1 && won == true)
      {
        div_finish.setAttribute("style",
          "background-image: url('"+imagesOrder[counter][1]+"');");
        alert("You've Won");
      }
      else if(won == false)
      {
        alert("You've Lost");
      }

      pic.setAttribute("style",
        "background-image: url('"+imagesOrder[counter][1]+"');");
      pic.disabled = true;
      left[counter].disabled = true;
      counter++;
      enableButton();
    }
  }
}


// create a function to play again
function playagain()
{
  won = true;
  for(let i = 0; i < left.length; i++)
  {
    left[i].setAttribute("style","background-image: url();");
    right[i].setAttribute("style","background-image: url();");
    left[i].disabled = true;
    right[i].disabled = true;
  }

  counter = 0;
  enableButton();
  getRandomImages();
}



getRandomImages();
enableButton();
