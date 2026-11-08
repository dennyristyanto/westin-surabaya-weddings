// Keep selection motion consistent across all four pages.
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.header .desktop-nav, .header .mobile-nav').forEach(nav => {
    const links = [...nav.querySelectorAll('a')];
    const current = links.findIndex(link => link.getAttribute('aria-current') === 'page');
    if (current < 0) return;
    nav.classList.add('nav-motion');
    function select(index) {
      links.forEach((link, position) => {
        link.classList.toggle('nav-selected', position === index);
        link.style.setProperty('--nav-scale', position === index ? '1.09' : '1');
        link.style.setProperty('--nav-offset', nav.classList.contains('desktop-nav') && position !== index ? (position < index ? '-7px' : '7px') : '0px');
      });
    }
    // Paint the resting positions first, then ease into the active page.
    requestAnimationFrame(() => requestAnimationFrame(() => select(current)));
    let navigating = false;
    links.forEach((link, index) => link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
      if (index === current || reducedMotion.matches) return;
      event.preventDefault();
      if (navigating) return;
      navigating = true;
      select(index);
      setTimeout(() => location.assign(link.href), 260);
    }));
    window.addEventListener('pageshow', event => {
      navigating = false;
      if (event.persisted) select(current);
    });
  });
})();
