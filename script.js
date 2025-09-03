// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');
  
  mobileNav.classList.toggle('active');
  
  if (mobileNav.classList.contains('active')) {
    menuIcon.className = 'fas fa-times';
  } else {
    menuIcon.className = 'fas fa-bars';
  }
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Close mobile menu if open
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');
  if (mobileNav.classList.contains('active')) {
    mobileNav.classList.remove('active');
    menuIcon.className = 'fas fa-bars';
  }
}

// Product Filter
function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Update active filter button
  filterBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Show/hide products
  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
      product.classList.add('fade-in-up');
    } else {
      product.style.display = 'none';
    }
  });
}

// Contact Product via WhatsApp
function contactProduct(productName) {
  const message = `Halo, saya tertarik dengan ${productName}. Bisa minta informasi lebih lanjut?`;
  const whatsappUrl = `https://wa.me/6287777636021?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Contact Service via WhatsApp
function contactService(serviceName) {
  const message = `Halo, saya ingin mengetahui lebih lanjut tentang layanan ${serviceName}. Bisa dijelaskan?`;
  const whatsappUrl = `https://wa.me/6287777636021?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Submit Contact Form
function submitForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const message = formData.get('message');
  
  const whatsappMessage = `Halo, saya ${name}.\n\nTelepon: ${phone}\nEmail: ${email}\n\nPesan: ${message}`;
  const whatsappUrl = `https://wa.me/6287777636021?text=${encodeURIComponent(whatsappMessage)}`;
  
  window.open(whatsappUrl, '_blank');
}

// Scroll Animation
function animateOnScroll() {
  const elements = document.querySelectorAll('.feature-card, .product-card, .service-card');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('fade-in-up');
    }
  });
}

// Header Background on Scroll
function handleHeaderScroll() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.backgroundColor = 'rgba(146, 64, 14, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.backgroundColor = '#92400e';
    header.style.backdropFilter = 'none';
  }
}

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Scroll animations
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Initial animation check
  animateOnScroll();
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
      if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        document.getElementById('menu-icon').className = 'fas fa-bars';
      }
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Lazy Loading for Images (if needed in future)
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
  animateOnScroll();
  handleHeaderScroll();
}, 10);

// Replace scroll event listeners with debounced version for better performance
window.removeEventListener('scroll', animateOnScroll);
window.removeEventListener('scroll', handleHeaderScroll);
window.addEventListener('scroll', debouncedScrollHandler);
