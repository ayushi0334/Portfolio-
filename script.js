// AOS
AOS.init({ duration: 900, once: true, easing: 'ease-out' });

// Simple tab router
const tabs = document.querySelectorAll('.tab-btn');
const pages = {
    about: document.getElementById('about'),
    resume: document.getElementById('resume'),
    portfolio: document.getElementById('portfolio'),
    contact: document.getElementById('contact'),
};
tabs.forEach(btn => {
    btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.dataset.tab;
        Object.values(pages).forEach(p => p.hidden = true);
        pages[key].hidden = false;
        // re-trigger AOS when tab changes
        AOS.refreshHard();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Portfolio front-end filter (no backend needed)
const filterBar = document.getElementById('filters');
const cards = [...document.querySelectorAll('#projectGrid .project')];
filterBar?.addEventListener('click', (e) => {
    const target = e.target.closest('.tab-btn');
    if (!target) return;
    filterBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    target.classList.add('active');
    const cat = target.dataset.filter;
    cards.forEach(c => {
        const ok = cat === 'all' || c.dataset.cat.split(' ').includes(cat);
        c.style.display = ok ? '' : 'none';
    });
});

// Demo contact handler (prevent page reload)
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('formNote').hidden = false;
    e.target.reset();
});
