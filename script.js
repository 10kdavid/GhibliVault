document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    // Add loading class to body
    body.classList.add('loading');
    
    // Hide loading screen after content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            body.classList.remove('loading');
            
            // Start intro animations after loading screen fades
            startIntroAnimations();
        }, 2000); // Keep loading screen for a bit to showcase the animation
    });
    
    // New function for intro animations
    function startIntroAnimations() {
        const header = document.querySelector('header');
        const intro = document.querySelector('.intro');
        
        header.classList.add('animate-in');
        
        setTimeout(() => {
            intro.classList.add('animate-in');
        }, 800);
        
        setTimeout(() => {
            addFloatingElements();
        }, 1500);
    }
    
    // Get all the Ghibli-style images from the directory
    const imageFiles = [
        './Gm_QV2OawAAi0JU.jpg',
        './Gm-4J84XkAEJR2P.jpg',
        './Gm932kTW0AAcBMc.jpg',
        './Gm_f4-GWUAAcuEB.jpg',
        './Gm9yXMqXQAAsZio.jpg',
        './Gm-hwI5WYAAW1Cf.jpg',
        './Gm_hyhrXwAA1JZH.png',
        './Gm96aP2WsAAOgoX.jpg',
        './Gm_9b2cWMAA7Gek.jpg',
        './Gm_jx9pWUAA68U5.jpg',
        './Gm_1ml_WYAESezy.jpg',
        './Gm_taw8XEAAobg-.jpg',
        './Gm-ocJaXQAA3Apv.jpg',
        './Gm-ojmyWYAECaXg.jpg',
        './Gm93YmOWQAAQDbo.jpg',
        './Gm93YmTWwAAiaSj.jpg',
        './Gm93YmcXgAAx04t.jpg',
        './Gm93YncWQAAJWDk.jpg',
        './Gm-ucQqbYAMiRtn.jpg',
        './Gm8d8ANbYAEM_gO.jpg',
        './Gm8d8AObYAImwUr.jpg',
        './Gm8d8APbYAABxhq.jpg',
        './Gm8d82gasAAmG94.jpg'
    ];

    // Reference to the gallery container
    const galleryContainer = document.getElementById('gallery');
    
    // Set up the new masonry gallery
    setupMasonryGallery();
    
    function setupMasonryGallery() {
        // Create a masonry grid for the images
        galleryContainer.innerHTML = '';
        galleryContainer.classList.add('masonry-gallery');
        
        // Create gallery items
        imageFiles.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.index = index;
            
            // Add category class (just for visual variety)
            const categories = ['nature', 'character', 'landscape', 'fantasy'];
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            galleryItem.classList.add(randomCategory);
            
            // Create image
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Ghibli-style AI art ${index + 1}`;
            img.loading = 'lazy';
            
            // Create image container with overlay elements
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            
            // Create overlay elements
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            
            const overlayContent = document.createElement('div');
            overlayContent.className = 'overlay-content';
            
            const viewButton = document.createElement('button');
            viewButton.className = 'view-button';
            viewButton.innerHTML = '<i class="icon">🔍</i>';
            viewButton.setAttribute('aria-label', 'View image');
            
            // Assemble the item
            overlayContent.appendChild(viewButton);
            overlay.appendChild(overlayContent);
            imageContainer.appendChild(img);
            imageContainer.appendChild(overlay);
            galleryItem.appendChild(imageContainer);
            
            // Create animated frame/border for each item
            const frame = document.createElement('div');
            frame.className = 'item-frame';
            galleryItem.appendChild(frame);
            
            // Create holographic effect
            const holographic = document.createElement('div');
            holographic.className = 'holographic-effect';
            galleryItem.appendChild(holographic);
            
            // Add to gallery
            galleryContainer.appendChild(galleryItem);
            
            // Add click event to open lightbox
            galleryItem.addEventListener('click', () => {
                openLightbox(index);
            });
        });
        
        // Initialize animations
        initGalleryAnimations();
    }
    
    // Initialize gallery animations
    function initGalleryAnimations() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Create an intersection observer for reveal animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    // Staggered animation when element comes into view
                    setTimeout(() => {
                        entry.target.classList.add('appear');
                    }, idx % 5 * 150); // Stagger by row position
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe each gallery item
        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    let currentIndex = 0;
    
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = imageFiles[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        
        // Enhanced lightbox entrance animation
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.9) rotate(-2deg)';
        
        setTimeout(() => {
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1) rotate(0deg)';
        }, 10);
        
        // Add magic dust effect when opening lightbox
        createMagicDust(lightbox);
    }
    
    function closeLightboxFn() {
        // Enhanced exit animation
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.9) translateY(20px)';
        
        setTimeout(() => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }
    
    function navigateNext() {
        currentIndex = (currentIndex + 1) % imageFiles.length;
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'translateX(40px) scale(0.95)';
        
        setTimeout(() => {
            lightboxImg.src = imageFiles[currentIndex];
            setTimeout(() => {
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'translateX(0) scale(1)';
                createMagicDust(lightbox);
            }, 50);
        }, 300);
    }
    
    function navigatePrev() {
        currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'translateX(-40px) scale(0.95)';
        
        setTimeout(() => {
            lightboxImg.src = imageFiles[currentIndex];
            setTimeout(() => {
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'translateX(0) scale(1)';
                createMagicDust(lightbox);
            }, 50);
        }, 300);
    }
    
    // Event listeners for lightbox
    nextBtn.addEventListener('click', navigateNext);
    prevBtn.addEventListener('click', navigatePrev);
    closeLightbox.addEventListener('click', closeLightboxFn);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFn();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowRight') {
            navigateNext();
        } else if (e.key === 'ArrowLeft') {
            navigatePrev();
        } else if (e.key === 'Escape') {
            closeLightboxFn();
        }
    });
    
    // Floating elements function
    function addFloatingElements() {
        const container = document.querySelector('.parallax-wrapper');
        const elementsCount = 15; // Reduced count to be less distracting
        const elements = ['leaf', 'dust', 'feather', 'sparkle', 'spirit'];
        
        for (let i = 0; i < elementsCount; i++) {
            const element = document.createElement('div');
            const type = elements[Math.floor(Math.random() * elements.length)];
            element.className = `floating-element ${type}`;
            
            // Random positioning
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 20 + 10;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            element.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            const delay = Math.random() * 10;
            element.style.animationDelay = `-${delay}s`;
            
            container.appendChild(element);
        }
    }
    
    // Floating dust particles effect
    createDustParticles();
    
    function createDustParticles() {
        const dustContainer = document.querySelector('.dust-particles');
        
        for (let i = 0; i < 60; i++) { // Reduced count
            const particle = document.createElement('div');
            particle.className = 'dust-particle';
            
            // Random positioning and size
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation properties with more variety
            const duration = Math.random() * 60 + 30;
            const delay = Math.random() * 30;
            
            // Random light glow colors for dust
            const hue = Math.floor(Math.random() * 60) + 180; // Blue to green hues
            const saturation = Math.floor(Math.random() * 30) + 70; // High saturation
            const lightness = Math.floor(Math.random() * 20) + 80; // Very light
            
            particle.style.boxShadow = `0 0 ${Math.random() * 5 + 3}px hsl(${hue}, ${saturation}%, ${lightness}%)`;
            particle.style.animation = `dustFloat ${duration}s linear infinite`;
            particle.style.animationDelay = `-${delay}s`;
            
            // Add to container
            dustContainer.appendChild(particle);
        }
    }
    
    // Create magic dust effect for lightbox transitions
    function createMagicDust(container) {
        for (let i = 0; i < 40; i++) {
            const dust = document.createElement('div');
            dust.className = 'magic-dust';
            
            // Random positioning around the current image
            const startX = 50 + (Math.random() * 40 - 20);
            const startY = 50 + (Math.random() * 40 - 20);
            dust.style.left = `${startX}%`;
            dust.style.top = `${startY}%`;
            
            // Random properties
            const size = Math.random() * 6 + 2;
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;
            
            // Random animation durations
            const duration = Math.random() * 2 + 1;
            dust.style.animation = `magicDustFade ${duration}s forwards`;
            
            // Random colors
            const hue = Math.floor(Math.random() * 60) + 180; // Blue/green
            dust.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.8)`;
            dust.style.boxShadow = `0 0 ${Math.random() * 8 + 4}px hsla(${hue}, 100%, 70%, 0.6)`;
            
            container.appendChild(dust);
            
            // Remove after animation is done
            setTimeout(() => {
                if (container.contains(dust)) {
                    container.removeChild(dust);
                }
            }, duration * 1000);
        }
    }
    
    // Add subtle animated background gradients
    animateBackgroundGradients();
    
    function animateBackgroundGradients() {
        const gradientOverlay = document.createElement('div');
        gradientOverlay.className = 'gradient-overlay';
        document.body.appendChild(gradientOverlay);
    }
}); 