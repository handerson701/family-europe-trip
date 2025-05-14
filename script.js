// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.3 });

// Elements to observe
[...document.querySelectorAll('.pop-title, .globe-container, .quote-block, .prompt-section, .btn')]
  .forEach(el => observer.observe(el));

// Hamburger menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
menuToggle.addEventListener('click', () => {
  dropdownMenu.classList.toggle('open');
});

// Confetti animation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confetti = [], w, h;
const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
window.addEventListener('resize', resize);
resize();
class C { constructor() { this.x = Math.random()*w; this.y = Math.random()*-h; this.size = Math.random()*8+4; this.speed = Math.random()*3+2; this.angle = Math.random()*360; this.color = `hsl(${Math.random()*360},70%,60%)`; } update() { this.y += this.speed; this.angle += this.speed; if(this.y>h) this.y=-10; } draw() { ctx.save(); ctx.translate(this.x,this.y); ctx.rotate(this.angle*Math.PI/180); ctx.fillStyle=this.color; ctx.fillRect(-this.size/2,-this.size/2,this.size,this.size); ctx.restore(); } }
const make = () => { for(let i=0;i<150;i++) confetti.push(new C()); };
const run = () => { ctx.clearRect(0,0,w,h); confetti.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(run); };
make(); run();

// Fade out confetti
setTimeout(() => { canvas.style.opacity = '0'; }, 3000);
