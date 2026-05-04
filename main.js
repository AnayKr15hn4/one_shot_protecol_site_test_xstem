gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // 1. Nav Morphing Logic
  const navPill = document.querySelector('.nav-pill');
  ScrollTrigger.create({
    start: "top -100",
    end: 99999,
    toggleClass: {className: 'scrolled', targets: navPill}
  });

  // 2. Hero Animation
  const heroElements = [".hero-sans", ".hero-serif", ".hero-subtitle", ".hero-cta"];
  gsap.from(heroElements, {
    y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: "power3.out", delay: 0.2
  });

  // 3. Diagnostic Shuffler
  const shufflerCards = document.querySelectorAll('.shuffler-card');
  let data = [
    { zIndex: 3, top: 0, scale: 1, opacity: 1 },
    { zIndex: 2, top: 15, scale: 0.95, opacity: 0.6 },
    { zIndex: 1, top: 30, scale: 0.9, opacity: 0.3 }
  ];
  
  function updateShuffler() {
    shufflerCards.forEach((card, i) => {
      card.style.zIndex = data[i].zIndex;
      card.style.top = data[i].top + 'px';
      card.style.transform = `scale(${data[i].scale})`;
      card.style.opacity = data[i].opacity;
    });
  }
  updateShuffler();
  
  setInterval(() => {
    data.unshift(data.pop());
    updateShuffler();
  }, 3000);

  // 4. Telemetry Typewriter
  const typeText = "Connecting to network... Synergy optimized. Collaborative metrics established.";
  const typeEl = document.getElementById("typewriter");
  let charIdx = 0;
  function typeWriter() {
    if (charIdx < typeText.length) {
      typeEl.innerHTML += typeText.charAt(charIdx);
      charIdx++;
      setTimeout(typeWriter, Math.random() * 50 + 30);
    } else {
      setTimeout(() => { typeEl.innerHTML = ""; charIdx = 0; typeWriter(); }, 5000);
    }
  }
  const obs = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) { typeWriter(); obs.disconnect(); }
  });
  obs.observe(document.getElementById("card-collaboration"));

  // 5. Cursor Protocol Scheduler
  const cursor = document.querySelector('.animated-cursor');
  const targetDay = document.getElementById('target-day');
  const targetSave = document.getElementById('target-save');
  
  function runCursorTimeline() {
    let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.set(cursor, { x: 0, y: 0, opacity: 1 });
    tl.set(targetDay, { backgroundColor: 'var(--cream)' });
    tl.set(targetSave, { scale: 1, backgroundColor: 'var(--moss)' });
    
    // move to day
    tl.to(cursor, { x: 140, y: 35, duration: 1, ease: "power2.inOut" });
    tl.to(cursor, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });
    tl.set(targetDay, { backgroundColor: 'var(--clay)' }, "-=0.1");
    
    // move to save
    tl.to(cursor, { x: 150, y: 80, duration: 0.8, ease: "power2.inOut" });
    tl.to(cursor, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });
    tl.set(targetSave, { scale: 0.95, backgroundColor: 'var(--clay)' }, "-=0.1");
    tl.to(targetSave, { scale: 1, duration: 0.2 });
    
    tl.to(cursor, { opacity: 0, duration: 0.5 }, "+=0.5");
  }
  runCursorTimeline();

  // 6. Philosophy Parallax
  gsap.to(".philosophy-bg", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: { trigger: ".philosophy", start: "top bottom", end: "bottom top", scrub: true }
  });
  gsap.from(".phil-common", {
    y: 30, opacity: 0, duration: 1, scrollTrigger: { trigger: ".philosophy", start: "top 60%" }
  });
  gsap.from(".phil-diff", {
    y: 40, opacity: 0, duration: 1, delay: 0.2, scrollTrigger: { trigger: ".philosophy", start: "top 60%" }
  });

  // 7. Sticky Stacking Archive
  const cards = gsap.utils.toArray('.protocol-card');
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return; // last card doesn't stack away
    ScrollTrigger.create({ trigger: card, start: "top top", pin: true, pinSpacing: false });
    gsap.to(card, {
      scale: 0.9, opacity: 0.5, filter: "blur(20px)",
      scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: true }
    });
  });
});
