let slideImage = document.querySelectorAll(".card");

let dots = document.querySelectorAll(".dot");

const container = document.querySelector(".slider");

var counter = 0;

// For next Slide
function slideNext() {
  slideImage[counter].style.animation = "next1 0.5s ease-in forwards";

  if (counter >= slideImage.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImage[counter].style.animation = "next2 0.5s ease-in forwards";
  indicators();
}

// For prev Slide
function slidePrev() {
  slideImage[counter].style.animation = "prev1 0.5s ease-in forwards";

  if (counter == 0) {
    counter = slideImage.length - 1;
  } else {
    counter--;
  }
  slideImage[counter].style.animation = "prev2 0.5s ease-in forwards";
  indicators();
}

// Automatic Sliding
function autoSliding() {
  deletInterval = setInterval(timer, 5000);
  function timer() {
    slideNext();
    indicators();
  }
}

autoSliding();

// Pause Sliding on Mouseover
container.addEventListener("mouseover", function () {
  clearInterval(deletInterval);
});

// Resume Sliding on Mouseout
container.addEventListener("mouseout", autoSliding);

// For active Indicators Dots
function indicators() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  dots[counter].className += " active";
}

// For Clickable Dots
function switchCard(currentCard) {
  currentCard.classList.add("active");
  var cardId = currentCard.getAttribute("attr");

  if (cardId > counter) {
    slideImage[counter].style.animation = "next1 0.5s ease-in forwards";
    counter = cardId;
    slideImage[counter].style.animation = "next2 0.5s ease-in forwards";
  } 

  else if (cardId == counter) {
    return;
  }
  
  else {
    slideImage[counter].style.animation = "prev1 0.5s ease-in forwards";
    counter = cardId;
    slideImage[counter].style.animation = "prev2 0.5s ease-in forwards";
  }

  indicators();
}
