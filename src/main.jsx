import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import parse from 'html-react-parser';
import homeMarkup from './templates/index.html?raw';
import visitMarkup from './templates/visit.html?raw';
import webstoreMarkup from './templates/webstore.html?raw';

const pages = {
  home: { markup: homeMarkup, title: 'Van Gogh Museum | Step into Van Gogh’s World', initialize: () => import('../js/main.js') },
  visit: { markup: visitMarkup, title: 'Tickets & Visit | Van Gogh Museum', initialize: () => import('../js/pages.js') },
  webstore: { markup: webstoreMarkup, title: 'Webstore | Van Gogh Museum', initialize: () => import('../js/pages.js') },
};

function getPage() {
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('/visit.html') || path.endsWith('/visit')) return 'visit';
  if (path.endsWith('/webstore.html') || path.endsWith('/webstore')) return 'webstore';
  return 'home';
}

function MuseumApp() {
  const pageName = getPage();
  const page = pages[pageName];

  useEffect(() => {
    document.title = page.title;

    let cancelled = false;
    page.initialize().then(() => {
      if (!cancelled) return import('../js/transitions.js');
    }).catch((error) => {
      console.error('Museum page interactions could not be initialized.', error);
    });

    return () => { cancelled = true; };
  }, [page]);

  return <>{parse(page.markup)}</>;
}

createRoot(document.getElementById('root')).render(<MuseumApp />);
