document.addEventListener('DOMContentLoaded', function() {
    createStaticEffect();
    addRandomGlitches();
    createScanlines();
    addColorShiftEffect();
});

function createStaticEffect() {
    const staticOverlay = document.querySelector('.static-overlay');
    
    setInterval(() => {
        const intensity = Math.random() * 0.3 + 0.1;
        staticOverlay.style.opacity = intensity;
        
        if (Math.random() > 0.8) {
            staticOverlay.style.background = `
                repeating-linear-gradient(
                    ${Math.random() * 360}deg,
                    rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.3}) 0px,
                    transparent 1px,
                    transparent 2px,
                    rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.3}) 3px
                )
            `;
            
            setTimeout(() => {
                staticOverlay.style.background = `
                    repeating-linear-gradient(
                        0deg,
                        rgba(255, 255, 255, 0.1) 0px,
                        transparent 1px,
                        transparent 2px,
                        rgba(255, 255, 255, 0.1) 3px
                    )
                `;
            }, 100);
        }
    }, 200);
}

function addRandomGlitches() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        setInterval(() => {
            if (Math.random() > 0.9) {
                text.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) skew(${Math.random() * 10 - 5}deg)`;
                text.style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                
                setTimeout(() => {
                    text.style.transform = 'translate(0, 0) skew(0deg)';
                    text.style.color = '';
                }, 200);
            }
        }, 1000);
    });
}

function createScanlines() {
    const tvScreen = document.querySelector('.tv-screen');
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    scanlines.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
        );
        pointer-events: none;
        z-index: 11;
    `;
    tvScreen.appendChild(scanlines);
    
    let offset = 0;
    setInterval(() => {
        offset += 0.5;
        scanlines.style.transform = `translateY(${offset}px)`;
        if (offset > 2) offset = 0;
    }, 50);
}

function addColorShiftEffect() {
    const tvContainer = document.querySelector('.tv-container');
    
    setInterval(() => {
        const hue1 = Math.random() * 360;
        const hue2 = Math.random() * 360;
        const hue3 = Math.random() * 360;
        
        tvContainer.style.filter = `
            hue-rotate(${Math.random() * 30 - 15}deg) 
            contrast(${Math.random() * 0.4 + 0.8}) 
            brightness(${Math.random() * 0.4 + 0.8})
            saturate(${Math.random() * 1.5 + 1})
        `;
        
        if (Math.random() > 0.95) {
            tvContainer.style.filter = 'invert(1) hue-rotate(180deg)';
            setTimeout(() => {
                tvContainer.style.filter = '';
            }, 100);
        }
    }, 3000);
}

document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.conference-card, .tv-poster');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - cardX, 2) + Math.pow(e.clientY - cardY, 2));
        
        if (distance < 200) {
            const intensity = 1 - (distance / 200);
            card.style.filter = `
                hue-rotate(${mouseX * 360}deg) 
                saturate(${1 + intensity})
                brightness(${1 + intensity * 0.3})
            `;
        } else {
            card.style.filter = '';
        }
    });
});

setInterval(() => {
    const body = document.body;
    if (Math.random() > 0.98) {
        body.style.background = '#000';
        setTimeout(() => {
            body.style.background = '';
        }, 150);
    }
}, 2000);