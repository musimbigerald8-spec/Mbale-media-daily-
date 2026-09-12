(function () {
  'use strict';
  if (window.__MBMD_AI_LOADED) return;
  window.__MBMD_AI_LOADED = true;

  const ENDPOINT = window.MBMD_AI_ENDPOINT || '';
  const style = document.createElement('style');
  style.textContent = `
    #mbmd-ai-launcher{position:fixed;right:18px;bottom:18px;z-index:9998;border:0;border-radius:999px;background:#e4032e;color:#fff;padding:14px 18px;font:800 14px Arial,sans-serif;box-shadow:0 8px 24px #0004;cursor:pointer}
    #mbmd-ai-panel{position:fixed;right:18px;bottom:78px;width:min(380px,calc(100vw - 28px));height:min(560px,calc(100vh - 105px));z-index:9999;background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 18px 50px #0003;display:none;overflow:hidden;font-family:Arial,sans-serif}
    #mbmd-ai-head{background:#071426;color:#fff;padding:15px 16px;display:flex;align-items:center;justify-content:space-between}
    #mbmd-ai-head strong{font-size:15px}#mbmd-ai-head small{display:block;color:#dce3eb;font-size:11px;margin-top:3px}
    #mbmd-ai-close{border:0;background:transparent;color:#fff;font-size:24px;cursor:pointer;line-height:1}
    #mbmd-ai-messages{height:calc(100% - 126px);overflow:auto;padding:14px;background:#f5f6f8}
    .mbmd-ai-msg{max-width:86%;padding:10px 12px;border-radius:12px;margin:8px 0;font-size:14px;line-height:1.5;white-space:pre-wrap}
    .mbmd-ai-bot{background:#fff;color:#17202a;border:1px solid #e5e7eb}.mbmd-ai-user{margin-left:auto;background:#e4032e;color:#fff}
    #mbmd-ai-form{height:70px;padding:10px;background:#fff;border-top:1px solid #e5e7eb;display:flex;gap:7px}
    #mbmd-ai-input{flex:1;min-width:0;border:1px solid #cbd5e1;border-radius:9px;padding:10px;font-size:14px;outline:none}
    #mbmd-ai-send{border:0;border-radius:9px;background:#071426;color:#fff;padding:0 15px;font-weight:800;cursor:pointer}
    #mbmd-ai-send:disabled{opacity:.5;cursor:wait}
    @media(max-width:600px){#mbmd-ai-panel{right:8px;bottom:70px;width:calc(100vw - 16px);height:calc(100vh - 90px);border-radius:14px}#mbmd-ai-launcher{right:10px;bottom:10px}}
  `;
  document.head.appendChild(style);

  const launcher = document.createElement('button');
  launcher.id = 'mbmd-ai-launcher';
  launcher.type = 'button';
  launcher.textContent = '💬 Chat with Mbale Media AI';
  launcher.setAttribute('aria-label', 'Chat with Mbale Media AI');

  const panel = document.createElement('section');
  panel.id = 'mbmd-ai-panel';
  panel.setAttribute('aria-label', 'Mbale Media AI chat');
  panel.innerHTML = `
    <div id="mbmd-ai-head"><div><strong>Mbale Media AI</strong><small>Ask about our news and website</small></div><button id="mbmd-ai-close" type="button" aria-label="Close chat">×</button></div>
    <div id="mbmd-ai-messages"><div class="mbmd-ai-msg mbmd-ai-bot">Hello! 👋 I’m Mbale Media AI. Ask me about the story you are reading or Mbale Media Daily.</div></div>
    <form id="mbmd-ai-form"><input id="mbmd-ai-input" autocomplete="off" placeholder="Ask a question…" aria-label="Your question"><button id="mbmd-ai-send" type="submit">Send</button></form>
  `;
  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const messages = panel.querySelector('#mbmd-ai-messages');
  const input = panel.querySelector('#mbmd-ai-input');
  const send = panel.querySelector('#mbmd-ai-send');
  const form = panel.querySelector('#mbmd-ai-form');

  function addMessage(text, user) {
    const el = document.createElement('div');
    el.className = 'mbmd-ai-msg ' + (user ? 'mbmd-ai-user' : 'mbmd-ai-bot');
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  launcher.addEventListener('click', function () {
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    if (panel.style.display === 'block') input.focus();
  });
  panel.querySelector('#mbmd-ai-close').addEventListener('click', function () { panel.style.display = 'none'; });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || send.disabled) return;
    addMessage(question, true);
    input.value = '';
    send.disabled = true;

    if (!ENDPOINT) {
      addMessage('The AI connection is being completed. Please try again shortly, or use our Contact page to reach the newsroom.', false);
      send.disabled = false;
      return;
    }

    try {
      const main = document.querySelector('main');
      const pageText = main ? main.innerText.slice(0, 12000) : document.body.innerText.slice(0, 12000);
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: question, pageTitle: document.title, pageUrl: location.href, pageText: pageText})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'AI unavailable');
      addMessage(data.answer || 'I could not answer that right now.', false);
    } catch (error) {
      addMessage('I’m having trouble connecting right now. Please try again, or contact the Mbale Media Daily newsroom.', false);
    } finally {
      send.disabled = false;
      input.focus();
    }
  });
})();
