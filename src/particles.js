var theme = NaN;
var particlesArray = [];
var isAnimatng = false;

// IMPORTANT THINGS - DŮ NOT TAČ
const canvas = document.getElementById("canvasbg");
const ctx = canvas.getContext("2d");

var counter = 0;

var themes = [
    {
        'theme_name':'dark-theme',
        'canvas.background':[3,1,5],
        'canvas.pallete':[
            [49,17,82],
            [33,8,59],
            [131,32,230]
        ],
        'canvas.blur':160,
        'count_of_circles':8,
        'particles_speed': 0.2
    }
]


// Update resolution -- !! NOT EVERY TIME IT RESIZES !! only on first render (btw je to tak naschvál)
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function setBg() {
  let bg = theme["canvas.background"];

  ctx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
  ctx.fillRect(-100, -100, canvas.width + 1000, canvas.height + 1000);
}

function checkIfIsMobile() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

const isMobile = checkIfIsMobile();

class Particle {
  constructor() {
    // Random location on canvas
    this.x = Math.round(Math.random() * canvas.width - 1);
    this.y = Math.round(Math.random() * canvas.height - 1);

    // Radius -- imma change the formula later
    var radius = Math.round(
      (Math.random() * (canvas.width + canvas.height)) / 5 + canvas.width / 10
    );
    this.size = radius;

    // Speed -- negativ values mean going backwards
    var speed = theme["particles-speed"];
    this.speedX = Math.random() * speed - speed / 2;
    this.speedY = Math.random() * speed - speed / 2;

    // Color pallete
    this.pallete =
      theme["canvas.pallete"][
        Math.round(Math.random() * (theme["canvas.pallete"].length - 1))
      ];
  }
  update() {
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = this.speedY * -1;
    }
    if (this.x > canvas.width || this.x < 0) {
      this.speedX = this.speedX * -1;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    // Choose random palette from theme node

    // Set colour and size of the particle
    ctx.fillStyle = `rgb(${this.pallete[0]},${this.pallete[1]},${this.pallete[2]})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.filter = "blur(" + Math.sqrt(canvas.width * canvas.height) / 10 + "px)";
    ctx.filter = "blur(" + theme["canvas.blur"] + "px)";

    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setBg();
  handleParticles();
  if (!isMobile || counter < 2) {
    requestAnimationFrame(animate);
  }
  if (counter < 4) {
    counter += 1;
  }
}

function updateTheme() {
  var bodyClasses = document.body.getAttribute("class").split(" ");

  for (let i = 0; i < bodyClasses.length; i++) {
    var thatBodyClass = bodyClasses[i].toLowerCase();

    for (let indexx = 0; indexx < themes.length; indexx++) {
      if (themes[indexx]["theme_name"] == thatBodyClass) {
        theme = themes[indexx];

        particlesArray = [];
        for (let i = 0; i < 5; i++) {
          particlesArray.push(new Particle());
        }
        if (!isAnimatng || isMobile) {
          console.log("clicked update themes");
          isAnimatng = true;
          counter = 0;
          animate();
        }
        break;
      }
    }
  }
}

updateTheme();
