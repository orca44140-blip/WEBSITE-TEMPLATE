// ============================================================================
// MONETIZEHUB - Modern Affiliate & Ad Network Platform
// JavaScript for interactions and animations
// ============================================================================

// ============================================================================
// Counter Animation - Stats Section
// ============================================================================

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;

    const increaseCounter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(increaseCounter);
      }
      counter.textContent = Math.floor(current).toLocaleString();
    }, 30);
  });
}

// Trigger counter animation when visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.classList.contains('hero-stats')) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    observer.observe(heroStats);
  }
});

// ============================================================================
// Newsletter Form
// ============================================================================

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    
    if (email) {
      // Simulate form submission
      alert(`✅ Thanks for subscribing! Check your email at ${email} for confirmation.`);
      newsletterForm.reset();
    }
  });
}

// ============================================================================
// Smooth Scroll for Navigation
// ============================================================================

document.querySelectorAll('.nav-link, .btn').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ============================================================================
// Mobile Menu Toggle
// ============================================================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    menuToggle.setAttribute('aria-expanded', 
      menuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
  });

  // Close menu when link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.style.display = 'none';
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================================================
// Reveal Animations on Scroll
// ============================================================================

function handleScroll() {
  const revealElements = document.querySelectorAll('.reveal-section');
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.style.opacity = '1';
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// ============================================================================
// Affiliate Program Filtering (Future Enhancement)
// ============================================================================

const filterBtns = document.querySelectorAll('.filter-btn');
const programCards = document.querySelectorAll('[data-category]');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter programs
      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================================================================
// Sticky Navigation
// ============================================================================

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
  }
});

// ============================================================================
// Button Click Tracking (for analytics)
// ============================================================================

document.querySelectorAll('.btn-program, .btn-deal').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const programName = btn.closest('.program-card')?.querySelector('h3')?.textContent || 
                       btn.closest('.deal-card')?.querySelector('.deal-name')?.textContent ||
                       'Unknown Program';
    console.log(`User clicked: ${programName}`);
    // Add your analytics tracking here
  });
});

// ============================================================================
// Active Navigation Link on Scroll
// ============================================================================

function updateActiveNavLink() {
  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================================================
// Accessibility: Keyboard Navigation
// ============================================================================

document.addEventListener('keydown', (e) => {
  // Skip to main content
  if (e.key === 's' && e.ctrlKey) {
    const mainContent = document.querySelector('.hero-content') || document.querySelector('.container');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// ============================================================================
// Performance: Lazy Loading Images
// ============================================================================

if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ============================================================================
// Dark Mode Toggle (Optional Enhancement)
// ============================================================================

function initDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    document.documentElement.style.setProperty('--dark', '#ffffff');
    document.documentElement.style.setProperty('--white', '#0f172a');
    localStorage.setItem('darkMode', 'true');
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', initDarkMode);

// ============================================================================
// Analytics Tracking
// ============================================================================

// Track page views
function trackPageView() {
  console.log(`Page view: ${window.location.href}`);
  // Add your analytics code here (Google Analytics, Mixpanel, etc.)
}

window.addEventListener('load', trackPageView);

// ============================================================================
// Form Validation Helper
// ============================================================================

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================================================
// Initialize on DOM Ready
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('MonetizeHub loaded successfully! 🚀');
  
  // Add any additional initialization code here
  updateActiveNavLink();
  handleScroll();
});

    document.querySelector(".cart-total h3").innerText = `Total: ₹${total}`;

    // Attach remove buttons
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        let idx = this.dataset.index;
        cart.splice(idx, 1); // remove item
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // refresh UI
      });
    });

    // Attach quantity buttons
    document.querySelectorAll(".qty-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        let idx = this.dataset.index;
        if (btn.classList.contains("increase")) {
          cart[idx].quantity += 1;
        } else if (btn.classList.contains("decrease") && cart[idx].quantity > 1) {
          cart[idx].quantity -= 1;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    // Attach clear cart button
    let clearBtn = document.querySelector(".clear-cart-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear the cart?")) {
          localStorage.removeItem("cart"); // clear storage
          renderCart(); // refresh UI
        }
      });
    }
  }

  renderCart(); // initial render
}



// Detect if it's the signup form by checking if confirm-password exists
const signupForm = document.querySelector(".login-box #confirm-password");
if (signupForm) {
  // The parent form
  const form = signupForm.closest("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();

    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    // Save user
    localStorage.setItem("flipzonUser", JSON.stringify({ name, email, password }));
    alert("✅ Sign Up Successful! Please login now.");

    window.location.href = "login.html"; // go to login page
  });
}

// Login functionality (if confirm-password not present)
const loginForm = document.querySelector(".login-box #password");
if (loginForm && !document.getElementById("confirm-password")) {
  const form = loginForm.closest("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let storedUser = JSON.parse(localStorage.getItem("flipzonUser"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      alert("❌ Invalid Email or Password!");
      return;
    }

    // Save login status
    localStorage.setItem("flipzonLoggedIn", true);
    localStorage.setItem("flipzonUserName", storedUser.name);

    alert(`✅ Welcome back, ${storedUser.name}!`);
    window.location.href = "index.html"; // go back home
  });
}