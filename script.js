function goToMenu() {
    window.location.href = "menu.html";
  }
  
  function showDetails(id) {
    const detail = document.getElementById(id);
    if (detail.style.display === "block") {
      detail.style.display = "none";
    } else {
      detail.style.display = "block";
    }
  }

// === Back to Top Button ===
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 180) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === Language Switcher (placeholder) ===
const langSelect = document.getElementById('lang-select');
if (langSelect) {
  langSelect.addEventListener('change', function() {
    if (this.value !== 'en') {
      alert('Only English is available at the moment.');
      this.value = 'en';
    }
  });
}

// === Scroll-based Reveal Animation for Menu Cards ===
function revealMenuCards() {
  const cards = document.querySelectorAll('.menu-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(card => observer.observe(card));
  } else {
    // Fallback for old browsers
    cards.forEach(card => card.classList.add('visible'));
  }
}
window.addEventListener('DOMContentLoaded', revealMenuCards);
  
// === Simulated Star Rating System (improved: block navigation on all devices) ===
function setupStarRatings() {
  document.querySelectorAll('.star-rating').forEach(function(rating) {
    let current = 0;
    let locked = false;
    const stars = rating.querySelectorAll('.star');
    function fillStars(n) {
      stars.forEach((star, i) => {
        if (i < n) star.classList.add('filled');
        else star.classList.remove('filled');
      });
    }
    // Prevent navigation on click/tap/keyboard for the whole star-rating area
    ['click','mousedown','mouseup','touchstart','touchend','pointerdown','pointerup','keydown'].forEach(evt => {
      rating.addEventListener(evt, function(e) {
        e.stopPropagation();
        if (evt === 'click' || evt === 'mousedown' || evt === 'mouseup') e.preventDefault();
      }, {passive: false});
    });
    stars.forEach((star, idx) => {
      star.addEventListener('mouseenter', function(e) {
        if (!locked) fillStars(idx + 1);
        e.stopPropagation();
      });
      star.addEventListener('mouseleave', function(e) {
        if (!locked) fillStars(current);
        e.stopPropagation();
      });
      star.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (locked) return;
        current = idx + 1;
        fillStars(current);
        locked = true;
        rating.style.pointerEvents = 'none';
        setTimeout(() => {
          locked = false;
          rating.style.pointerEvents = '';
        }, 700);
      });
      // Touch support for mobile
      star.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (locked) return;
        current = idx + 1;
        fillStars(current);
        locked = true;
        rating.style.pointerEvents = 'none';
        setTimeout(() => {
          locked = false;
          rating.style.pointerEvents = '';
        }, 700);
      }, {passive: false});
    });
    // Reset on mouse leave of the whole rating
    rating.addEventListener('mouseleave', function(e) {
      if (!locked) fillStars(current);
      e.stopPropagation();
    });
    // Tooltip on hover (handled by CSS)
  });
}
window.addEventListener('DOMContentLoaded', setupStarRatings);
  