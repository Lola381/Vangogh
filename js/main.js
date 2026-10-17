/* ============================================
   VAN GOGH MUSEUM — GSAP + Lenis Animations
   Heavy animation, pixel-perfect recreation
   ============================================ */

(function () {
  'use strict';

  // ========== LENIS SMOOTH SCROLL ==========
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ========== LOADER ==========
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      delay: 1.8,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.classList.add('done');
        animateHeroEntrance();
      }
    });
  });

  // ========== HERO ENTRANCE ==========
  function animateHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Title lines slide up
    tl.to('.hero__line-inner', {
      y: 0,
      duration: 0.8,
      stagger: 0.12,
    })
    // Description fades in and slides up
    .fromTo('#hero-desc', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 0.9,
      y: 0,
      duration: 0.8,
    }, '-=0.5')
    // Scroll indicator fades in and slides up
    .fromTo('#hero-scroll', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.5')
    // Subtle hero image zoom
    .from('#hero-img', {
      scale: 1.15,
      duration: 2.5,
      ease: 'power2.out',
    }, 0);
  }

  // ========== HERO PARALLAX ==========
  gsap.to('#hero-img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    }
  });

  // Hide scroll indicator on scroll
  gsap.to('#hero-scroll', {
    opacity: 0,
    scrollTrigger: {
      trigger: '#hero',
      start: '5% top',
      end: '15% top',
      scrub: true,
    }
  });

  // ========== NAV BEHAVIOR ==========
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    trigger: '#gallery',
    start: 'top 80px',
    endTrigger: '#portrait',
    end: 'top 80px',
    onEnter: () => nav.classList.add('nav--solid'),
    onLeaveBack: () => nav.classList.remove('nav--solid'),
    onLeave: () => nav.classList.remove('nav--solid'),
    onEnterBack: () => nav.classList.add('nav--solid'),
  });

  // ========== GALLERY SECTION ==========
  // Images slide up and fade in smoothly
  const galleryItems = document.querySelectorAll('.gallery__img');

  galleryItems.forEach((item, i) => {
    gsap.fromTo(item, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      delay: i * 0.1,
    });
  });

  // Gallery parallax for each image
  galleryItems.forEach((item) => {
    const speed = parseFloat(item.dataset.speed) || 1;
    gsap.to(item, {
      y: () => (speed - 1) * -120,
      ease: 'none',
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      }
    });
  });

  // Quote reveal
  const galleryQuote = document.getElementById('gallery-quote');
  if (galleryQuote) {
    gsap.fromTo(galleryQuote, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: galleryQuote,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  }

  // Swirl path draw
  const swirlPath = document.getElementById('swirl-path');
  if (swirlPath) {
    gsap.to(swirlPath, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.gallery__swirl',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  }

  // ========== COLLECTION HEADING ==========
  gsap.fromTo('#collection-heading', {
    y: 30,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#collection',
      start: 'top 65%',
      toggleActions: 'play none none reverse',
    }
  });

  // Collection bar slide in
  gsap.fromTo('.collection__bar', {
    y: 30,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.collection__bar',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    }
  });

  gsap.fromTo('.collection__count', {
    y: 30,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.collection__count',
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    }
  });
  // ========== PAINTING CARDS ==========
  const cards = document.querySelectorAll('.p-card');

  cards.forEach((card, i) => {
    gsap.fromTo(card, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      }
    });
  });

  // ========== PORTRAIT SECTION ==========
  gsap.from('#portrait-img', {
    scale: 1.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '#portrait',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  // Vignette darkening effect on portrait
  gsap.from('.portrait', {
    '--vignette': 0,
    scrollTrigger: {
      trigger: '#portrait',
      start: 'top 30%',
      end: 'center center',
      scrub: true,
    }
  });

  // ========== VAN GOGH'S LAST LETTER (ANTIQUE PARCHMENT) ==========
  gsap.fromTo('.parchment-letter', {
    y: 30,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#last-letter',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    }
  });

  gsap.fromTo('.antique-artwork', {
    y: 30,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#last-letter',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    }
  });

  // ========== ARTWORKS STORY DATABASE & INTERACTIVE MODAL ==========
  const ARTWORKS_DB = [
    {
      id: 'montmartre',
      title: 'Montmartre: Behind the Moulin de la Galette',
      artist: 'Vincent van Gogh',
      year: 'Spring 1887',
      period: 'Paris Period',
      medium: 'Oil on canvas, 46.1 cm × 38.3 cm',
      location: 'Van Gogh Museum, Amsterdam',
      image: 'images/Montmartre-_achter_de_Moulin_de_la_Galette.jpg',
      story1: 'During his two years in Paris living with his brother Theo, Vincent van Gogh frequented Montmartre, which was still a rural hilltop village dotted with old windmills, vegetable gardens, and picturesque stone walls.',
      story2: 'This serene landscape captures the windmill Moulin de la Galette from behind. It reflects Vincent\'s pivotal transition from his dark Dutch earthy tones to the bright, light-filled Impressionist palette under the influence of Parisian artists.',
      quote: '“In Paris I’ve learned to see light differently. The air here is full of color and endless motion.”',
      quoteAttr: '— Letter to Wil van Gogh, 1887'
    },
    {
      id: 'french-novels',
      title: 'Piles of French Novels',
      artist: 'Vincent van Gogh',
      year: 'Autumn 1887',
      period: 'Paris Period',
      medium: 'Oil on canvas, 53.0 cm × 73.2 cm',
      location: 'Van Gogh Museum, Amsterdam',
      image: 'images/Piles of French Novels.jpg',
      story1: 'Van Gogh was an insatiable reader who deeply admired modern French naturalist literature by authors like Guy de Maupassant, Émile Zola, and the Goncourt brothers.',
      story2: 'In this radiant still life, he painted paperbacks with bright yellow covers scattered across a table. The vibrant yellow paperbacks were not just everyday items—for Vincent, they represented modern life, intellectual freedom, and human passion.',
      quote: '“The naturalistic novelists—Zola, Maupassant, Daudet—they paint life as it really is, in all its raw, vibrant truth.”',
      quoteAttr: '— Letter to Theo van Gogh, 1887'
    },
    {
      id: 'quinces-lemons',
      title: 'Quinces, Lemons, Pears and Grapes',
      artist: 'Vincent van Gogh',
      year: 'Autumn 1887',
      period: 'Paris Period',
      medium: 'Oil on canvas, 48.5 cm × 65.0 cm',
      location: 'Van Gogh Museum, Amsterdam',
      image: 'images/Quinces, Lemons, Pears and Grapes.jpg',
      story1: 'Executed during Van Gogh’s Paris stay, this luminous still life is a masterclass in complementary color contrast and thick impasto brushwork.',
      story2: 'Vincent placed yellow and green autumn fruits against vibrant blue and violet background tones to heighten visual energy. He even painted an artistic border frame directly onto the edges of the canvas to enclose the composition.',
      quote: '“Color expresses something in itself; one cannot do without it; one must use it boldly.”',
      quoteAttr: '— Letter to Theo van Gogh, 1885'
    },
    {
      id: 'pink-peach-tree',
      title: 'The Pink Peach Tree',
      artist: 'Vincent van Gogh',
      year: 'March 1888',
      period: 'Arles Period',
      medium: 'Oil on canvas, 80.9 cm × 60.5 cm',
      location: 'Kröller-Müller Museum, Otterlo',
      image: 'images/The Pink Peach Tree.jpg',
      story1: 'Arriving in Arles in southern France in early 1888, Van Gogh was enchanted by the sun-drenched countryside and flowering orchards in full spring bloom.',
      story2: 'He painted this canvas outdoors in a single intense burst. Upon learning that his beloved painting teacher Anton Mauve had passed away, Vincent dedicated this pink peach tree to Mauve’s memory, inscribing "Souvenir de Mauve" on the canvas.',
      quote: '“I brought home a size 20 canvas today... peach trees in blossom, a pink peach tree against a sky of pale blue and white... something brought a lump to my throat.”',
      quoteAttr: '— Letter to Theo van Gogh, 30 March 1888'
    },
    {
      id: 'white-orchard',
      title: 'The White Orchard',
      artist: 'Vincent van Gogh',
      year: 'April 1888',
      period: 'Arles Period',
      medium: 'Oil on canvas, 60.0 cm × 81.0 cm',
      location: 'Van Gogh Museum, Amsterdam',
      image: 'images/The White Orchard.jpg',
      story1: 'Part of a celebrated series of 14 orchard paintings executed during April 1888 in Arles. Van Gogh painted at feverish speed before the spring blossoms fell.',
      story2: 'The thick, tactile application of paint (impasto) gives a tangible physical presence to the delicate white petals glinting beneath the brilliant southern French sun.',
      quote: '“I’m in a fury of work, for the trees are in blossom and I want to paint a Provençal orchard of astounding gaiety.”',
      quoteAttr: '— Letter to Theo van Gogh, 9 April 1888'
    },
    {
      id: 'self-portrait',
      title: 'Self-Portrait',
      artist: 'Vincent van Gogh',
      year: 'Autumn 1887',
      period: 'Paris Period',
      medium: 'Oil on canvas, 44.1 cm × 37.5 cm',
      location: 'Van Gogh Museum, Amsterdam',
      image: 'images/van_gogh_self.jpg',
      story1: 'Vincent created over 35 self-portraits during his lifetime, largely because he could not afford to hire models. In Paris, his self-portraits became dynamic laboratories for testing color theories.',
      story2: 'Using dynamic pointillist dashes of complementary colors—turquoise blue, fiery orange, lemon yellow, and red—he expressed profound psychological intensity and intense introspective focus.',
      quote: '“People say—and I’m quite willing to believe it—that it’s difficult to know oneself—but it’s not easy to paint oneself either.”',
      quoteAttr: '— Letter to Theo van Gogh, September 1889'
    },
    {
      id: 'almond-blossom',
      title: 'Almond Blossom',
      artist: 'Vincent van Gogh',
      year: 'February 1890',
      period: 'Saint-Rémy Period',
      medium: 'Oil on canvas, 73.5 cm × 92.4 cm',
      location: 'Van Gogh Museum, Amsterdam',
      image: 'images/Almond Blossom.jpg',
      story1: 'Van Gogh painted this iconic masterpiece as a gift for his brother Theo and sister-in-law Jo, who had just welcomed their newborn son—named Vincent Willem after the painter.',
      story2: 'Blossoming almond branches against a turquoise sky symbolized new life and spring awakening. Drawing inspiration from Japanese Ukiyo-e prints, Van Gogh created a composition of breathtaking tranquility.',
      quote: '“I started making a picture for him right away, to hang in their bedroom: big branches of white almond blossom against a blue sky.”',
      quoteAttr: '— Letter to Theo van Gogh, 15 February 1890'
    },
    {
      id: 'starry-night',
      title: 'The Starry Night',
      artist: 'Vincent van Gogh',
      year: 'June 1889',
      period: 'Saint-Rémy Period',
      medium: 'Oil on canvas, 73.7 cm × 92.1 cm',
      location: 'Museum of Modern Art (MoMA), New York',
      image: 'images/starry-night.jpg',
      story1: 'Painted from the east-facing window of his asylum room at Saint-Paul-de-Mausole in Saint-Rémy-de-Provence, shortly after a severe psychological crisis.',
      story2: 'Van Gogh transformed the nocturnal landscape into a swirling cosmic canvas. The towering cypress tree in the foreground connects heaven and earth, while the glowing crescent moon and morning star radiate transcendent energy.',
      quote: '“This morning I saw the countryside from my window a long time before sunrise, with nothing but the morning star, which looked very big.”',
      quoteAttr: '— Letter to Theo van Gogh, 9 June 1889'
    },
    {
      id: 'farmhouse-provence',
      title: 'Farmhouse in Provence',
      artist: 'Vincent van Gogh',
      year: 'June 1888',
      period: 'Arles Period',
      medium: 'Oil on canvas, 46.1 cm × 60.9 cm',
      location: 'National Gallery of Art, Washington, D.C.',
      image: 'images/Farmhouse_in_Provence,_1888,_Vincent_van_Gogh,_NGA.jpg',
      story1: 'In Arles, Van Gogh painted several outdoor scenes of peasant cottages and farmsteads. He was fascinated by the rustic simplicity of the rural buildings and the bright southern French light.',
      story2: 'This composition shows a farmhouse gate and haystack under a brilliant blue sky, reflecting Vincent\'s love of bold color combinations like yellow and blue to convey heat and sunlight.',
      quote: '“Under the blue sky, the orange and yellow of the houses, the green of the trees, everything stands out with incredible clarity.”',
      quoteAttr: '— Letter to Theo van Gogh, 1888'
    },
    {
      id: 'bedroom-arles',
      title: 'Bedroom in Arles',
      artist: 'Vincent van Gogh',
      year: 'October 1888',
      period: 'Arles Period',
      medium: 'Oil on canvas, 72 cm × 90 cm',
      location: 'Van Gogh Museum, Amsterdam',
      image: 'images/La_Chambre_à_Arles,_by_Vincent_van_Gogh,_from_C2RMF.jpg',
      story1: 'While waiting for his friend Paul Gauguin to join him in the Yellow House in Arles, Vincent painted his own bedroom. He wanted the painting to express absolute restfulness and peace.',
      story2: 'The skewed perspective and flat, vivid colors—yellow furniture, red bedspread, and blue walls—were intended to evoke the simplicity of Japanese prints and the comfort of a personal sanctuary.',
      quote: '“This time it’s simply my bedroom... color is to do everything here, suggesting rest or sleep in general.”',
      quoteAttr: '— Letter to Theo van Gogh, October 1888'
    },
    {
      id: 'yellow-house',
      title: 'The Yellow House',
      artist: 'Vincent van Gogh',
      year: 'September 1888',
      period: 'Arles Period',
      medium: 'Oil on canvas, 72 cm × 91.5 cm',
      location: 'Van Gogh Museum, Amsterdam',
      image: 'images/Vincent_van_Gogh_-_The_yellow_house_(\'The_street\').jpg',
      story1: 'In May 1888, Van Gogh rented four rooms in a building on Place Lamartine in Arles—the right-hand side of the building painted in yellow. He referred to it as the Yellow House.',
      story2: 'He wanted to establish a \'Studio of the South\' where like-minded painters could live and work together. This painting captures the house, the nearby café, and the local street life under a deep cobalt sky.',
      quote: '“It is painting under a blue sky, the house in the sun, and the street... it is tremendously lively.”',
      quoteAttr: '— Letter to Theo van Gogh, September 1888'
    },
    {
      id: 'irises',
      title: 'Irises',
      artist: 'Vincent van Gogh',
      year: 'May 1889',
      period: 'Saint-Rémy Period',
      medium: 'Oil on canvas, 71.1 cm × 93 cm',
      location: 'J. Paul Getty Museum, Los Angeles',
      image: 'images/960px-VanGogh-Irises_3.jpg',
      story1: 'Vincent van Gogh began painting Irises within a week of entering the asylum at Saint-Paul-de-Mausole in Saint-Rémy, France. He worked in the asylum garden, finding solace and a sense of hope in nature.',
      story2: 'He called the painting the \'lightning conductor for my illness\' because he felt that he could keep from going mad by continuing to paint. The painting is influenced by Japanese ukiyo-e woodblock prints.',
      quote: '“It is the lightning conductor for my illness, because I feel that I can keep from going mad by continuing to paint.”',
      quoteAttr: '— Letter to Theo van Gogh, 1889'
    },
    {
      id: 'harvest-provence',
      title: 'Harvest in Provence',
      artist: 'Vincent van Gogh',
      year: 'June 1888',
      period: 'Arles Period',
      medium: 'Oil on canvas, 73.4 cm × 92.5 cm',
      location: 'Van Gogh Museum, Amsterdam',
      image: 'images/Ernte_in_der_Provénce.jpeg',
      story1: 'Painted during a period of intense work in Arles, this landscape captures the harvest season in the sun-drenched fields of the La Crau plain, with the ruins of Montmajour Abbey in the background.',
      story2: 'Vincent wanted to capture the essence of peasant labor and agricultural life. He considered this painting to be one of his most successful, writing that the canvases of the harvest surpassed all others.',
      quote: '“The harvest canvas is one that I think surpasses all the others. I have been working on it all week in the blazing sun.”',
    },
    {
      id: 'cafe-terrace',
      title: 'Café Terrace at Night',
      artist: 'Vincent van Gogh',
      year: 'September 1888',
      period: 'Arles Period',
      medium: 'Oil on canvas, 80.7 cm × 65.3 cm',
      location: 'Kröller-Müller Museum, Otterlo',
      image: 'images/Vincent-van-gogh-cafe-terrace-on-the-place-du-forum-arles-at-night-the.jpg',
      story1: 'Painted in Arles, France, this masterpiece depicts the colorful terrace of the café on the Place du Forum. It is one of the first paintings in which Van Gogh used a starry background.',
      story2: 'Vincent did not sign the painting, but he mentioned it in several letters. The warm yellow and orange of the café terrace contrast sharply with the deep blue and violet of the night sky, dotted with bright stars.',
      quote: '“I enormously enjoy painting on the spot at night. In the past they used to draw, and paint the picture from the drawing daytime. But I find that it suits me to paint the thing right away.”',
      quoteAttr: '— Letter to Wilhelmina van Gogh, 1888'
    },
    {
      id: 'road-cypress',
      title: 'Road with Cypress and Star',
      artist: 'Vincent van Gogh',
      year: 'May 1890',
      period: 'Saint-Rémy Period',
      medium: 'Oil on canvas, 92.0 cm × 73.0 cm',
      location: 'Kröller-Müller Museum, Otterlo',
      image: 'images/Vincent_van_Gogh_-_Road_with_Cypress_and_Star_-_c._12-15_May_1890.jpg',
      story1: 'This painting is one of the last Vincent van Gogh created in Saint-Rémy before leaving the asylum. It features a prominent cypress tree set against a swirling, starry night sky with a crescent moon.',
      story2: 'Van Gogh described the cypress as "always occupying my thoughts." In this work, the cypress stands as a powerful symbol of nature\'s scale and eternity, linking the earth to the cosmic sky.',
      quote: '“A cypress is as beautiful in line and proportion as an Egyptian obelisk. And the sky is a wonderful green and blue.”',
      quoteAttr: '— Letter to Theo van Gogh, 1889'
    }
  ];

  let currentArtworkIndex = 0;

  const storyModal = document.getElementById('story-modal');
  const storyBackdrop = document.getElementById('story-modal-backdrop');
  const storyCloseBtn = document.getElementById('story-modal-close');
  const smPrevBtn = document.getElementById('sm-prev');
  const smNextBtn = document.getElementById('sm-next');
  const storyModalBox = storyModal.querySelector('.story-modal__box');
  let artworkTransition = null;

  function renderStoryArtwork(index) {
    const art = ARTWORKS_DB[index];

    document.getElementById('sm-image').src = art.image;
    document.getElementById('sm-image').alt = art.title;
    document.getElementById('sm-title').textContent = art.title;
    document.getElementById('sm-year').textContent = art.year;
    document.getElementById('sm-period').textContent = art.period;
    document.getElementById('sm-medium').textContent = art.medium;
    document.getElementById('sm-location').textContent = art.location;
    document.getElementById('sm-story-1').textContent = art.story1;
    document.getElementById('sm-story-2').textContent = art.story2;
    document.getElementById('sm-quote').textContent = art.quote;
    document.getElementById('sm-quote-attr').textContent = art.quoteAttr;
    document.getElementById('sm-counter').textContent = `${index + 1} / ${ARTWORKS_DB.length}`;
  }

  function openStoryModal(index) {
    if (index < 0 || index >= ARTWORKS_DB.length) return;
    currentArtworkIndex = index;
    renderStoryArtwork(index);
    storyModalBox.scrollTop = 0;

    storyModal.classList.add('active');
    storyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lenis.stop();
  }

  function changeStoryArtwork(index, direction) {
    if (index < 0 || index >= ARTWORKS_DB.length || artworkTransition) return;

    const targets = [storyModal.querySelector('.story-modal__visual'), storyModal.querySelector('.story-modal__content')];
    smPrevBtn.disabled = true;
    smNextBtn.disabled = true;

    const finish = () => {
      currentArtworkIndex = index;
      renderStoryArtwork(index);
      storyModalBox.scrollTop = 0;
      artworkTransition = gsap.fromTo(targets,
        { autoAlpha: 0, x: direction * -18 },
        {
          autoAlpha: 1, x: 0, duration: 0.58, stagger: 0.06,
          ease: 'power3.out', clearProps: 'transform',
          onComplete: () => {
            artworkTransition = null;
            smPrevBtn.disabled = false;
            smNextBtn.disabled = false;
          }
        }
      );
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(targets, { clearProps: 'opacity,visibility,transform' });
      finish();
      return;
    }

    artworkTransition = gsap.to(targets, {
      autoAlpha: 0, x: direction * 18, duration: 0.22,
      stagger: 0.035, ease: 'power2.in', onComplete: finish
    });
  }

  function closeStoryModal() {
    artworkTransition?.kill();
    artworkTransition = null;
    gsap.set([storyModal.querySelector('.story-modal__visual'), storyModal.querySelector('.story-modal__content')], { clearProps: 'opacity,visibility,transform' });
    smPrevBtn.disabled = false;
    smNextBtn.disabled = false;
    storyModal.classList.remove('active');
    storyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lenis.start();
  }

  // Click handler for collection cards
  document.querySelectorAll('.p-card').forEach(card => {
    card.addEventListener('click', () => {
      const artId = card.getAttribute('data-artwork');
      const idx = ARTWORKS_DB.findIndex(a => a.id === artId);
      if (idx !== -1) openStoryModal(idx);
    });
  });

  // Click handler for gallery images
  document.querySelectorAll('.gallery__img').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const src = img.getAttribute('src');
      const idx = ARTWORKS_DB.findIndex(a => a.image === src);
      if (idx !== -1) openStoryModal(idx);
      else openStoryModal(0);
    });
  });

  storyCloseBtn?.addEventListener('click', closeStoryModal);
  storyBackdrop?.addEventListener('click', closeStoryModal);

  smPrevBtn?.addEventListener('click', () => {
    const prevIdx = (currentArtworkIndex - 1 + ARTWORKS_DB.length) % ARTWORKS_DB.length;
    changeStoryArtwork(prevIdx, -1);
  });

  smNextBtn?.addEventListener('click', () => {
    const nextIdx = (currentArtworkIndex + 1) % ARTWORKS_DB.length;
    changeStoryArtwork(nextIdx, 1);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && storyModal.classList.contains('active')) {
      closeStoryModal();
    }
  });


  // ========== MAGNETIC HOVER ON PAINTING CARDS ==========
  cards.forEach(card => {
    const wrap = card.querySelector('.p-card__wrap');
    if (!wrap) return;

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(wrap, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    });

    wrap.addEventListener('mouseleave', () => {
      gsap.to(wrap, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  });

  // ========== FILTER TAG INTERACTIONS ==========
  document.querySelectorAll('.collection__tag').forEach(tag => {
    tag.addEventListener('click', () => {
      gsap.to(tag, {
        scale: 0.9,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          tag.style.display = 'none';
          const visible = document.querySelectorAll('.collection__tag:not([style*="display: none"])');
          document.querySelector('.collection__filter-label').textContent = `Filter (${visible.length}) +`;
        }
      });
    });
  });

  // ========== VIEW TOGGLE ==========
  const grid = document.getElementById('grid');
  document.querySelectorAll('.collection__view-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.collection__view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const layouts = [
        { cols: 'repeat(3, 1fr)', gap: '1.5rem 2rem' },
        { cols: '1fr 1.5fr', gap: '2.5rem 4rem' },
        { cols: '1fr', gap: '2rem' },
      ];
      const l = layouts[i];

      gsap.to(grid, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          grid.style.gridTemplateColumns = l.cols;
          grid.style.gap = l.gap;
          gsap.to(grid, { opacity: 1, duration: 0.35 });
        }
      });
    });
  });

  // ========== SEARCH FOCUS ==========
  const searchInput = document.getElementById('search-input');
  const searchWrap = searchInput?.closest('.collection__search');
  if (searchInput && searchWrap) {
    searchInput.addEventListener('focus', () => {
      gsap.to(searchWrap, { borderBottomColor: '#D4A843', borderBottomWidth: '2px', duration: 0.3 });
    });
    searchInput.addEventListener('blur', () => {
      gsap.to(searchWrap, { borderBottomColor: '#1A1A1A', borderBottomWidth: '1px', duration: 0.3 });
    });
  }

  // ========== NAV LINK SMOOTH SCROLL ==========
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) lenis.scrollTo(el, { duration: 1.6 });
      }
    });
  });

  // Nav badge scrolls to top
  document.getElementById('nav-badge')?.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.6 });
  });

  // ========== GENERIC FADE & SLIDE UP ELEMENTS ==========
  const fadeElements = document.querySelectorAll('.fade-slide-up-el');
  fadeElements.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  });

})();

