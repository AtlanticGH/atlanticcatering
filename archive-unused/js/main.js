/**
 * Atlantic Catering and Logistics Limited - Main JavaScript
 * Handles: mobile menu, animated counters, scroll fade-in, smooth scroll, service scroll, sticky nav
 */

(function () {
  'use strict';

  // ---------- Mobile menu toggle ----------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuBtn && mobileMenu) {
    var mainNavEl = document.getElementById('main-nav');
    mobileMenuBtn.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      if (menuIcon) menuIcon.classList.toggle('hidden', !isOpen);
      if (closeIcon) closeIcon.classList.toggle('hidden', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? '' : 'hidden';
      if (mainNavEl) mainNavEl.classList.toggle('mobile-menu-open', !isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (mainNavEl) mainNavEl.classList.remove('mobile-menu-open');
      });
    });
  }

  // ---------- Smooth scrolling for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  // ---------- Profile modal (Our people, about page) – click anywhere to close ----------
  const profileModal = document.getElementById('profile-modal');
  const profileModalPanel = document.getElementById('profile-modal-panel');
  const profileModalTitle = document.getElementById('profile-modal-title');
  const profileModalRole = document.getElementById('profile-modal-role');
  const profileModalBio = document.getElementById('profile-modal-bio');
  const profileModalImage = document.getElementById('profile-modal-image');
  var lastOpenedProfileCard = null;

  function openProfileModal(card) {
    if (!profileModal || !card) return;
    var name = card.getAttribute('data-name') || '';
    var role = card.getAttribute('data-role') || '';
    var bio = card.getAttribute('data-bio') || '';
    var image = '';
    var cardImageEl = card.querySelector('.people-card-image-bg') || card.querySelector('.people-card-image');
    if (cardImageEl && cardImageEl.style.backgroundImage) {
      var match = cardImageEl.style.backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (match) image = match[1].trim();
    }
    if (!image) image = card.getAttribute('data-image') || '';
    if (profileModalTitle) profileModalTitle.textContent = name;
    if (profileModalRole) profileModalRole.textContent = role;
    if (profileModalBio) {
      profileModalBio.innerHTML = '';
      var paragraphs = (bio || '').split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
      if (paragraphs.length === 0) {
        var p = document.createElement('p');
        p.className = 'profile-modal-bio-p';
        profileModalBio.appendChild(p);
      } else {
        paragraphs.forEach(function (text) {
          var p = document.createElement('p');
          p.className = 'profile-modal-bio-p';
          p.textContent = text;
          profileModalBio.appendChild(p);
        });
      }
    }
    if (profileModalImage) {
      if (image) {
        var quoted = image.indexOf("'") !== -1 ? 'url("' + image.replace(/"/g, '\\"') + '")' : "url('" + image + "')";
        profileModalImage.style.backgroundImage = quoted;
        profileModalImage.style.backgroundSize = 'cover';
        profileModalImage.style.backgroundPosition = 'center';
      } else {
        profileModalImage.style.backgroundImage = '';
        profileModalImage.style.background = 'linear-gradient(145deg, #e5e7eb 0%, #d1d5db 100%)';
      }
    }
    lastOpenedProfileCard = card;
    profileModal.classList.remove('hidden');
    profileModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (profileModalPanel) profileModalPanel.focus();
  }

  function closeProfileModal(focusCard) {
    if (!profileModal) return;
    profileModal.classList.add('hidden');
    profileModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (focusCard && typeof focusCard.focus === 'function') focusCard.focus();
  }

  if (profileModal) {
    document.querySelectorAll('.people-card').forEach(function (card) {
      card.addEventListener('click', function () {
        openProfileModal(card);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProfileModal(card);
        }
      });
    });
    profileModal.addEventListener('click', function () {
      closeProfileModal(lastOpenedProfileCard);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && profileModal && !profileModal.classList.contains('hidden')) {
        closeProfileModal(lastOpenedProfileCard);
      }
    });
  }

  // ---------- Service modal (Services page) – click anywhere to close ----------
  const serviceModal = document.getElementById('service-modal');
  const serviceModalPanel = document.getElementById('service-modal-panel');
  const serviceModalCover = document.getElementById('service-modal-cover');
  const serviceModalTitle = document.getElementById('service-modal-title');
  const serviceModalTagline = document.getElementById('service-modal-tagline');
  const serviceModalDescription = document.getElementById('service-modal-description');
  var lastOpenedServiceCard = null;

  function openServiceModal(card) {
    if (!serviceModal || !card) return;
    var name = card.getAttribute('data-name') || '';
    var tagline = card.getAttribute('data-tagline') || '';
    var description = card.getAttribute('data-description') || '';
    var image = '';
    var cardImageEl = card.querySelector('.service-card-inner-bg') || card.querySelector('.service-card-inner');
    if (cardImageEl && cardImageEl.style.backgroundImage) {
      var match = cardImageEl.style.backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (match) image = match[1].trim();
    }
    if (!image) image = card.getAttribute('data-image') || '';
    if (serviceModalTitle) serviceModalTitle.textContent = name;
    if (serviceModalTagline) serviceModalTagline.textContent = tagline;
    if (serviceModalDescription) serviceModalDescription.textContent = description;
    if (serviceModalCover) {
      if (image) {
        var quoted = image.indexOf("'") !== -1 ? 'url("' + image.replace(/"/g, '\\"') + '")' : "url('" + image + "')";
        serviceModalCover.style.backgroundImage = quoted;
        serviceModalCover.style.backgroundSize = 'cover';
        serviceModalCover.style.backgroundPosition = 'center';
        serviceModalCover.style.backgroundColor = '';
      } else {
        serviceModalCover.style.backgroundImage = 'linear-gradient(135deg, rgba(85,190,82,0.25) 0%, transparent 50%), linear-gradient(225deg, rgba(219,153,51,0.2) 0%, transparent 50%), #0B1C2D';
        serviceModalCover.style.backgroundSize = '';
        serviceModalCover.style.backgroundPosition = '';
        serviceModalCover.style.backgroundColor = '#0B1C2D';
      }
    }
    lastOpenedServiceCard = card;
    serviceModal.classList.remove('hidden');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (serviceModalPanel) serviceModalPanel.focus();
  }

  function closeServiceModal(focusCard) {
    if (!serviceModal) return;
    serviceModal.classList.add('hidden');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (focusCard && typeof focusCard.focus === 'function') focusCard.focus();
  }

  if (serviceModal) {
    document.querySelectorAll('.service-card').forEach(function (card) {
      card.addEventListener('click', function () {
        openServiceModal(card);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openServiceModal(card);
        }
      });
    });
    serviceModal.addEventListener('click', function () {
      closeServiceModal(lastOpenedServiceCard);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && serviceModal && !serviceModal.classList.contains('hidden')) {
        closeServiceModal(lastOpenedServiceCard);
      }
    });
  }

  // ---------- Video preview modal (Who we are, index page) ----------
  const videoModal = document.getElementById('video-modal');
  const videoModalOverlay = document.getElementById('video-modal-overlay');
  const videoModalPanel = document.getElementById('video-modal-panel');
  const videoModalPlayer = document.getElementById('video-modal-player');
  const videoTrigger = document.getElementById('who-we-are-video-trigger');
  const previewVideo = videoTrigger ? videoTrigger.querySelector('video') : null;

  function openVideoModal() {
    if (!videoModal || !videoModalPlayer) return;
    if (previewVideo) previewVideo.pause();
    videoModal.classList.remove('hidden');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    videoModalPlayer.currentTime = 0;
    videoModalPlayer.play().catch(function () {});
    if (videoModalPanel) videoModalPanel.focus();
  }

  function closeVideoModal() {
    if (!videoModal || !videoModalPlayer) return;
    videoModalPlayer.pause();
    videoModal.classList.add('hidden');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previewVideo) previewVideo.play().catch(function () {});
    if (videoTrigger && typeof videoTrigger.focus === 'function') videoTrigger.focus();
  }

  if (videoTrigger && videoModal) {
    videoTrigger.addEventListener('click', function () {
      videoTrigger.classList.add('video-preview-pulse');
      setTimeout(function () { videoTrigger.classList.remove('video-preview-pulse'); }, 400);
      openVideoModal();
    });
    if (videoModalOverlay) videoModalOverlay.addEventListener('click', function () { closeVideoModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && videoModal && !videoModal.classList.contains('hidden')) {
        closeVideoModal();
      }
    });
  }

  // ---------- Animated number counters (stats + workforce) ----------
  function animateValue(el, start, end, duration) {
    const startTime = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const isDecimal = String(end).indexOf('.') !== -1;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      let current = start + (end - start) * easeOut;
      if (!isDecimal) current = Math.floor(current);
      el.textContent = prefix + (isDecimal ? current : Math.floor(current).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + (isDecimal ? end : Math.floor(end).toLocaleString()) + suffix;
    }

    requestAnimationFrame(update);
  }

  function initCounters(selector, duration) {
    duration = duration || 2000;
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.dataset.animated === 'true') return;
          el.dataset.animated = 'true';
          const targetNum = parseInt(el.dataset.target, 10);
          const target = (targetNum === targetNum) ? targetNum : 0;
          animateValue(el, 0, target, duration);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initAllCounters() {
    initCounters('.stat-number', 2200);
    initCounters('.workforce-stat', 2200);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCounters);
  } else {
    initAllCounters();
  }

  // ---------- Scroll-triggered fade-in ----------
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
  });

  // ---------- Service horizontal scroll arrows ----------
  const scrollContainer = document.getElementById('services-scroll-container');
  const scrollPrev = document.getElementById('services-scroll-prev');
  const scrollNext = document.getElementById('services-scroll-next');

  if (scrollContainer) {
    const cardWidth = 288 + 16; // w-72 + gap-4
    if (scrollPrev) {
      scrollPrev.addEventListener('click', function () {
        scrollContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }
    if (scrollNext) {
      scrollNext.addEventListener('click', function () {
        scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }
  }

  // ---------- Header: gradual background as user scrolls through hero (index only) ----------
  const mainNav = document.getElementById('main-nav');
  const heroSection = document.getElementById('hero-section');

  function updateNavBackground() {
    if (!mainNav) return;
    if (heroSection) {
      const heroTop = heroSection.offsetTop;
      const heroHeight = heroSection.offsetHeight;
      const scrollY = window.scrollY;
      const progress = heroHeight > 0 ? Math.min(1, Math.max(0, (scrollY - heroTop) / heroHeight)) : 1;
      mainNav.style.setProperty('--nav-bg-opacity', progress * 0.9);
      if (progress >= 0.5) {
        mainNav.classList.remove('nav-over-hero');
      } else {
        mainNav.classList.add('nav-over-hero');
      }
      if (progress > 0) {
        mainNav.classList.add('backdrop-blur-md');
      } else {
        mainNav.classList.remove('backdrop-blur-md');
      }
      if (progress >= 1) {
        mainNav.classList.add('shadow-sm');
      } else {
        mainNav.classList.remove('shadow-sm');
      }
    } else {
      mainNav.style.setProperty('--nav-bg-opacity', 0.9);
      mainNav.classList.remove('nav-over-hero');
      mainNav.classList.add('backdrop-blur-md', 'shadow-sm');
    }
  }

  if (mainNav) {
    updateNavBackground();
    window.addEventListener('scroll', updateNavBackground);
    window.addEventListener('resize', updateNavBackground);
  }

  // ---------- Services dropdown: aria-expanded + close on Escape ----------
  const servicesMenuBtn = document.getElementById('services-menu-btn');
  const servicesMenu = document.getElementById('services-menu');
  if (servicesMenuBtn && servicesMenu) {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        servicesMenuBtn.setAttribute('aria-expanded', 'false');
        servicesMenuBtn.focus();
      }
    });
  }

  // ---------- Footer year ----------
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();
})();
