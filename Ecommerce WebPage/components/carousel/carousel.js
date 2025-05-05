// components/carousel/carousel.js
class Carousel {
    constructor() {
      // Don't create carousel if screen is too small
      if (window.innerWidth < 300) return;
      
      this.currentIndex = 0;
      this.slides = [
        'images/slide1.jpg',
        'images/slide2.jpg',
        'images/slide3.jpg',
        'images/slide4.jpg',
        'images/slide5.jpg',
      ];
      
      this.carousel = document.createElement('div');
      this.carousel.className = 'carousel';
      this.carousel.setAttribute('aria-label', 'Image carousel');
      
      // Create carousel HTML
      this.carousel.innerHTML = `
        <div class="carousel__track" aria-live="polite"></div>
        <button class="carousel__button carousel__button--prev" aria-label="Previous slide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="var(--color-black)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="carousel__button carousel__button--next" aria-label="Next slide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="var(--color-black)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="carousel__dots" role="tablist"></div>
      `;
      
      this.track = this.carousel.querySelector('.carousel__track');
      this.prevButton = this.carousel.querySelector('.carousel__button--prev');
      this.nextButton = this.carousel.querySelector('.carousel__button--next');
      this.dotsContainer = this.carousel.querySelector('.carousel__dots');
      
      // Initialize carousel
      this.initSlides();
      this.initDots();
      this.startAutoPlay();
      this.initEventListeners();
    }
    
    initSlides() {
      // Create slide elements
      this.slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'carousel__slide';
        slideElement.setAttribute('role', 'tabpanel');
        slideElement.setAttribute('aria-hidden', index !== 0);
        slideElement.setAttribute('aria-label', `Slide ${index + 1}`);
        slideElement.innerHTML = `
          <img src="${slide}" alt="Promotional slide ${index + 1}" class="carousel__image">
        `;
        this.track.appendChild(slideElement);
        
        // Add click event to each slide
        slideElement.querySelector('.carousel__image').addEventListener('click', () => {
          console.log(`Slide ${index + 1} clicked`);
          // Add your click handler here
        });
      });
      
      // Clone first and last slides for infinite effect
      const firstSlide = this.track.firstElementChild.cloneNode(true);
      const lastSlide = this.track.lastElementChild.cloneNode(true);
      this.track.prepend(lastSlide);
      this.track.appendChild(firstSlide);
      
      // Set initial position
      this.goToSlide(1, false);
    }
    
    initDots() {
      this.slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel__dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.setAttribute('aria-selected', index === 0);
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => this.goToSlide(index + 1));
        this.dotsContainer.appendChild(dot);
      });
    }
    
    initEventListeners() {
      // Navigation buttons
      this.prevButton.addEventListener('click', () => this.prevSlide());
      this.nextButton.addEventListener('click', () => this.nextSlide());
      
      // Keyboard navigation
      this.carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
      });
      
      // Pause autoplay on hover
      this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
      this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
      
      // Handle window resize
      window.addEventListener('resize', () => {
        this.goToSlide(this.currentIndex, false);
      });
    }
    
    goToSlide(index, animate = true) {
      const track = this.track;
      const slides = this.track.querySelectorAll('.carousel__slide');
      const dots = this.dotsContainer.querySelectorAll('.carousel__dot');
      
      if (animate) {
        track.style.transition = 'transform 0.5s ease-in-out';
      } else {
        track.style.transition = 'none';
      }
      
      track.style.transform = `translateX(-${index * 100}%)`;
      this.currentIndex = index;
      
      // Update ARIA attributes and active dot
      slides.forEach((slide, i) => {
        const isActive = i === index;
        slide.setAttribute('aria-hidden', !isActive);
      });
      
      dots.forEach((dot, dotIndex) => {
        const isActive = (index - 1) % this.slides.length === dotIndex;
        dot.classList.toggle('carousel__dot--active', isActive);
        dot.setAttribute('aria-selected', isActive);
      });
      
      // Handle infinite loop
      if (index === slides.length - 1) {
        setTimeout(() => {
          track.style.transition = 'none';
          this.currentIndex = 1;
          track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }, 500);
      }
      
      if (index === 0) {
        setTimeout(() => {
          track.style.transition = 'none';
          this.currentIndex = slides.length - 2;
          track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }, 500);
      }
    }
    
    nextSlide() {
      this.goToSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
      this.goToSlide(this.currentIndex - 1);
    }
    
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
    
    pauseAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
    
    render() {
      return window.innerWidth < 300 ? null : this.carousel;
    }
  }
  
  export default Carousel;