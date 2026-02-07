// JavaScript para efectos interactivos y animaciones

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para navegación
    const navLinks = document.querySelectorAll('.cyber-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de parallax en el hero
    const heroContent = document.querySelector('.hero-content');
    const cyberGrid = document.querySelector('.cyber-grid');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        if (cyberGrid) {
            cyberGrid.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px)) rotate(${scrolled * 0.1}deg)`;
        }
    });

    // Animación de entrada para secciones
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

    // Observar secciones y tarjetas
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.conference-card, .gallery-item, .galeria-item');
    
    [...sections, ...cards].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });

    // Efecto de glitch aleatorio en el título
    const glitchTitle = document.querySelector('.glitch-title');
    if (glitchTitle) {
        setInterval(() => {
            const randomGlitch = Math.random() > 0.8;
            if (randomGlitch) {
                glitchTitle.style.animation = 'none';
                setTimeout(() => {
                    glitchTitle.style.animation = 'glitch 2s ease-in-out infinite';
                }, 100);
            }
        }, 3000);
    }

    // Efecto de typing para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Iniciar typing animation cuando el hero sea visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                const title = entry.target;
                const originalText = title.textContent;
                typeWriter(title, originalText, 150);
                title.classList.add('typed');
            }
        });
    }, { threshold: 0.5 });

    if (glitchTitle) {
        heroObserver.observe(glitchTitle);
    }

    // Efectos hover mejorados para galerías
    const galleryItems = document.querySelectorAll('.gallery-item, .galeria-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Animación de partículas de fondo
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.boxShadow = `0 0 10px currentColor`;
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 3000 + 2000;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = startY - Math.random() * 200;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 0
            },
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    // Crear partículas periódicamente
    setInterval(createParticle, 500);

    // Efecto de onda al hacer click
    document.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
            const ripple = document.createElement('div');
            ripple.style.position = 'fixed';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'radial-gradient(circle, rgba(0, 255, 255, 0.5), transparent)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '9999';
            ripple.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(ripple);
            
            ripple.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                { 
                    transform: 'translate(-50%, -50%) scale(10)',
                    opacity: 0
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => ripple.remove();
        }
    });

    // Efecto de resplandor para el header al hacer scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.cyber-header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
            } else {
                header.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Control de video con detección de visibilidad
    const videos = document.querySelectorAll('video');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => {
        videoObserver.observe(video);
    });

    // Efecto de carga inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Prevenir el comportamiento por defecto de los videos en móviles
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('click', function() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });
    });
});