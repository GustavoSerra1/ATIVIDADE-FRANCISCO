// ===== BARRA DE PROGRESSO DE ROLAGEM =====
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// ===== SCROLL REVEAL (IntersectionObserver) =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== NAV LATERAL: destaque da seção ativa =====
const sections = document.querySelectorAll('section[id]');
const dotItems = document.querySelectorAll('.dot-nav-item');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const dot = document.querySelector(`.dot-nav-item[data-target="${entry.target.id}"]`);
        if (!dot) return;
        if (entry.isIntersecting) {
            dotItems.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));

// ===== EFEITO "LIQUID GLASS": glow segue o mouse nos cards =====
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
    });
});

// ===== SIMULADOR DE ELASTICIDADE (Tópico 4) =====
const elasticBtn = document.getElementById('elastic-btn');
const elasticBars = document.querySelectorAll('.elastic-bar');
let scaledUp = false;

if (elasticBtn) {
    elasticBtn.addEventListener('click', () => {
        scaledUp = !scaledUp;
        elasticBars.forEach((bar, i) => {
            const target = scaledUp ? (0.55 + Math.random() * 0.45) : 0.3;
            setTimeout(() => {
                bar.style.transform = `scaleY(${target})`;
            }, i * 80);
        });
        elasticBtn.textContent = scaledUp ? 'Voltar à carga normal' : 'Simular pico de tráfego';
    });
}

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});