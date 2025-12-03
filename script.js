document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('main .section');

    menuToggle?.addEventListener('click', () => {
        nav?.classList.toggle('open');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                nav?.classList.remove('open');
            }
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    const activateNav = () => {
        let currentId = '';
        sections.forEach((section) => {
            const offset = section.offsetTop - 120;
            if (window.scrollY >= offset) {
                currentId = section.getAttribute('id') || '';
            }
        });
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    };

    activateNav();
    window.addEventListener('scroll', activateNav);

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
