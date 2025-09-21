// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer le menu mobile lors du clic sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Scroll smooth pour les ancres
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensation pour la navbar fixe
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion du formulaire de guide gratuit
    const guideForm = document.getElementById('guideForm');
    if (guideForm) {
        guideForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(this);
            const email = formData.get('email');
            const nom = formData.get('nom');
            const prenom = formData.get('prenom');
            const date = formData.get('date');
            
            // Validation simple
            if (!email || !nom || !prenom || !date) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Simulation d'envoi (remplacez par votre logique d'envoi réelle)
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'ENVOI EN COURS...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Merci ${prenom} ${nom} ! Votre guide gratuit sera envoyé à ${email} dans 1-2 heures.`);
                submitBtn.textContent = 'GUIDE ENVOYÉ !';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 3000);
            }, 2000);
        });
    }

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les sections pour les animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animation du hero au chargement
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 300);
        
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }

    // Effet de parallaxe léger sur le hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Highlight navigation active
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Styles supplémentaires pour les animations et le menu mobile
const additionalStyles = `
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav-link.active {
        color: #8B4513;
        border-bottom: 2px solid #8B4513;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;

// Injection des styles supplémentaires
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);