document.addEventListener('DOMContentLoaded', function() {
    loadGallery('./img/mundo_papel/', 'mundo-papel');
    loadGallery('./img/ilustracion/', 'ilustracion');
    loadGallery('./img/grupo_artistico/', 'grupo-artistico');
    loadFotos('./img/gallery/', 'main-gallery');
});

function loadFotos(imagePath, galleryId) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    const imageExtensions = ['jpg', 'JPG'];
    
    imageExtensions.forEach(ext => {
        for (let i = 1; i <= 20; i++) {
            const img = document.createElement('img');
            img.src = `${imagePath}foto${i}.${ext}`;
            img.alt = `Gallery image ${i}`;
            img.loading = 'lazy';
            
            img.onerror = function() {
                this.remove();
            };
            
            gallery.appendChild(img);
        }
    });
}

function loadGallery(imagePath, galleryId) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    const imageExtensions = ['jpg', 'JPG'];
    
    imageExtensions.forEach(ext => {
        for (let i = 1; i <= 20; i++) {
            const img = document.createElement('img');
            img.src = `${imagePath}${i}.${ext}`;
            img.alt = `Gallery image ${i}`;
            img.loading = 'lazy';
            
            img.onerror = function() {
                this.remove();
            };
            
            gallery.appendChild(img);
        }
    });
}