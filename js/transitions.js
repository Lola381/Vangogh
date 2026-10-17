(function () {
  'use strict';

  const curtain = document.querySelector('.page-transition');
  if (!curtain) return;

  let leaving = false;

  curtain.addEventListener('animationend', (event) => {
    if (event.target === curtain && event.animationName === 'museumReveal') {
      curtain.classList.remove('page-transition--entering');
      curtain.classList.add('is-hidden');
    }
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;

    event.preventDefault();
    if (leaving || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.location.assign(destination.href);
      return;
    }

    leaving = true;
    curtain.classList.remove('page-transition--entering', 'is-hidden');
    curtain.classList.add('page-transition--leaving');
    let hasNavigated = false;
    let fallbackTimer;
    const navigate = () => {
      if (hasNavigated) return;
      hasNavigated = true;
      window.clearTimeout(fallbackTimer);
      window.location.assign(destination.href);
    };
    curtain.addEventListener('animationend', (animationEvent) => {
      if (animationEvent.target === curtain && animationEvent.animationName === 'museumCover') navigate();
    }, { once: true });
    fallbackTimer = window.setTimeout(navigate, 750);
  });
})();
