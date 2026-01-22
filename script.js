/**
 * Temlett Physiotherapy - Main JavaScript
 * Handles: Mobile navigation toggle, FAQ accordion, smooth scrolling
 */

(function () {
  'use strict';

  // -----------------------------------------
  // DOM Elements
  // -----------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const faqQuestions = document.querySelectorAll('.faq-question');
  const contactForm = document.getElementById('contact-form');

  // -----------------------------------------
  // Mobile Navigation Toggle
  // -----------------------------------------
  function initMobileNav() {
    if (!navToggle || !nav) return;

    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isOpen);
      nav.classList.toggle('is-open', !isOpen);
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (event) {
      const isNavOpen = nav.classList.contains('is-open');
      const clickedInsideNav = nav.contains(event.target);
      const clickedNavToggle = navToggle.contains(event.target);

      if (isNavOpen && !clickedInsideNav && !clickedNavToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    // Close mobile nav on Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  // -----------------------------------------
  // FAQ Accordion
  // -----------------------------------------
  function initFaqAccordion() {
    if (!faqQuestions.length) return;

    faqQuestions.forEach(function (question) {
      question.addEventListener('click', function () {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        const answerId = question.getAttribute('aria-controls');
        const answer = document.getElementById(answerId);

        if (!answer) return;

        // Toggle current FAQ
        question.setAttribute('aria-expanded', !isExpanded);
        answer.hidden = isExpanded;
      });

      // Keyboard support for Enter and Space
      question.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          question.click();
        }
      });
    });
  }

  // -----------------------------------------
  // Smooth Scroll Enhancement
  // -----------------------------------------
  function initSmoothScroll() {
    // Modern browsers handle smooth scroll via CSS scroll-behavior
    // This provides a fallback and additional control

    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');

        // Skip if it's just "#"
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          event.preventDefault();

          // Get header height for offset
          const header = document.getElementById('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, null, targetId);

          // Focus management for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      });
    });
  }

  // -----------------------------------------
  // Contact Form Handler (Demo only)
  // -----------------------------------------
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Basic validation
      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert('Please fill in all fields.');
        return;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Demo message - in production, this would submit to a backend
      alert('Thank you for your message. This form is for demonstration purposes only. Please contact us via WhatsApp or email for enquiries.');

      // Reset form
      contactForm.reset();
    });
  }

  // -----------------------------------------
  // Header Scroll State
  // -----------------------------------------
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    function updateHeaderState() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Check initial state
    updateHeaderState();

    // Update on scroll
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  // -----------------------------------------
  // Initialize
  // -----------------------------------------
  function init() {
    initMobileNav();
    initFaqAccordion();
    initSmoothScroll();
    initContactForm();
    initHeaderScroll();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
