/* Bharat Darshanam Travels: small script for every page. */
(function () {
  var WA = '919511333174';

  // 1. Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', open);
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
  }

  // 2. Seasonally closed trips. To reopen a trip, delete its line.
  var CLOSED = {
    'The Grand Ladakh Circuit': { opens: 'May 2027', reason: "Ladakh's high passes are snowbound in winter and the Manali–Leh and Srinagar–Leh highways close. The road circuit runs roughly from May–June to September." },
    'The Wild Zanskar Expedition': { opens: 'June 2027', reason: 'Zanskar is cut off by heavy snow in winter and its mountain passes close. The season runs roughly from June to September.' },
    'The Great Spiti Journey': { opens: 'May 2027', reason: 'Kunzum Pass and the high roads into Spiti are snowbound in winter, so the full Spiti circuit is not possible. The season runs roughly from May to October.' },
    'The Sacred Char Dham Pilgrimage': { opens: 'April–May 2027', reason: 'The temples of Yamunotri, Gangotri, Kedarnath and Badrinath close for winter every year and reopen around Akshaya Tritiya (April–May).' },
    'Hampta Pass Trek': { opens: 'June 2027', reason: 'Hampta Pass is under deep snow in winter and the trail is not safe. The trek season runs roughly from June to early October.' },
    'Valley of Flowers Trek': { opens: 'June 2027', reason: 'Valley of Flowers National Park is open only from 1 June to 31 October each year.' }
  };
  var waLink = function (text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); };

  document.querySelectorAll('.trip[data-trip]').forEach(function (card) {
    var name = card.getAttribute('data-trip');
    var btn = card.querySelector('.trip-wa');
    var info = CLOSED[name];
    if (btn) {
      btn.href = waLink(info
        ? "Hello Gajendra Singh! I'd like to pre-book the " + name + ' for the ' + info.opens + ' season. Please share the dates and details.'
        : "Hello Gajendra Singh! I'm interested in the " + name + '. Please share the itinerary, price and dates.');
      btn.target = '_blank';
      btn.rel = 'noopener';
    }
    if (!info) return;
    card.classList.add('is-closed');
    var img = card.querySelector('.trip-img');
    if (img) {
      var badge = document.createElement('span');
      badge.className = 'badge closed';
      badge.textContent = 'Closed for winter';
      img.appendChild(badge);
    }
    var foot = card.querySelector('.trip-foot');
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'closed-toggle';
    toggle.textContent = 'Why closed?';
    toggle.setAttribute('aria-expanded', 'false');
    var note = document.createElement('div');
    note.className = 'closed-note';
    note.hidden = true;
    var strong = document.createElement('strong');
    strong.textContent = 'Opens ' + info.opens;
    note.appendChild(strong);
    note.appendChild(document.createTextNode(info.reason));
    toggle.addEventListener('click', function () {
      note.hidden = !note.hidden;
      toggle.textContent = note.hidden ? 'Why closed?' : 'Hide';
      toggle.setAttribute('aria-expanded', String(!note.hidden));
    });
    if (foot) { foot.before(toggle); foot.before(note); }
    if (btn) btn.textContent = 'Pre-book 2027';
    if (card.parentElement) card.parentElement.appendChild(card); // closed trips go last
  });
})();
