let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");

const init = () => {
  let gradientColor = context.createLinearGradient(0, 0, 135, 135);
  gradientColor.addColorStop(0, "#c3a3f1");
  gradientColor.addColorStop(1, "#6414e9");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, 200, 200);
};

//initially mouse X and mouse Y positions are 0
let mouseX = 0;
let mouseY = 0;
let isDragged = false;

//Events for touch and mouse
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//Detech touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error.
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Get left and top of canvas
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

//Exact x and y position of mouse/touch
const getXY = (e) => {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

isTouchDevice();
//Start Scratch
canvas.addEventListener(events[deviceType].down, (event) => {
  isDragged = true;
  //Get x and y position
  getXY(event);
  scratch(mouseX, mouseY);
});

//mousemove/touchmove
canvas.addEventListener(events[deviceType].move, (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
  }
  if (isDragged) {
    getXY(event);
    scratch(mouseX, mouseY);
  }
});

//stop drawing
canvas.addEventListener(events[deviceType].up, () => {
  isDragged = false;
});

//If mouse leaves the square
canvas.addEventListener("mouseleave", () => {
  isDragged = false;
});

const scratch = (x, y) => {
  //destination-out draws new shapes behind the existing canvas content
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  //arc makes circle - x,y,radius,start angle,end angle
  context.arc(x, y, 12, 0, 2 * Math.PI);
  context.fill();
};

//const numberElement = document.getElementById('number');

// Generate a random number between 1 and 100
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Update the number element with a new random number
function updateNumber() {
  const randomNumber = generateRandomNumber();
  numberElement.textContent = randomNumber;
}

// Array of image URLs
const images = [
  //'Gpay_Card 4.jpg',
  'Gpay_Card1.jpg',
 // 'Gpay_Card2.jpg',
 // 'Gpay_Card3.jpg',
  // Add more image URLs here
];

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to display shuffled image
function displayShuffledImage() {
  const shuffledImage = document.getElementById('shuffled-image');
  shuffleArray(images);
  shuffledImage.src = images[0];
}

//Display a shuffled image when the page is loaded or refreshed
window.addEventListener('load', displayShuffledImage);


// Call updateNumber when the page loads
//window.addEventListener('load', updateNumber);


window.onload = init();