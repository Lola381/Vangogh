# Van Gogh Museum Web Experience: Technical Presentation

## 1. Introduction
Good [morning/afternoon] everyone. Today, I'm going to walk you through the technical implementation of our new digital experience for the Van Gogh Museum. 

The goal of this project was to move beyond a traditional, static website and build a highly immersive, performant, and interactive "digital museum" that honors Vincent van Gogh's legacy while utilizing modern web technologies.

## 2. The Tech Stack
We opted for a robust, lightweight, and framework-agnostic approach to ensure maximum performance and absolute control over the DOM.

*   **Core:** HTML5 & Vanilla JavaScript (No heavy frameworks like React or Vue were used to reduce overhead).
*   **Styling:** Vanilla CSS (utilizing CSS Variables, Flexbox, and Grid for complex layouts).
*   **Animation Engine:** GSAP (GreenSock Animation Platform) v3.12.5.
*   **Scroll Management:** GSAP ScrollTrigger & Lenis Smooth Scroll.

## 3. Core Architecture: Scroll & Animation Integration
One of the most critical aspects of an immersive site is how it feels to scroll. Native browser scrolling can often feel disjointed during heavy animations.

*   **Lenis Integration:** We implemented Lenis for native-feeling smooth scrolling. We configured it with a custom easing function (`t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`) and a duration of 1.4s to give the site a weighty, premium feel.
*   **The Bridge:** To ensure our animations trigger perfectly with the smoothed scroll, we bridged Lenis and GSAP's ScrollTrigger. 
    *   We used `lenis.on('scroll', ScrollTrigger.update)` to sync the two.
    *   We added Lenis's `raf` to the GSAP ticker to unify the requestAnimationFrame loops, ensuring no jitter or lag.

## 4. Advanced Animation Techniques (GSAP)
We used GSAP extensively to bring the artwork to life.

*   **Timeline-Based Entrances:** For the Hero section, we used `gsap.timeline()` to choreograph a multi-step sequence. Titles slide up using staggers (`stagger: 0.12`), descriptions fade in, and the background image undergoes a subtle 2.5-second zoom (`scale: 1.15`), all perfectly timed after a custom loader finishes.
*   **Data-Driven Parallax:** In the gallery section, we didn't want a uniform parallax effect. We mapped custom `data-speed` attributes on our HTML elements to GSAP scroll triggers. This allowed us to dynamically calculate the `y` offset based on the image, creating a profound sense of depth as you scroll.
*   **SVG Path Drawing:** For stylistic flourishes, like the signature swirl in the gallery, we animated the `strokeDashoffset` of SVG paths tied to a ScrollTrigger, creating a "drawn-on-scroll" effect.

## 5. Interactive UI Engineering
Beyond scrolling, the user interactions needed to feel tactile and responsive.

*   **Magnetic Hover Effect:** On the painting cards, we built a custom 3D magnetic hover effect. By calculating the mouse position relative to the element's bounding box (`getBoundingClientRect`), we map the X/Y coordinates to `rotateY` and `rotateX` GSAP properties with a `transformPerspective` of 800. This makes the art cards "tilt" towards the user's cursor.
*   **Animated Layout Transitions:** In the Collection section, users can toggle between three grid views. Instead of jarring CSS class swaps, we used GSAP to fade out the grid, swap the `gridTemplateColumns` and `gap` styles on the fly, and fade it back in, making layout shifts smooth.
*   **Data-Driven Modals:** We built a custom JSON-like database (`ARTWORKS_DB`) in our JavaScript to store the metadata, stories, and quotes for the paintings. The modal logic is dynamically populated based on the clicked element's `data-artwork` ID, keeping the DOM clean and scalable. It includes full accessibility support, trapping focus and allowing 'Escape' key closures.

## 6. CSS Architecture & The "Antique Archival" Section
A major design challenge was the "Vincent's Last Letter" section, which needed to look like an authentic 19th-century document.

*   This was achieved entirely through CSS. We used layered gradients, box-shadows, and custom typography to create elements like:
    *   A realistic wax seal (`.wax-seal`).
    *   Faded postmark rings (`.postmark__ring`).
    *   Antique parchment textures and layouts.
*   By doing this in CSS rather than relying on heavy image assets, we kept the page weight low and the text fully accessible and selectable.

## 7. Conclusion
In summary, by pairing Vanilla JavaScript with powerful tools like GSAP and Lenis, we created an experience that performs exceptionally well, feels incredibly fluid, and brings a modern, interactive edge to classical art. 

Thank you. I'm happy to take any questions regarding the codebase or our implementation choices.
