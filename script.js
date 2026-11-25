const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const roles = ['Networking Enthusiast', 'Tech Learner', 'Arduino Developer', 'Future IT Professional'];
const typed = document.getElementById('typedText');
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  typed.textContent = current.slice(0, charIndex);
  if (!deleting && charIndex < current.length) {
    charIndex++; setTimeout(typeRole, 85);
  } else if (!deleting) {
    deleting = true; setTimeout(typeRole, 1350);
  } else if (charIndex > 0) {
    charIndex--; setTimeout(typeRole, 38);
  } else {
    deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 250);
  }
}
typeRole();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const progress = document.getElementById('scrollProgress');
const backTop = document.getElementById('backTop');
const sections = [...document.querySelectorAll('main section[id]')];
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  backTop.classList.toggle('show', window.scrollY > 500);
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

const modal = document.getElementById('projectModal');
document.querySelectorAll('.project-detail').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = button.dataset.title;
    document.getElementById('modalDetail').textContent = button.dataset.detail;
    modal.showModal();
  });
});
document.getElementById('modalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target === modal) modal.close();
});
