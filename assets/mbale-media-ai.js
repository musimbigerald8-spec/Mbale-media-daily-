/* Mbale Media Daily — live Supabase news feed, search and AI chat */
(function () {
  'use strict';

  const PROJECT_URL = 'https://dwbgcaxwemrwheybdpya.supabase.co';
  const PUBLISHABLE_KEY = 'sb_publishable_WkkWUJF8ONyX4oS2nvGNFw_jdAob8M8';
  const AI_ENDPOINT = window.MBMD_AI_ENDPOINT || 'https://mbale-media-ai.vercel.app/api/chat';

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));

  const normalize = (text) => (text || '').toString().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[“”‘’'"`]/g, '').replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ').trim();

  function articleCard(story) {
    const image = story.image_url
      ? '<img src="' + esc(story.image_url) + '" alt="' + esc(story.title) + '" loading="lazy">'
      : '';
    const date = story.created_at ? new Date(story.created_at).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric'
    }) : '';
    return '<article class="story mbmd-live-story" data-news-id="' + esc(story.id) + '">' +
      image + '<div class="story-body">' +
      '<div class="kicker">' + esc(story.category || 'News') + (story.breaking ? ' • BREAKING' : '') + '</div>' +
      '<h3>' + esc(story.title) + '</h3>' +
      '<p>' + esc(story.excerpt || (story.content || '').slice(0, 240)) + '</p>' +
      '<div class="meta">' + esc(story.author || 'Mbale Media') + (date ? ' • ' + esc(date) : '') + '</div>' +
      '<button class="btn mbmd-read" type="button">Read Full Story →</button>' +
      '</div></article>';
  }

  function mountModal() {
    if (document.getElementById('mbmd-story-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'mbmd-story-modal';
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.72);padding:18px;overflow:auto;';
    modal.innerHTML = '<div style="max-width:850px;margin:30px auto;background:#fff;border-radius:12px;padding:26px;position:relative;box-shadow:0 20px 60px #0008"><button id="mbmd-modal-close" type="button" style="position:absolute;right:14px;top:10px;border:0;background:#071426;color:#fff;border-radius:50%;width:38px;height:38px;font-size:24px;cursor:pointer">×</button><div id="mbmd-modal-content"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    modal.querySelector('#mbmd-modal-close').addEventListener('click', () => { modal.style.display = 'none'; });
  }

  function showStory(story) {
    mountModal();
    const modal = document.getElementById('mbmd-story-modal');
    const box = document.getElementById('mbmd-modal-content');
    const paragraphs = String(story.content || story.excerpt || '').split(/\n+/).filter(Boolean)
      .map(p => '<p style="font-size:16px;line-height:1.8;color:#46515c">' + esc(p) + '</p>').join('');
    box.innerHTML = '<div class="kicker">' + esc(story.category || 'News') + '</div><h1 style="font:700 38px/1.1 Georgia;color:#071426;margin:10px 0 14px">' + esc(story.title) + '</h1>' +
      (story.image_url ? '<img src="' + esc(story.image_url) + '" alt="" style="width:100%;max-height:430px;object-fit:cover;border-radius:8px;margin:8px 0 18px">' : '') +
      '<div style="font-size:12px;color:#667085;margin-bottom:18px">By ' + esc(story.author || 'Mbale Media') + '</div>' + paragraphs;
    modal.style.display = 'block';
  }

  async function fetchNews() {
    const url = PROJECT_URL + '/rest/v1/news?select=id,title,excerpt,content,image_url,category,author,featured,breaking,published,created_at&published=eq.true&order=created_at.desc&limit=60';
    const response = await fetch(url, {
      headers: { apikey: PUBLISHABLE_KEY, Authorization: 'Bearer ' + PUBLISHABLE_KEY }
    });
    if (!response.ok) throw new Error('News feed request failed: ' + response.status);
    return response.json();
  }

  function insertIntoSection(id, stories) {
    const sec = document.getElementById(id);
    if (!sec || !stories.length) return;
    const grid = sec.querySelector('.news-grid');
    if (!grid) return;
    grid.querySelectorAll('.mbmd-live-story').forEach(el => el.remove());
    grid.insertAdjacentHTML('afterbegin', stories.map(articleCard).join(''));
  }

  function wireReadButtons(stories) {
    const byId = new Map(stories.map(s => [String(s.id), s]));
    document.querySelectorAll('.mbmd-read').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('[data-news-id]')?.getAttribute('data-news-id');
        const story = byId.get(String(id));
        if (story) showStory(story);
      });
    });
  }

  async function loadLiveNews() {
    if (!document.querySelector('.news-grid')) return;
    try {
      const stories = await fetchNews();
      if (!Array.isArray(stories) || !stories.length) return;

      const latest = stories.slice(0, 8);
      const groups = { mbale: [], national: [], sports: [], entertainment: [], global: [] };
      stories.forEach(s => {
        const c = normalize(s.category);
        if (c.includes('sport')) groups.sports.push(s);
        else if (c.includes('entertain')) groups.entertainment.push(s);
        else if (c.includes('global') || c.includes('international')) groups.global.push(s);
        else if (c.includes('national')) groups.national.push(s);
        else if (c.includes('local') || c.includes('mbale') || c.includes('eastern')) groups.mbale.push(s);
      });

      insertIntoSection('latest', latest);
      insertIntoSection('mbale', groups.mbale.slice(0, 6));
      insertIntoSection('national', groups.national.slice(0, 6));
      insertIntoSection('sports', groups.sports.slice(0, 6));
      insertIntoSection('entertainment', groups.entertainment.slice(0, 6));
      insertIntoSection('global', groups.global.slice(0, 6));
      wireReadButtons(stories);

      const latestHeading = document.querySelector('#latest .section-head h2');
      if (latestHeading) latestHeading.textContent = 'LATEST NEWS — SEPTEMBER 15, 2026';
      const ticker = document.querySelector('.ticker');
      if (ticker) ticker.innerHTML = '<strong>UPDATED</strong> September 15, 2026 • Latest news and verified developments for today.';
    } catch (error) {
      console.warn('Mbale Media live news feed:', error);
    }
  }

  function setupSearch() {
    const form = document.getElementById('searchForm');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const empty = document.getElementById('searchEmpty');
    if (!form || !input || !results) return;

    function getArticles() {
      const seen = new Set(), items = [];
      document.querySelectorAll('.story, .spotlight-card, article, [data-searchable]').forEach(el => {
        if (seen.has(el) || el.closest('#searchResults')) return;
        seen.add(el);
        const heading = el.querySelector('h1,h2,h3,h4,a');
        const title = heading ? heading.textContent.trim() : '';
        const text = el.innerText.trim();
        if (title || text) items.push({ title: title || text.slice(0, 100), text });
      });
      return items;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const q = normalize(input.value);
      results.innerHTML = '';
      results.style.display = 'none';
      if (empty) empty.style.display = 'none';
      if (!q) return;
      const words = q.split(' ').filter(Boolean);
      const matches = getArticles().filter(item => {
        const title = normalize(item.title), text = normalize(item.text);
        return title.includes(q) || text.includes(q) || words.every(word => text.includes(word));
      }).slice(0, 30);
      if (!matches.length) {
        if (empty) { empty.textContent = 'No matching stories found. Try another keyword.'; empty.style.display = 'block'; }
        return;
      }
      matches.forEach(item => {
        const box = document.createElement('div');
        box.className = 'search-result'; box.style.display = 'block';
        box.innerHTML = '<strong style="font:800 19px Georgia;display:block;margin-bottom:7px">' + esc(item.title) + '</strong><div style="color:#46515c;font-size:13px;line-height:1.55">' + esc(item.text.slice(0, 260)) + (item.text.length > 260 ? '…' : '') + '</div>';
        results.appendChild(box);
      });
      results.style.display = 'block';
      results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function mountAI() {
    if (!document.body || document.getElementById('mbmd-ai-launcher')) return;
    const launcher = document.createElement('button');
    launcher.id = 'mbmd-ai-launcher';
    launcher.type = 'button';
    launcher.textContent = '💬 Chat With Us • Mbale Media AI';
    launcher.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:9998;background:#e4032e;color:#fff;border:0;border-radius:999px;padding:13px 17px;font-weight:900;box-shadow:0 8px 25px #0004;cursor:pointer;';

    const panel = document.createElement('section');
    panel.id = 'mbmd-ai-panel';
    panel.setAttribute('aria-label', 'Mbale Media AI chat');
    panel.style.cssText = 'display:none;position:fixed;right:16px;bottom:70px;width:min(390px,calc(100vw - 32px));height:520px;z-index:9999;background:#fff;border-radius:14px;box-shadow:0 15px 50px #0005;overflow:hidden;border:1px solid #ddd;';
    panel.innerHTML = '<div style="background:#071426;color:#fff;padding:15px;display:flex;justify-content:space-between;align-items:center"><div><strong>Mbale Media AI</strong><small style="display:block;color:#dce3eb;margin-top:3px">Ask about our news and website</small></div><button id="mbmd-ai-close" type="button" style="background:transparent;color:#fff;border:0;font-size:26px">×</button></div><div id="mbmd-ai-messages" style="height:395px;overflow:auto;padding:14px;background:#f5f6f8"><div style="background:#fff;border-radius:10px;padding:11px;margin-bottom:8px">Hello! 👋 I’m Mbale Media AI. Ask me about Mbale Media Daily or a story.</div></div><form id="mbmd-ai-form" style="display:flex;gap:7px;padding:10px;border-top:1px solid #ddd"><input id="mbmd-ai-input" autocomplete="off" placeholder="Ask a question…" style="flex:1;padding:11px;border:1px solid #ccd3da;border-radius:7px"><button id="mbmd-ai-send" type="submit" style="background:#e4032e;color:#fff;border:0;border-radius:7px;padding:11px 14px;font-weight:800">Send</button></form>';
    document.body.appendChild(launcher); document.body.appendChild(panel);

    const messages = panel.querySelector('#mbmd-ai-messages');
    const input = panel.querySelector('#mbmd-ai-input');
    const send = panel.querySelector('#mbmd-ai-send');
    const form = panel.querySelector('#mbmd-ai-form');
    const addMessage = (text, user) => {
      const el = document.createElement('div');
      el.textContent = text;
      el.style.cssText = 'padding:11px;border-radius:10px;margin-bottom:8px;line-height:1.5;background:' + (user ? '#071426;color:#fff;margin-left:35px' : '#fff;color:#17202a;margin-right:20px') + ';white-space:pre-wrap;';
      messages.appendChild(el); messages.scrollTop = messages.scrollHeight;
      return el;
    };

    launcher.addEventListener('click', () => { panel.style.display = panel.style.display === 'block' ? 'none' : 'block'; if (panel.style.display === 'block') input.focus(); });
    panel.querySelector('#mbmd-ai-close').addEventListener('click', () => { panel.style.display = 'none'; });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const message = input.value.trim();
      if (!message) return;
      input.value = ''; send.disabled = true;
      addMessage(message, true);
      const pending = addMessage('Thinking…', false);
      try {
        const pageContext = document.body.innerText.slice(0, 12000);
        const response = await fetch(AI_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, pageContext }) });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'AI request failed.');
        pending.textContent = data.output_text || data.text || data.reply || data.message || data.output || 'I received your question, but no answer was returned.';
      } catch (error) { pending.textContent = 'Sorry, the AI connection is temporarily unavailable. Please try again.'; console.warn(error); }
      finally { send.disabled = false; }
    });
  }

  function init() {
    setupSearch();
    mountAI();
    loadLiveNews();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
