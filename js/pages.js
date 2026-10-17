(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Gentle arrivals and painting parallax keep the pages in step with the home page.
  if (window.gsap && !reducedMotion) {
    document.body.classList.add('motion-ready');
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach((element, index) => {
      const isHero = element.closest('.page-hero');
      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        duration: isHero ? 0.85 : 0.7,
        delay: isHero ? 0.14 + index * 0.11 : 0,
        ease: 'power3.out',
        scrollTrigger: isHero || !window.ScrollTrigger ? undefined : {
          trigger: element,
          start: 'top 88%',
          once: true
        }
      });
    });

    const heroImage = document.querySelector('.page-hero__art img');
    if (heroImage) {
      const finalScale = document.body.classList.contains('store-page') ? 1.02 : 1.015;
      gsap.fromTo(heroImage, { scale: finalScale + 0.05 }, { scale: finalScale, duration: 2.2, ease: 'power2.out' });
      if (window.ScrollTrigger) {
        gsap.to(heroImage, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: '.page-hero', start: 'top top', end: 'bottom top', scrub: true }
        });
      }
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  mobileNavToggle?.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('mobile-nav-open');
    mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
    mobileNavToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  document.querySelectorAll('.museum-page .nav__center a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('mobile-nav-open');
      mobileNavToggle?.setAttribute('aria-expanded', 'false');
      mobileNavToggle?.setAttribute('aria-label', 'Open navigation');
    });
  });

  // Store edit filters.
  const filterButtons = document.querySelectorAll('.shop-filter');
  const productCards = document.querySelectorAll('.product-card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      const filter = button.dataset.filter;
      productCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !show);
        if (show && window.gsap && !reducedMotion) {
          gsap.fromTo(card, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'opacity,visibility,transform' });
        }
      });
    });
  });

  // Lightweight preview bag. Purchases continue through the museum's official shop.
  const bag = new Map();
  const bagCount = document.getElementById('bag-count');
  const drawerCount = document.getElementById('bag-drawer-count');
  const bagTotal = document.getElementById('bag-total');
  const bagItems = document.getElementById('bag-items');
  const drawer = document.getElementById('bag-drawer');
  const backdrop = document.getElementById('bag-backdrop');

  function openBag() {
    document.body.classList.add('bag-open');
    document.body.style.overflow = 'hidden';
    drawer?.setAttribute('aria-hidden', 'false');
    document.getElementById('bag-close')?.focus();
  }

  function closeBag() {
    document.body.classList.remove('bag-open');
    document.body.style.overflow = '';
    drawer?.setAttribute('aria-hidden', 'true');
  }

  function renderBag() {
    const entries = Array.from(bag.entries());
    const count = entries.reduce((sum, [, item]) => sum + item.quantity, 0);
    const total = entries.reduce((sum, [, item]) => sum + item.price * item.quantity, 0);
    if (bagCount) bagCount.textContent = count;
    if (drawerCount) drawerCount.textContent = `(${count})`;
    if (bagTotal) bagTotal.textContent = `€${total}`;
    if (!bagItems) return;
    if (!entries.length) {
      bagItems.innerHTML = '<p class="bag-empty">Your bag is waiting for a little inspiration.</p>';
      return;
    }
    bagItems.innerHTML = entries.map(([name, item]) => `
      <article class="bag-item">
        <div class="bag-item__swatch"><img src="${item.image}" alt=""></div>
        <div><h3>${name}</h3><p>€${item.price} · Qty ${item.quantity}</p></div>
        <button class="bag-item__remove" data-remove="${name}" aria-label="Remove ${name} from bag">Remove</button>
      </article>`).join('');
    bagItems.querySelectorAll('[data-remove]').forEach((button) => {
      button.addEventListener('click', () => {
        bag.delete(button.dataset.remove);
        renderBag();
      });
    });
  }

  document.querySelectorAll('.product-add').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const name = card.dataset.product;
      const existing = bag.get(name);
      bag.set(name, {
        price: Number(card.dataset.price),
        image: card.querySelector('img').getAttribute('src'),
        quantity: existing ? existing.quantity + 1 : 1
      });
      renderBag();
      button.textContent = '✓';
      window.setTimeout(() => { button.textContent = '+'; }, 700);
    });
  });

  document.getElementById('bag-open')?.addEventListener('click', openBag);
  document.getElementById('bag-close')?.addEventListener('click', closeBag);
  backdrop?.addEventListener('click', closeBag);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('bag-open')) closeBag();
  });
})();
