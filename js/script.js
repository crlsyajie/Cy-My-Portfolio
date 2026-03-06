    (function() {
      'use strict';

      /* ========== 1. TYPING EFFECT ========== */
      const roles = [
        'ML Developer',
        'Front End Developer',
        'UI/UX Designer',
        'Visual Artist',
        'Data Scientist'
      ];
      const typedEl = document.getElementById('typed-text');
      let roleIndex = 0, charIndex = 0, isDeleting = false;

      function typeEffect() {
        const current = roles[roleIndex];
        if (isDeleting) {
          typedEl.textContent = current.substring(0, charIndex--);
        } else {
          typedEl.textContent = current.substring(0, charIndex++);
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex > current.length) {
          speed = 2000; // Pause at end
          isDeleting = true;
        } else if (isDeleting && charIndex < 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          speed = 400; // Pause before next word
        }
        setTimeout(typeEffect, speed);
      }
      typeEffect();

      /* ========== 2. SCROLL REVEAL ANIMATION ========== */
      const revealElements = document.querySelectorAll(
        'section, .service-card, .portfolio-card, .skill-circle'
      );

      // Set initial hidden state
      revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
      });

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger children
            const delay = entry.target.classList.contains('service-card') ||
                          entry.target.classList.contains('portfolio-card') ||
                          entry.target.classList.contains('skill-circle')
                          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 120
                          : 0;

            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealElements.forEach(el => revealObserver.observe(el));

      /* ========== 3. COUNTER ANIMATION ========== */
      const statNumbers = document.querySelectorAll('h3[style*="color: var(--accent)"][style*="font-size: 1.2rem"]');

      function animateCounter(el) {
        const text = el.textContent.trim();
        const match = text.match(/(\d+)(\+?)/);
        if (!match) return;

        const target = parseInt(match[1]);
        const suffix = match[2] || '';
        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      }

      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      statNumbers.forEach(el => counterObserver.observe(el));

      /* ========== 4. SKILL CIRCLE FILL ANIMATION ========== */
      const skillCircles = document.querySelectorAll('.skill-circle');

      const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const circle = entry.target;
            const percent = getComputedStyle(circle).getPropertyValue('--percent');
            circle.style.setProperty('--percent', '0');
            // Trigger reflow
            void circle.offsetWidth;
            circle.style.transition = 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
            requestAnimationFrame(() => {
              circle.style.setProperty('--percent', percent);
            });
            skillObserver.unobserve(circle);
          }
        });
      }, { threshold: 0.3 });

      skillCircles.forEach(el => skillObserver.observe(el));

      /* ========== 5. NAVBAR SCROLL EFFECTS ========== */
      let lastScroll = 0;
      const navs = document.querySelectorAll('nav');

      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        navs.forEach(nav => {
          if (currentScroll > 80) {
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.webkitBackdropFilter = 'blur(20px)';
            nav.style.background = 'rgba(18, 18, 18, 0.85)';
            nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
          } else {
            nav.style.backdropFilter = 'none';
            nav.style.background = '#121212';
            nav.style.boxShadow = 'none';
          }

          // Hide on scroll down, show on scroll up
          if (currentScroll > lastScroll && currentScroll > 200) {
            nav.style.transform = 'translateY(-100%)';
          } else {
            nav.style.transform = 'translateY(0)';
          }
          nav.style.transition = 'transform 0.35s ease, background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease';
          nav.style.position = 'sticky';
          nav.style.top = '0';
          nav.style.zIndex = '1000';
        });

        lastScroll = currentScroll;
      });

      /* ========== 6. SMOOTH HOVER TILT ON CARDS ========== */
      document.querySelectorAll('.service-card, .portfolio-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;

          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
          card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
          card.style.transition = 'transform 0.5s ease';
        });
      });

      /* ========== 7. SOCIAL ICON BOUNCE ON HOVER ========== */
      document.querySelectorAll('#socials-container a').forEach((icon, i) => {
        icon.addEventListener('mouseenter', () => {
          icon.style.transform = 'translateY(-4px) scale(1.15)';
          icon.style.borderColor = 'var(--accent)';
          icon.style.boxShadow = '0 6px 20px rgba(255, 106, 0, 0.25)';
          icon.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        icon.addEventListener('mouseleave', () => {
          icon.style.transform = 'translateY(0) scale(1)';
          icon.style.borderColor = 'rgba(255,255,255,0.1)';
          icon.style.boxShadow = 'none';
          icon.style.transition = 'all 0.3s ease';
        });
      });

      /* ========== 8. FILTER BUTTON ACTIVE STATE AND CARD STACK LOGIC ========== */
      const filterBtns = document.querySelectorAll('#category-filters > button');
      const interactiveCardsContainer = document.getElementById('interactive-cards-container');
      const portfolioCards = Array.from(document.querySelectorAll('.portfolio-card'));

      let isSpread = false;
      let visibleCards = [...portfolioCards];

      function updateCardStack() {
          if (isSpread) {
              interactiveCardsContainer.classList.add('is-spread');
              visibleCards.forEach(card => {
                  card.removeAttribute('data-index');
              });
          } else {
              interactiveCardsContainer.classList.remove('is-spread');
              visibleCards.forEach((card, index) => {
                  card.setAttribute('data-index', index);
              });
          }
      }

      // Initialize stack
      updateCardStack();

      // Click to spread/unspread
      interactiveCardsContainer.addEventListener('click', (e) => {
          // Don't trigger if they clicked a link directly
          if (e.target.closest('a') && isSpread) {
              return;
          }

          if (!isSpread) {
              e.preventDefault(); // Prevent navigating if clicking top card while stacked
              isSpread = true;
              updateCardStack();
          } else {
              // Optional: click background to unspread, but clicking cards navigates.
              // We handle this by doing nothing extra here; links work natively when spread.
          }
      });

      // Optional: Add a button or click outside logic to unspread
      document.addEventListener('click', (e) => {
          if (isSpread && !interactiveCardsContainer.contains(e.target) && !e.target.closest('#category-filters')) {
              isSpread = false;
              updateCardStack();
          }
      });

      // Filter Logic
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active styling
          filterBtns.forEach(b => {
            b.style.background = 'rgba(255,255,255,0.05)';
            b.style.color = 'var(--text-muted)';
          });
          btn.style.background = 'var(--accent)';
          btn.style.color = 'white';

          // Filter projects
          const category = btn.getAttribute('data-category');

          portfolioCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category || card.getAttribute('data-category') === 'all') {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });

          // Re-evaluate visible cards and reset stack index
          visibleCards = portfolioCards.filter(card => !card.classList.contains('hidden'));

          // Reset to stacked view on filter change for clean UX
          isSpread = false;
          updateCardStack();
        });
      });

      /* ========== 8.5 CONTACT FORM → GMAIL ========== */
      document.getElementById('send-btn').addEventListener('click', () => {
        const name = document.getElementById('cf-name').value.trim();
        const email = document.getElementById('cf-email').value.trim();
        const phone = document.getElementById('cf-phone').value.trim();
        const service = document.getElementById('cf-service').value || '';
        const timeline = document.getElementById('cf-timeline').value.trim();
        const details = document.getElementById('cf-details').value.trim();

        const subject = encodeURIComponent('Portfolio Inquiry — ' + (service || 'General'));
        const body = encodeURIComponent(
          'Name: ' + name + '\n' +
          'Email: ' + email + '\n' +
          'Phone: ' + phone + '\n' +
          'Service: ' + service + '\n' +
          'Timeline: ' + timeline + '\n\n' +
          'Project Details:\n' + details
        );

        window.open(
          'https://mail.google.com/mail/?view=cm&to=cyfetizanan@gmail.com&su=' + subject + '&body=' + body,
          '_blank'
        );
      });

      /* ========== 9. PARALLAX HERO IMAGE ========== */
      const heroImage = document.querySelector('#profile > div:last-child');
      if (heroImage) {
        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.3;
          heroImage.style.transform = `translateY(${rate}px)`;
        });
      }

      /* ========== 10. MAGNETIC CURSOR ON BUTTONS ========== */
      document.querySelectorAll('.btn, .btn-primary, button').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
          btn.style.transition = 'transform 0.2s ease';
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0, 0)';
          btn.style.transition = 'transform 0.4s ease';
        });
      });

      /* ========== 12. STACKED CARDS INTERACTION ========== */
      const stackedCardsWrapper = document.getElementById('stacked-cards-wrapper');
      if (stackedCardsWrapper) {
        stackedCardsWrapper.addEventListener('mouseenter', () => {
          stackedCardsWrapper.classList.add('stacked-wrapper-hover');
        });
        stackedCardsWrapper.addEventListener('mouseleave', () => {
          stackedCardsWrapper.classList.remove('stacked-wrapper-hover');
        });
      }

      /* ========== 11. CONTAINER SCROLL ANIMATION ========== */
      const scrollContainer = document.getElementById("scroll-container");
      const scrollHeader = document.getElementById("scroll-header");
      const scrollCard = document.getElementById("scroll-card");

      if (scrollContainer && scrollHeader && scrollCard) {
        window.addEventListener("scroll", () => {
          const rect = scrollContainer.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Calculate progress between 0 and 1
          let progress = 0;
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            const totalDistance = windowHeight + rect.height;
            const scrolledDistance = windowHeight - rect.top;
            progress = Math.max(0, Math.min(1, scrolledDistance / totalDistance));
          }

          const isMobile = window.innerWidth <= 768;

          // Transforms based on progress
          // TranslateY: 0 to -100
          const translateY = progress * -100;

          // RotateX: 20 to 0
          const rotateX = 20 - (progress * 20);

          // Scale
          const scaleStart = isMobile ? 0.7 : 1.05;
          const scaleEnd = isMobile ? 0.9 : 1;
          const scale = scaleStart + progress * (scaleEnd - scaleStart);

          scrollHeader.style.transform = `translateY(${translateY}px)`;
          scrollCard.style.transform = `rotateX(${rotateX}deg) scale(${scale})`;
        });
      }

    })();
