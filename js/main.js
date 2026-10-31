/* ==========================================================================
   SCRIPT — TABLE OF CONTENTS
   1. PHOTO SETTINGS ........ edit these to add / adjust your picture
   2. SCROLL REVEAL ......... fade-in sections + animated counters
   3. NAVIGATION ............ highlight current link, close mobile menu
   4. CAROUSEL .............. Projects & Certifications sliders
   5. SKILLS HUB ............ skill categories data + detail panel
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. PHOTO SETTINGS  (the only place you need to edit for your picture)
        PHOTO       : image path, e.g. "photo.jpg" (or a base64 data URI).
                      Fills both the Home and About circles. "" = placeholder.
        PHOTO_X / Y : move the picture. 0 = left/top, 50 = centre, 100 = right/bottom
                      (lower PHOTO_Y shows more of the head)
        PHOTO_ZOOM  : 1 = normal, 1.2 = closer, 1.5 = much closer
        PHOTO_FIT   : "cover" fills the circle, "contain" shows the whole photo
  ------------------------------------------------------------------------ */
  // Add your photo at assets/images/profile.jpg, then set PHOTO to that path.
  var PHOTO      = "assets/images/profile_pic.png";
  var PHOTO_X    = 50;
  var PHOTO_Y    = 14;
  var PHOTO_ZOOM = 1;
  var PHOTO_FIT  = "cover";

  if (PHOTO) {
    document.querySelectorAll('.slot').forEach(function (slot) {
      var img = slot.querySelector('img');
      slot.classList.add('has');
      img.src = PHOTO;
      img.style.objectFit = PHOTO_FIT;
      img.style.setProperty('--px', PHOTO_X + '%');
      img.style.setProperty('--py', PHOTO_Y + '%');
      img.style.setProperty('--z', PHOTO_ZOOM);
    });
  }

  /* ------------------------------------------------------------------------
     2. SCROLL REVEAL  (sections with class "rv" fade in; [data-n] count up)
  ------------------------------------------------------------------------ */
  var reveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('show');
      e.target.querySelectorAll('[data-n]').forEach(countUp);
      reveal.unobserve(e.target);
    });
  }, { threshold: .15 });

  document.querySelectorAll('.rv').forEach(function (el) { reveal.observe(el); });

  function countUp(el) {
    var target = +el.dataset.n, start = null;
    function step(ts) {
      start = start || ts;
      var p = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.round(target * p).toLocaleString('en-US') + (el.hasAttribute('data-np') ? '' : '+');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------------------
     3. NAVIGATION  (active link follows scroll; menu closes after a tap)
  ------------------------------------------------------------------------ */
  var navLinks = [].slice.call(document.querySelectorAll('#links a'));

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      navLinks.forEach(function (a) {
        a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('section').forEach(function (s) { spy.observe(s); });

  navLinks.forEach(function (a) {
    a.addEventListener('click', function () {
      document.getElementById('links').classList.remove('open');
    });
  });

  /* ------------------------------------------------------------------------
     4. CAROUSEL  (used by every element with class "pj7": Projects, Certificates)
        Arrows, dots, drag/swipe, or clicking a side card changes the slide.
  ------------------------------------------------------------------------ */
  function carousel(root) {
    var slides = [].slice.call(root.querySelectorAll('.sl'));
    var dots   = [].slice.call(root.querySelectorAll('.dots button'));
    var track  = root.querySelector('.tr');
    var index  = 0, startX = null;

    function go(n) {
      index = Math.max(0, Math.min(slides.length - 1, n));
      slides.forEach(function (s, i) {
        var d = i - index, dist = Math.abs(d);
        s.style.transform     = 'translateX(' + d * 104 + '%) scale(' + (d ? .88 : 1) + ')';
        s.style.opacity       = dist > 1 ? 0 : d ? .5 : 1;
        s.style.zIndex        = 3 - dist;
        s.style.pointerEvents = dist > 1 ? 'none' : 'auto';
        s.classList.toggle('act', !d);
      });
      dots.forEach(function (b, i) { b.classList.toggle('on', i === index); });
    }

    track.addEventListener('pointerdown',   function (e) { startX = e.clientX; });
    track.addEventListener('pointercancel', function () { startX = null; });
    track.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    });

    slides.forEach(function (s, i) {
      s.addEventListener('click', function () { if (i !== index) go(i); });
    });
    dots.forEach(function (b, i) { b.onclick = function () { go(i); }; });
    root.querySelector('.ar.l').onclick = function () { go(index - 1); };
    root.querySelector('.ar.r').onclick = function () { go(index + 1); };

    go(0);
  }

  document.querySelectorAll('.pj7').forEach(carousel);

  /* ------------------------------------------------------------------------
     5. SKILLS HUB
        EDIT YOUR SKILLS HERE. Each category is:
        [ title, short description, icon id, [skills...], note text ]
        icon ids: code, mon, ai, db, tool, cap  (symbols defined in the Skills section)
        NOTE: the left cards show only the domain name; clicking one (or the arrows
              on the panel) shows the full skill list from this data in the right panel.
  ------------------------------------------------------------------------ */
  var SKILLS = [
    ["Programming Languages", "Core foundations for problem solving and logic building.", "code", ["C++", "Python", "Java", "JavaScript", "SQL"], "I enjoy writing clean, efficient and maintainable code."],
    ["Web Development", "Building responsive and interactive web applications.", "mon", ["HTML", "CSS", "JavaScript", "React"], "Applied in full stack projects like Omni Food Service."],
    ["AI & Machine Learning", "Creating intelligent systems that learn and adapt.", "ai", ["Python", "XGBoost", "Gemini AI", "Data Preprocessing"], "Applied in CyberShield and during my AI/ML internship."],
    ["Databases & Backend", "Managing data and building scalable services.", "db", ["PostgreSQL", "SQL", "Flask"], "Used in Omni Food Service with PostgreSQL."],
    ["Developer Tools", "Improving productivity and streamlining workflows.", "tool", ["Git", "GitHub", "n8n", "FFmpeg", "Google Sheets API", "YouTube Data API"], "Used to build the ShortFlow automation workflow."],
    ["Core Computer Science", "Fundamentals that power every solution.", "cap", ["DSA", "OOP", "DBMS", "Operating Systems", "Cloud Computing"], "Coursework: Software Development, OS, DBMS, OOPS, Cloud Computing."]
  ];

  var cards = [].slice.call(document.querySelectorAll('.kc'));
  var panel = document.querySelector('.kp');
  var current = 0;

  /* monogram shown on each skill tile: HTML -> HTML, JavaScript -> JS, Data Preprocessing -> DP */
  function monogram(x) {
    if (/^[A-Z+#]{1,5}$/.test(x)) return x;
    if (x.indexOf(' ') > 0) return x.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2);
    return x.replace(/[^A-Z]/g, '').slice(0, 2) || x[0];
  }

  function showSkill(n) {
    current = (n + SKILLS.length) % SKILLS.length;
    var k = SKILLS[current];
    document.getElementById('kn').textContent  = '0' + (current + 1);
    document.getElementById('kt').textContent  = k[0];
    document.getElementById('kt2').textContent = k[0];
    document.getElementById('kd').textContent  = k[1];
    document.getElementById('kq').textContent  = k[4];
    panel.querySelector('.kb use').setAttribute('href', '#sk-' + k[2]);
    document.getElementById('kg').innerHTML = k[3].map(function (x) {
      return '<div><span class="mo">' + monogram(x) + '</span>' + x + '</div>';
    }).join('');
    cards.forEach(function (c, i) { c.classList.toggle('on', i === current); });
    panel.classList.remove('sw');
    void panel.offsetWidth;            /* restart the fade animation */
    panel.classList.add('sw');
  }

  cards.forEach(function (c, i) { c.addEventListener('click', function () { showSkill(i); }); });
  panel.querySelector('.kar.pv').onclick = function () { showSkill(current - 1); };
  panel.querySelector('.kar.nx').onclick = function () { showSkill(current + 1); };
  showSkill(0);

})();
