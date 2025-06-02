// Initialize AOS animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentImageIndex = 0;
const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));

// Open lightbox when gallery image is clicked
document.querySelectorAll('.gallery-overlay').forEach((overlay, index) => {
    overlay.addEventListener('click', function() {
        const imgSrc = this.parentElement.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
        currentImageIndex = index;
    });
});

// Close lightbox
closeLightbox.addEventListener('click', function() {
    lightbox.style.display = 'none';
});

// Close when clicking outside the image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Navigation between images
function showImage(index) {
    if (index >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (index < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else {
        currentImageIndex = index;
    }

    lightboxImg.src = galleryImages[currentImageIndex].src;
}

prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showImage(currentImageIndex - 1);
});

nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showImage(currentImageIndex + 1);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        } else if (e.key === 'ArrowLeft') {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentImageIndex + 1);
        }
    }
});