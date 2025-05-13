// Intersection Observer for scroll animations
const observerOptions = { threshold: 0.3 };
const elementsToShow = document.querySelectorAll('.pop-title, .quote-block, .prompt-block h2, .btn');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);
elementsToShow.forEach(el => observer.observe(el));

// Confetti animation setup
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let confettiParticles = [];
class Confetti {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * -confettiCanvas.height;
    this.size = Math.random() * 8 + 4;
    this.speed = Math.random() * 3 + 2;
    this.angle = Math.random() * 360;
    this.color = `hsl(${Math.random()*360}, 70%, 60%)`;
  }
  update() {
    this.y += this.speed;
    this.angle += this.speed;
    if (this.y > confettiCanvas.height) this.y = -10;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * Math.PI/180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    ctx.restore();
  }
}

function createConfetti() {
  for (let i = 0; i < 150; i++) confettiParticles.push(new Confetti());
}
function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateConfetti);
}

createConfetti();
animateConfetti();
