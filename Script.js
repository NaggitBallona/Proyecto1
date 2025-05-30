const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Valores fijos predeterminados:
let speed = 15;          // velocidad fija
let message = "Te Amo";  // texto fijo
let color = "#ff69b4";   // color fijo

let fontSize = 15;
let columns;
let drops;

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }).fill(1);
}

init();

window.addEventListener('resize', init);

// Aquí eliminamos los event listeners relacionados con inputs (no los incluimos)

// Mantenemos la explosión al click intacta
canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  explosion(x, y);
});

function explosion(x, y) {
  const parts = 20;
  for (let i = 0; i < parts; i++) {
    const angle = (Math.PI * 2 * i) / parts;
    const dx = Math.cos(angle) * 5;
    const dy = Math.sin(angle) * 5;
    animateExplosion(x, y, dx, dy);
  }
}

function animateExplosion(x, y, dx, dy) {
  let life = 30;
  function frame() {
    if (life <= 0) return;
    ctx.fillStyle = color;
    ctx.font = "bold 16px Arial";
    ctx.fillText(message, x + dx * (30 - life), y + dy * (30 - life));
    life--;
    requestAnimationFrame(frame);
  }
  frame();
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;

  for (let i = 0; i < drops.length; i++) {
    ctx.fillText(message, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[i] = 1;
    }

    drops[i]++;
  }
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
    draw();
  }, 1000 / speed);
}

animate();
