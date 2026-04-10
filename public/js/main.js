(function () {
  const revealItems = document.querySelectorAll('.reveal');
  const header = document.getElementById('siteHeader');
  const mobileNav = document.getElementById('mobileNav');
  const openBtn = document.getElementById('mobileMenuOpen');
  const closeBtn = document.getElementById('mobileMenuClose');
  const mobileAccBtn = document.querySelector('.mobile-accordion-btn');
  const mobileCats = document.querySelector('.mobile-cats');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));

  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.style.background = 'rgba(15,13,11,0.88)';
      header.style.backdropFilter = 'blur(24px)';
    } else {
      header.style.background = 'rgba(15,13,11,0.95)';
      header.style.backdropFilter = 'blur(20px)';
    }
  });

  if (openBtn && mobileNav) {
    const setMenuState = (isOpen) => {
      mobileNav.classList.toggle('open', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      openBtn.setAttribute('aria-expanded', String(isOpen));
    };

    const openMenu = () => setMenuState(true);
    const closeMenu = () => setMenuState(false);

    openBtn.addEventListener('click', openMenu);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    mobileNav.addEventListener('click', (event) => {
      if (event.target === mobileNav) closeMenu();
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  if (mobileAccBtn && mobileCats) {
    mobileAccBtn.addEventListener('click', () => mobileCats.classList.toggle('open'));
  }

  document.querySelectorAll('.scroll-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const trackSel = btn.getAttribute('data-track');
      const dir = Number(btn.getAttribute('data-dir') || 1);
      const track = document.querySelector(trackSel);
      if (!track) return;
      track.scrollBy({ left: dir * 300, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.product-track[data-auto-scroll="true"]').forEach((track) => {
    let raf = null;
    let pause = false;

    function loop() {
      if (!pause) {
        track.scrollLeft += 0.45;
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
          track.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(loop);
    }

    track.addEventListener('mouseenter', () => { pause = true; });
    track.addEventListener('mouseleave', () => { pause = false; });
    loop();

    window.addEventListener('beforeunload', () => {
      if (raf) cancelAnimationFrame(raf);
    });
  });

  const counterNodes = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const target = Number(node.getAttribute('data-counter'));
        const step = Math.max(1, Math.floor(target / 60));
        let current = 0;
        const tick = () => {
          current += step;
          if (current >= target) current = target;
          node.textContent = current.toLocaleString('en-US') + (target < 100 ? '+' : '+');
          if (current < target) requestAnimationFrame(tick);
        };
        tick();
        counterObserver.unobserve(node);
      });
    },
    { threshold: 0.35 }
  );

  counterNodes.forEach((node) => counterObserver.observe(node));

  document.querySelectorAll('[data-copy-id]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const value = btn.getAttribute('data-copy-id');
      try {
        await navigator.clipboard.writeText(value);
        btn.innerHTML = '<i class="fa-regular fa-check"></i>';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 900);
      } catch (err) {
        console.error(err);
      }
    });
  });
})();
