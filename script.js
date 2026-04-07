
/* ── CURSOR TRACKING ── */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0;
let rx = 0, ry = 0;


document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});
 
(function animateCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
})();
 
document.querySelectorAll('a, button, .distort-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});
 
/* ── GLOBAL RIPPLE CANVAS (full page) ── */
(function() {
  const canvas = document.getElementById('ripple-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  const ripples = [];
 
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
 
  let lastX = -1, lastY = -1;
  document.addEventListener('mousemove', e => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const speed = Math.sqrt(dx*dx + dy*dy);
    if (speed > 6) {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, maxR: 80 + speed * 1.5, alpha: 0.35, speed: 1.2 + speed * 0.04 });
      lastX = e.clientX; lastY = e.clientY;
    }
  });
 
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = ripples.length - 1; i >= 0; i--) {
      const p = ripples[i];
      p.r += p.speed;
      p.alpha *= 0.94;
      if (p.r > p.maxR || p.alpha < 0.005) { ripples.splice(i, 1); continue; }
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, `rgba(37,99,235,0)`);
      grad.addColorStop(0.6, `rgba(59,130,246,${p.alpha * 0.4})`);
      grad.addColorStop(0.85, `rgba(37,99,235,${p.alpha})`);
      grad.addColorStop(1, `rgba(37,99,235,0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
 
/* ── PER-CARD WAVE SIMULATION ── */
function initCardWave(card) {
  const canvas = card.querySelector('.card-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  let mouseX = 0.5, mouseY = 0.5;
  let targetX = 0.5, targetY = 0.5;
  let isHovered = false;
  let intensity = 0;
  let time = 0;
 
  function resize() {
    const rect = card.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
  }
 
  const ro = new ResizeObserver(resize);
  ro.observe(card);
  resize();
 
  card.addEventListener('mouseenter', () => { isHovered = true; });
  card.addEventListener('mouseleave', () => { isHovered = false; });
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    targetX = (e.clientX - rect.left) / rect.width;
    targetY = (e.clientY - rect.top) / rect.height;
  });
 
  function draw() {
    intensity += (isHovered ? 1 : -1) * 0.04;
    intensity = Math.max(0, Math.min(1, intensity));
    mouseX += (targetX - mouseX) * 0.08;
    mouseY += (targetY - mouseY) * 0.08;
    time += 0.018;
 
    ctx.clearRect(0, 0, W, H);
 
    if (intensity < 0.01) { requestAnimationFrame(draw); return; }
 
    const cx = mouseX * W;
    const cy = mouseY * H;
    const maxR = Math.max(W, H) * 1.1;
 
    for (let ring = 0; ring < 5; ring++) {
      const phase = ring * 0.7;
      const baseR = (maxR * 0.18) * (ring + 1);
      const wobble = Math.sin(time * 2 + phase) * 18 * intensity;
      const r = baseR + wobble;
      const alpha = (0.22 - ring * 0.038) * intensity;
 
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, `rgba(37,99,235,0)`);
      grad.addColorStop(0.55, `rgba(59,130,246,${alpha * 0.5})`);
      grad.addColorStop(0.85, `rgba(37,99,235,${alpha})`);
      grad.addColorStop(1, `rgba(37,99,235,0)`);
 
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
 
      const pts = 80;
      for (let i = 0; i <= pts; i++) {
        const angle = (i / pts) * Math.PI * 2;
        const distortion = 1 + Math.sin(angle * 4 + time * 3 + phase) * 0.06 * intensity
                             + Math.sin(angle * 7 - time * 2 + phase * 1.3) * 0.04 * intensity;
        const px = Math.cos(angle) * r * distortion;
        const py = Math.sin(angle) * r * distortion;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
 
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }
 
    // center glow
    const glowR = 60 + Math.sin(time * 3) * 10;
    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR * intensity * 2);
    glowGrad.addColorStop(0, `rgba(99,155,255,${0.3 * intensity})`);
    glowGrad.addColorStop(1, `rgba(37,99,235,0)`);
    ctx.beginPath();
    ctx.arc(cx, cy, glowR * intensity * 2, 0, Math.PI * 2);
    ctx.fillStyle = glowGrad;
    ctx.fill();
 
    requestAnimationFrame(draw);
  }
  draw();
}
 
document.querySelectorAll('.project-card').forEach(initCardWave);
 
/* ── HERO PARALLAX GLOW ── */
const heroGlow = document.getElementById('hero-glow');
document.addEventListener('mousemove', e => {
  const dx = (e.clientX / window.innerWidth - 0.5) * 40;
  const dy = (e.clientY / window.innerHeight - 0.5) * 40;
  heroGlow.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
});

// Get the current year for the copyright
const year = new Date().getFullYear();
// Update the year in the footer
document.getElementById('current-year').textContent = year;
