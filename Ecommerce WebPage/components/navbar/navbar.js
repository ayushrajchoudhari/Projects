// components/navbar/navbar.js
import DeviceChecker from '../../utilities/utility.js';

class Navbar {
  constructor() {
    // Don't create navbar if screen is too small
    if (window.innerWidth < 300) return;
    
    this.navbar = document.createElement('nav');
    this.navbar.className = 'navbar';
    
    this.navbar.innerHTML = `
      <a href="/" class="navbar__logo">Logo</a>
      
      <button class="navbar__menu-button" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar__menu-icon"></span>
      </button>
      
      <ul class="navbar__links" data-visible="false">
        <li><a href="/" class="navbar__link">Home</a></li>
        
        <li>
          <a href="#" class="navbar__link navbar__link--dropdown">
            Category
            <svg class="navbar__dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <ul class="navbar__dropdown">
            <li class="navbar__dropdown-item"><a href="#" class="navbar__dropdown-link">Category 1</a></li>
            <li class="navbar__dropdown-item"><a href="#" class="navbar__dropdown-link">Category 2</a></li>
            <li class="navbar__dropdown-item"><a href="#" class="navbar__dropdown-link">Category 3</a></li>
            <li class="navbar__dropdown-item"><a href="#" class="navbar__dropdown-link">Category 4</a></li>
          </ul>
        </li>
        
        <li><a href="#" class="navbar__link">Support</a></li>
        <li><a href="#" class="navbar__link">Wishlist</a></li>
        <li><a href="#" class="navbar__link">Cart</a></li>
        <li><a href="#" class="navbar__link">Profile</a></li>
      </ul>
    `;
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    if (window.innerWidth < 300) return;
    
    const menuButton = this.navbar.querySelector('.navbar__menu-button');
    const navLinks = this.navbar.querySelector('.navbar__links');
    const categoryDropdown = this.navbar.querySelector('.navbar__link--dropdown');
    const categoryDropdownMenu = this.navbar.querySelector('.navbar__dropdown');
    
    // Mobile menu toggle
    menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !isExpanded);
      navLinks.setAttribute('data-visible', !isExpanded);
      
      if (!isExpanded && categoryDropdownMenu) {
        categoryDropdownMenu.setAttribute('data-visible', 'false');
      }
    });
    
    // Category dropdown toggle for mobile
    if (categoryDropdown && categoryDropdownMenu) {
      categoryDropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 800) {
          e.preventDefault();
          e.stopPropagation();
          const isVisible = categoryDropdownMenu.getAttribute('data-visible') === 'true';
          categoryDropdownMenu.setAttribute('data-visible', !isVisible);
        }
      });
    }
    
    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 800 && !this.navbar.contains(e.target)) {
        menuButton.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('data-visible', 'false');
        if (categoryDropdownMenu) {
          categoryDropdownMenu.setAttribute('data-visible', 'false');
        }
      }
    });
  }
  
  render() {
    return window.innerWidth < 300 ? null : this.navbar;
  }
}

export default Navbar;