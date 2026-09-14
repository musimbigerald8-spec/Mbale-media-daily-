/* Mbale Media Daily — article links, search, Monday newsroom refresh and AI chat */
(function () {
  'use strict';

  const BASE = 'https://musimbigerald8-spec.github.io/Mbale-media-daily-/';
  const ENDPOINT = window.MBMD_AI_ENDPOINT || 'https://mbale-media-ai.vercel.app/api/chat';

  function normalize(text) {
    return (text || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[“”‘’'"`]/g, '').replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const articleLinks = {
    'Uganda schools reopen today for third term': 'article-uganda-schools-third-term.html',
    'Government orders mandatory 21-day quarantine for students travelling from DRC': 'article-drc-student-quarantine.html',
    'King Oyo buried as Edward Rukidi Kijanangoma assumes the Tooro throne': 'article-tooro-succession-latest.html',
    'Cricket Cranes continue strong Kigali run': 'article-uganda-kenya-cricket-2026.html',
    'Arsenal beat Sunderland 2–0 to maintain perfect start': 'article-sunderland-arsenal-latest.html',
    'Coffee and farm resilience remain key priorities': 'article-coffee-katakwi.html',
    'Mushroom farming gives women a new livelihood route': 'article-mushroom-women.html',
    'UWA launches 10-year lion recovery plan': 'article-uganda-dry-conditions.html',
    '21-day quarantine ordered for students travelling from DRC': 'article-drc-student-quarantine.html',
    'Kitara eliminate Mogadishu City and book Al Ahly date': 'article-vipers-express-2-0.html',
    'Tornado Bees’ batting blitz dominates Nile': 'article-uganda-kenya-cricket-2026.html'
  };

  function linkFor(title) {
    return articleLinks[title] || 'today.html';
  }

  function setupSearch() {
    const form = document.getElementById('searchForm');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const empty = document.getElementById('searchEmpty');
    if (!form || !input || !results) return;

    function getArticles() {
      const seen = new Set(), items = [];
      document.querySelectorAll('.story, .spotlight-card, .card, article, [data-searchable]').forEach(el => {
        if (seen.has(el) || el.closest('#searchResults')) return;
        seen.add(el);
        const heading = el.querySelector('h1,h2,h3,h4,a');
        const title = heading ? heading.textContent.trim() : '';
        const text = el.innerText.trim();
        const link = el.querySelector('a[href]');
        if (title || text) items.push({ title: title || text.slice(0, 100), text, href: link ? link.href : '' });
      });
      return items;
    }

    function render(query) {
      const q = normalize(query);
      results.innerHTML = '';
      results.style.display = 'none';
      if (empty) empty.style.display = 'none';
      if (!q) return;
      const words = q.split(' ').filter(Boolean);
      const matches = getArticles().filter(item => {
        const title = normalize(item.title), text = normalize(item.text);
        return title === q || title.includes(q) || text.includes(q) || words.every(word => text.includes(word));
      }).slice(0, 30);
      if (!matches.length) {
        if (empty) {
          empty.textContent = 'No matching stories found. Try the exact article name or a few keywords.';
          empty.style.display = 'block';
        }
        return;
      }
      matches.forEach(item => {
        const box = document.createElement('div');
        box.className = 'search-result';
        box.style.display = 'block';
        const title = document.createElement(item.href ? 'a' : 'strong');
        title.textContent = item.title;
        if (item.href) {
          title.href = item.href;
          title.style.cssText = 'color:#071426;text-decoration:none;font:800 19px Georgia;display:block;margin-bottom:7px;';
        }
        const snippet = document.createElement('div');
        snippet.textContent = item.text.slice(0, 260) + (item.text.length > 260 ? '…' : '');
        snippet.style.cssText = 'color:#46515c;font-size:13px;line-height:1.55;';
        box.appendChild(title);
        box.appendChild(snippet);
        results.appendChild(box);
      });
      results.style.display = 'block';
      results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    document.addEventListener('submit', function (event) {
      if (event.target === form) {
        event.preventDefault();
        event.stopImmediatePropagation();
        render(input.value);
      }
    }, true);
  }

  const data = {
    latest: {
      title: 'TOP STORIES — MONDAY SEPTEMBER 14, 2026',
      tag: 'Fresh Monday briefing • verified developments from Uganda and around the world',
      cards: [
        ['National • Education', 'Uganda schools reopen today for third term', 'The Ministry of Education and Sports has confirmed that third term starts today, Monday September 14, for schools following the national/public curriculum. The 82-day term ends December 4.', 'September 14, 2026 • Ministry of Education / UG Standard'],
        ['National • Health', 'Government orders mandatory 21-day quarantine for students travelling from DRC', 'Uganda has ordered mandatory 21-day quarantine for students travelling from the Democratic Republic of Congo as health authorities maintain precautionary monitoring.', 'September 13, 2026 • Daily Monitor'],
        ['National • Tooro', 'King Oyo buried as Edward Rukidi Kijanangoma assumes the Tooro throne', 'King Oyo was buried at the Karambi Royal Tombs on September 12, while Edward Rukidi Kijanangoma formally assumed the throne amid a continuing succession dispute.', 'September 12–13, 2026 • Reuters / AP'],
        ['Mbale • Eastern Uganda', 'Mbale begins a new week with education, enterprise and tourism in focus', 'The return of schools, local enterprise, hospitality and tourism activity are among the issues shaping Mbale and the wider Eastern Uganda business week.', 'September 14, 2026 • Mbale Desk'],
        ['Sports • Uganda Cricket', 'Cricket Cranes continue strong Kigali run', 'Uganda’s cricket side has continued its strong regional campaign in Kigali, adding momentum to its continental ambitions.', 'September 12–13, 2026 • Daily Monitor / cricket coverage'],
        ['Entertainment • Mbale', 'Joshua Baraka takes his music journey to Mbale', 'Joshua Baraka’s regional music journey brought him closer to Eastern Uganda fans as his B’rakaland/Keep Walking campaign continued.', 'September 11–13, 2026 • Pulse Uganda / BigEye'],
        ['Global • Red Sea', 'Yemen fighting intensifies as Houthi attacks raise shipping concerns', 'Fighting along Yemen’s Red Sea coast has intensified, while attacks affecting Saudi Arabia raise fresh concerns over shipping, energy supplies and oil markets.', 'September 13, 2026 • Associated Press']
      ]
    },
    mbale: {
      title: 'Mbale & Eastern Uganda', tag: 'Local stories first • Monday September 14 briefing', cards: [
        ['Mbale • Community', 'Schools reopen as Mbale families begin the new term', 'Learners, parents and schools across the region begin third term today, bringing renewed activity to schools, transport and local businesses.', 'September 14, 2026'],
        ['Eastern Uganda • Agriculture', 'Coffee and farm resilience remain key priorities', 'Farmers and value-chain actors continue focusing on production, good agronomic practices, reliable markets and climate resilience.', 'Monday regional briefing'],
        ['Mbale • Enterprise', 'Tourism and hospitality businesses look to a stronger visitor week', 'Local enterprises are positioning around tourism, culture, hospitality and visitor activity as Mbale continues building its regional profile.', 'September 2026'],
        ['Mbale • Agriculture', 'Mushroom farming gives women a new livelihood route', 'Women in Mbale are using controlled mushroom production to create income and support household needs.', 'September 8, 2026 • Daily Monitor']
      ]
    },
    national: {
      title: 'National News', tag: 'Uganda’s biggest verified developments', cards: [
        ['Education', 'Third term starts across Uganda today', 'National/public curriculum schools begin third term on September 14, with the official term running for 82 days to December 4.', 'September 14, 2026 • Ministry of Education'],
        ['Health', '21-day quarantine ordered for students travelling from DRC', 'The new precautionary measure forms part of Uganda’s continued public-health monitoring.', 'September 13, 2026 • Daily Monitor'],
        ['Wildlife', 'UWA launches 10-year lion recovery plan', 'The long-term plan aims to respond to declining lion numbers, including concerns in Ishasha.', 'September 13, 2026 • Daily Monitor'],
        ['Community Safety', 'Lightning kills footballer in Mpigi', 'A footballer was killed by lightning during preparations for a youth event, highlighting storm-safety concerns.', 'September 13, 2026 • Daily Monitor']
      ]
    },
    sports: {
      title: 'Sports', tag: 'Uganda, Eastern Uganda and international sport', cards: [
        ['Cricket • Uganda', 'Cricket Cranes continue strong Kigali run', 'Uganda’s cricket team has added another win to its regional campaign in Kigali.', 'September 12–13, 2026'],
        ['CAF • Uganda Football', 'Kitara eliminate Mogadishu City and book Al Ahly date', 'Kitara advanced in the CAF Confederation Cup after eliminating Mogadishu City, setting up a major next-round test against Al Ahly.', 'September 13, 2026 • Kawowo Sports'],
        ['UG2O • Cricket', 'Tornado Bees’ batting blitz dominates Nile', 'Tornado Bees produced a powerful batting display in the UG2O competition as early wickets shaped the contest.', 'September 13, 2026 • Kawowo Sports'],
        ['Premier League', 'Arsenal beat Sunderland 2–0 to maintain perfect start', 'Bruno Guimarães opened the scoring and Bukayo Saka added a late penalty as Arsenal maintained a perfect league start.', 'September 12, 2026 • Reuters']
      ]
    },
    entertainment: {
      title: 'Entertainment', tag: 'Music, culture, concerts and Uganda’s creative economy', cards: [
        ['Music • Mbale', 'Joshua Baraka takes his Keep Walking journey to Mbale', 'Baraka’s regional music journey connected him with Eastern Uganda fans in Mbale.', 'September 11–13, 2026 • Pulse Uganda'],
        ['Music • Uganda', 'Mesach Semakula prepares 50 Years of Greatness concert', 'The veteran musician is preparing a major concert celebrating five decades of his music journey.', 'September 12, 2026 • Nile Post'],
        ['Creative Industry', 'Sylvia Owori unveils plan to register and organise creatives', 'A nationwide organisation drive is being presented as an opportunity for creatives to demonstrate their contribution to Uganda’s economy.', 'September 12, 2026 • Uganda Radio Network'],
        ['Music • Uganda', 'Vinka’s concert proceeds support mothers and children', 'The singer has channelled proceeds from her live event towards support at Mulago National Referral Hospital.', 'September 10, 2026 • Nile Post']
      ]
    },
    global: {
      title: 'Global News', tag: 'International developments shaping markets, trade and communities', cards: [
        ['World • Yemen', 'Fighting in Yemen intensifies as Houthis attack Saudi Arabia', 'The escalation is increasing concerns over Red Sea shipping routes, energy infrastructure and global oil supplies.', 'September 13, 2026 • AP'],
        ['Africa • Libya', 'US-backed Libya initiative seeks to bridge political divide', 'A new diplomatic push is seeking to reunify Libya while facing questions over representation and the UN-led process.', 'September 13, 2026 • Le Monde'],
        ['Africa • Environment', 'Conservation pressure grows across the continent', 'Researchers continue highlighting threats to wildlife from habitat pressure, weak data and environmental crime, while community conservation offers hope.', 'September 11–13, 2026 • Mongabay Africa'],
        ['Global • Markets', 'Energy security and shipping remain key economic risks', 'Regional tensions are keeping attention on oil, freight costs, insurance and inflation as the new week begins.', 'Monday global briefing • September 14, 2026']
      ]
    }
  };

  function renderSection(id, src) {
    const sec = document.getElementById(id);
    if (!sec) return;
    const head = sec.querySelector('.section-head');
    const grid = sec.querySelector('.news-grid');
    if (!head || !grid) return;
    const h2 = head.querySelector('h2');
    if (h2) h2.textContent = src.title;
    const tg = head.querySelector('.tagline');
    if (tg) tg.textContent = src.tag;
    grid.innerHTML = src.cards.map((c, i) => {
      const href = linkFor(c[1]);
      const external = /^https?:/.test(href);
      return '<article class="story ' + (i === 0 && src.cards.length > 4 ? 'wide' : '') + '">' +
        '<div class="story-body"><div class="kicker">' + c[0] + '</div><h3>' + c[1] + '</h3><p>' + c[2] + '</p><div class="meta">' + c[3] + '</div>' +
        '<a class="btn mbmd-full-link" href="' + (external ? href : BASE + href) + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>Read Full Story →</a></div></article>';
    }).join('');
  }

  function mondayRefresh() {
    const path = location.pathname;
    if (!(path.endsWith('/') || path.endsWith('/index.html'))) return;
    renderSection('latest', data.latest);
    renderSection('mbale', data.mbale);
    renderSection('national', data.national);
    renderSection('sports', data.sports);
    renderSection('entertainment', data.entertainment);
    renderSection('global', data.global);
    const ticker = document.querySelector('.ticker');
    if (ticker) ticker.innerHTML = '<strong>UPDATED</strong> September 14, 2026 • Monday Edition — fresh verified developments across every news desk.';
    const hero = document.querySelector('.hero h1');
    if (hero) hero.textContent = 'Monday News. Local Voices. Global Stories.';
  }

  function mountAI() {
    if (!document.body || document.getElementById('mbmd-ai-launcher')) return;
    const launcher = document.createElement('button');
    launcher.id = 'mbmd-ai-launcher'; launcher.type = 'button'; launcher.textContent = '💬 Chat With Us • Mbale Media AI';
    const panel = document.createElement('section');
    panel.id = 'mbmd-ai-panel'; panel.setAttribute('aria-label', 'Mbale Media AI chat');
    panel.innerHTML = '<div id="mbmd-ai-head"><div><strong>Mbale Media AI</strong><small>Ask about our news and website</small></div><button id="mbmd-ai-close" type="button" aria-label="Close">×</button></div><div id="mbmd-ai-messages"><div class="mbmd-ai-msg mbmd-ai-bot">Hello! 👋 I’m Mbale Media AI. Ask me about the story you are reading or Mbale Media Daily.</div></div><form id="mbmd-ai-form"><input id="mbmd-ai-input" autocomplete="off" placeholder="Ask a question…" aria-label="Your question"><button id="mbmd-ai-send" type="submit">Send</button></form>';
    document.body.appendChild(launcher); document.body.appendChild(panel);
    const messages = panel.querySelector('#mbmd-ai-messages'), input = panel.querySelector('#mbmd-ai-input'), send = panel.querySelector('#mbmd-ai-send'), form = panel.querySelector('#mbmd-ai-form');
    function addMessage(text, user) { const el = document.createElement('div'); el.className = 'mbmd-ai-msg ' + (user ? 'mbmd-ai-user' : 'mbmd-ai-bot'); el.textContent = text; messages.appendChild(el); messages.scrollTop = messages.scrollHeight; }
    launcher.addEventListener('click', () => { panel.style.display = panel.style.display === 'block' ? 'none' : 'block'; if (panel.style.display === 'block') input.focus(); });
    panel.querySelector('#mbmd-ai-close').addEventListener('click', () => panel.style.display = 'none');
    form.addEventListener('submit', async function (event) {
      event.preventDefault(); const question = input.value.trim(); if (!question || send.disabled) return;
      addMessage(question, true); input.value = ''; send.disabled = true;
      try {
        const main = document.querySelector('main'); const pageText = main ? main.innerText.slice(0, 12000) : document.body.innerText.slice(0, 12000);
        const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question, pageTitle: document.title, pageUrl: location.href, pageText }) });
        const result = await res.json(); if (!res.ok) throw new Error(result.error || 'AI unavailable'); addMessage(result.answer || 'I could not answer that right now.', false);
      } catch (error) { addMessage('I’m having trouble connecting right now. Please try again, or contact the Mbale Media Daily newsroom.', false); }
      finally { send.disabled = false; input.focus(); }
    });
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = '.mbmd-full-link{display:inline-block;margin-top:10px;background:#e4032e;color:#fff;text-decoration:none;padding:11px 16px;border-radius:5px;font-weight:900}.mbmd-full-link:hover{opacity:.9}#mbmd-ai-launcher{position:fixed;right:18px;bottom:18px;z-index:99999;border:0;border-radius:999px;background:#1677ff;color:#fff;padding:15px 20px;font:800 14px Arial,sans-serif;box-shadow:0 8px 24px #0005;cursor:pointer}#mbmd-ai-panel{position:fixed;right:18px;bottom:78px;width:min(380px,calc(100vw - 28px));height:min(560px,calc(100vh - 105px));z-index:100000;background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 18px 50px #0003;display:none;overflow:hidden;font-family:Arial,sans-serif}#mbmd-ai-head{background:#1677ff;color:#fff;padding:15px 16px;display:flex;align-items:center;justify-content:space-between}#mbmd-ai-head strong{font-size:15px}#mbmd-ai-head small{display:block;color:#eaf3ff;font-size:11px;margin-top:3px}#mbmd-ai-close{border:0;background:transparent;color:#fff;font-size:24px;cursor:pointer;line-height:1}#mbmd-ai-messages{height:calc(100% - 122px);overflow:auto;background:#f5f7fb;padding:14px}.mbmd-ai-msg{max-width:88%;margin:0 0 12px;padding:12px 14px;border-radius:14px;font-size:14px;line-height:1.45;white-space:pre-wrap}.mbmd-ai-bot{background:#fff;border:1px solid #e5e7eb;color:#182230}.mbmd-ai-user{margin-left:auto;background:#1677ff;color:#fff}#mbmd-ai-form{height:66px;display:flex;gap:8px;padding:10px;border-top:1px solid #e5e7eb;background:#fff}#mbmd-ai-input{flex:1;min-width:0;border:1px solid #cbd5e1;border-radius:9px;padding:10px;font-size:14px;outline:none}#mbmd-ai-send{border:0;border-radius:9px;background:#1677ff;color:#fff;padding:0 15px;font-weight:800;cursor:pointer}@media(max-width:600px){#mbmd-ai-panel{right:8px;bottom:70px;width:calc(100vw - 16px);height:calc(100vh - 90px);border-radius:14px}#mbmd-ai-launcher{right:10px;bottom:14px;padding:15px 17px;font-size:13px}}';
    document.head.appendChild(style);
  }

  setupSearch();
  mondayRefresh();
  injectStyles();
  mountAI();
})();
