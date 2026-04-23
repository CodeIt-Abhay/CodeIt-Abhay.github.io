const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  cursor.style.left = (e.clientX - 6) + 'px';
  cursor.style.top = (e.clientY - 6) + 'px';
  setTimeout(() => {
    trail.style.left = (e.clientX - 3) + 'px';
    trail.style.top = (e.clientY - 3) + 'px';
  }, 80);
});

// TYPED EFFECT
const phrases = ['Full-Stack Developer', 'MERN Stack Dev', 'Java Programmer', 'AI App Builder', 'Problem Solver'];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed');
function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1500); return; }
  } else {
    el.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 50 : 80);
}
type();

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// NAV ACTIVE
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 100) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + s.id);
      });
    }
  });
});
// SHUFFLE DECK
function shuffleDeck() {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;
  const cards = Array.from(grid.children);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    grid.appendChild(cards[j]);
    cards.splice(j, 1);
  }
  // re-insert remaining
  cards.forEach(c => grid.appendChild(c));
}