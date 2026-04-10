(function () {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('#heroDots button'));
  const progress = document.getElementById('heroProgress');
  let active = 0;
  let timer = null;
  let progressTimer = null;
  let touchStartX = 0;

  function setSlide(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => slide.classList.toggle('active', idx === active));
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === active));
    restartProgress();
  }

  function next() {
    setSlide(active + 1);
  }

  function restartAuto() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  function restartProgress() {
    if (!progress) return;
    if (progressTimer) clearInterval(progressTimer);
    progress.style.width = '0%';
    let pct = 0;
    progressTimer = setInterval(() => {
      pct += 1.8;
      progress.style.width = Math.min(100, pct) + '%';
    }, 100);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      setSlide(index);
      restartAuto();
    });
  });

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) < 50) return;
    if (diff < 0) setSlide(active + 1);
    if (diff > 0) setSlide(active - 1);
    restartAuto();
  });

  restartAuto();
  restartProgress();
})();
