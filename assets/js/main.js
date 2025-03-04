document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  // Preloader
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  });

  // Mobile navigation toggle
  const mobileNavShow = document.querySelector(".mobile-nav-show");
  const mobileNavHide = document.querySelector(".mobile-nav-hide");
  const navbar = document.querySelector("#navbar");

  function toggleNav() {
    navbar.classList.toggle("mobile-nav-active");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
  }

  if (mobileNavShow && mobileNavHide) {
    mobileNavShow.addEventListener("click", toggleNav);
    mobileNavHide.addEventListener("click", toggleNav);
  }

  

  // Pastikan item navbar bisa diklik
  document.querySelectorAll('#navbar a').forEach(navbarlink => {
    navbarlink.addEventListener('click', (event) => {
      // Jika ini adalah link internal (dengan hash)
      if (navbarlink.hash) {
        const targetSection = document.querySelector(navbarlink.hash);
        if (targetSection) {
          event.preventDefault();
          targetSection.scrollIntoView({ behavior: 'smooth' });

          // Tutup navbar setelah diklik di mode mobile
          if (navbar.classList.contains("mobile-nav-active")) {
            toggleNav();
          }
        }
      } else {
        // Jika ini link eksternal, tetap tutup navbar
        if (navbar.classList.contains("mobile-nav-active")) {
          toggleNav();
        }
      }
    });
  });

  // Mobile navigation dropdown
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      this.classList.toggle('active');
      this.nextElementSibling.classList.toggle('dropdown-active');
    });
  });

  // Scroll to section "Tentang Kami" when "Get Started" is clicked
  const getStartedButton = document.querySelector('.btn-get-started');
  if (getStartedButton) {
    getStartedButton.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector('#about');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Scroll-to-top button visibility and action
  const scrollTopButton = document.querySelector('.scroll-top');
  if (scrollTopButton) {
    const toggleScrollTopVisibility = function() {
      if (window.scrollY > 100) {
        scrollTopButton.classList.add('active');
      } else {
        scrollTopButton.classList.remove('active');
      }
    };

    window.addEventListener('scroll', toggleScrollTopVisibility);
    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Portfolio filter and layout using Isotope
  const portfolioContainer = document.querySelector('.portfolio-isotope');
  if (portfolioContainer) {
    window.addEventListener('load', () => {
      const portfolioIsotope = new Isotope('.portfolio-container', {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioContainer.getAttribute('data-portfolio-layout') || 'masonry',
        filter: portfolioContainer.getAttribute('data-portfolio-filter') || '*',
        sortBy: portfolioContainer.getAttribute('data-portfolio-sort') || 'original-order'
      });

      document.querySelectorAll('.portfolio-isotope .portfolio-flters li').forEach(filterButton => {
        filterButton.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        });
      });
    });
  }

  // Init Swiper sliders
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      1200: { slidesPerView: 2, spaceBetween: 20 }
    }
  });

  // Initiate PureCounter
  new PureCounter();

  // Animation on scroll initialization
  function initAOS() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', initAOS);
});


document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
  let isValid = true;
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();

  document.getElementById("error-name").innerText = "";
  document.getElementById("error-email").innerText = "";
  document.getElementById("error-subject").innerText = "";
  document.getElementById("error-message").innerText = "";

  if (name === "") {
      document.getElementById("error-name").innerText = "Nama wajib diisi!";
      isValid = false;
  }
  if (email === "" || !email.includes("@")) {
      document.getElementById("error-email").innerText = "Email tidak valid!";
      isValid = false;
  }
  if (subject === "") {
      document.getElementById("error-subject").innerText = "Subjek wajib diisi!";
      isValid = false;
  }
  if (message === "") {
      document.getElementById("error-message").innerText = "Pesan tidak boleh kosong!";
      isValid = false;
  }

  if (!isValid) {
      event.preventDefault(); // Mencegah form dikirim jika ada error
  }
});
