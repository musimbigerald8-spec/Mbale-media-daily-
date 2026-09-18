/* Mbale Media Daily — mobile homepage polish + overflow fix */
(function(){'use strict';
  function apply(){
    if(document.getElementById('mbmd-mobile-fix-style')) return;
    const style=document.createElement('style');
    style.id='mbmd-mobile-fix-style';
    style.textContent=`
      html,body{max-width:100%;overflow-x:hidden!important}
      .featured img{object-fit:cover!important;object-position:center center!important}
      @media(max-width:850px){
        .topbar{box-shadow:0 2px 14px rgba(0,0,0,.28)!important}
        .topbar-inner{min-width:0!important;max-width:100%!important;padding-left:12px!important;padding-right:12px!important}
        .brand{min-width:0!important;max-width:calc(100vw - 75px)!important}
        .brand img{flex:0 0 auto!important}
        .brand-name{min-width:0!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;font-size:18px!important}
        .tools{flex:0 0 auto!important;gap:6px!important}
        .tools button,.tools a{min-width:38px!important;min-height:38px!important}
        .ticker{width:100%!important;max-width:100vw!important;overflow:hidden!important;border-radius:0!important;display:flex!important}
        .ticker-label{flex:0 0 112px!important;width:112px!important;min-width:112px!important;z-index:3!important;padding:0 9px!important;overflow:hidden!important}
        .ticker-track{min-width:0!important;flex:1 1 auto!important;width:calc(100% - 112px)!important;max-width:calc(100% - 112px)!important;overflow:hidden!important;animation:ticker 24s linear infinite!important;padding-left:10px!important;gap:55px!important}
        .ticker-track span{display:inline-block!important;overflow:visible!important;text-overflow:clip!important;white-space:nowrap!important;min-width:max-content!important}
        .container{width:100%!important;max-width:100%!important;overflow:hidden!important;padding-left:12px!important;padding-right:12px!important}
        .hero{display:grid!important;grid-template-columns:minmax(0,1fr)!important;width:100%!important;max-width:100%!important;gap:12px!important}
        .featured{width:100%!important;max-width:100%!important;height:390px!important;min-width:0!important;border-radius:14px!important;overflow:hidden!important;box-shadow:0 10px 30px rgba(0,0,0,.28)!important;background:#101619 url('https://upload.wikimedia.org/wikipedia/commons/0/0c/KampalaSkyline.jpg') center center/cover no-repeat!important}
        .featured img{width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;filter:saturate(1.08) contrast(1.03)!important;position:relative!important;z-index:0!important}
        .featured:after{background:linear-gradient(180deg,rgba(0,0,0,.02) 12%,rgba(0,0,0,.08) 38%,rgba(0,0,0,.78) 100%)!important}
        .featured-content{left:18px!important;right:18px!important;bottom:18px!important;max-width:calc(100% - 36px)!important;overflow:hidden!important}
        .featured .category{display:inline-block!important;background:rgba(228,3,46,.94)!important;color:#fff!important;border-radius:999px!important;padding:5px 9px!important;font-size:10px!important;font-weight:900!important;letter-spacing:.35px!important;margin-bottom:8px!important}
        .featured h1{font-size:28px!important;line-height:1.06!important;letter-spacing:-.45px!important;overflow-wrap:anywhere!important;word-break:normal!important;text-shadow:0 2px 8px rgba(0,0,0,.45)!important}
        .featured p{font-size:12px!important;line-height:1.45!important;margin-top:8px!important;display:-webkit-box!important;-webkit-line-clamp:3!important;-webkit-box-orient:vertical!important;overflow:hidden!important}
        .featured .byline{font-size:10px!important;opacity:.9!important;margin-top:8px!important}
        .side-stories{display:grid!important;grid-template-columns:minmax(0,1fr)!important;grid-template-rows:none!important;width:100%!important;max-width:100%!important;gap:10px!important}
        .side-story{width:100%!important;max-width:100%!important;min-width:0!important;grid-template-columns:105px minmax(0,1fr)!important;gap:12px!important;padding:10px!important;border-radius:12px!important;background:#0d1519!important;box-shadow:0 5px 18px rgba(0,0,0,.18)!important}
        .side-story img{width:105px!important;height:82px!important;max-width:105px!important;object-fit:cover!important;border-radius:9px!important}
        .side-copy{min-width:0!important;overflow:hidden!important}
        .side-copy h2{font-size:15px!important;line-height:1.16!important;margin:0!important}
        .side-copy p{font-size:11px!important;line-height:1.35!important;margin-top:5px!important;display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;overflow:hidden!important}
        .side-copy h2,.side-copy p{overflow-wrap:anywhere!important}
        .trending{max-width:100%!important;margin-top:14px!important}
        .news-grid,.split{width:100%!important;max-width:100%!important;grid-template-columns:minmax(0,1fr)!important}
        .section-head{gap:10px!important}
        .section-head h2{font-size:22px!important;line-height:1.1!important}
        .card,.story,.list-panel,.side-panel{min-width:0!important;max-width:100%!important;border-radius:12px!important;overflow:hidden!important}
        .footer{max-width:100%!important;overflow:hidden!important}
        .footer-top{max-width:100%!important}
        .nav-links{max-width:100%!important;overflow:hidden!important}
      }
    `;
    document.head.appendChild(style);

    // Use a stable Wikimedia upload URL so the Kampala image works on both GitHub Pages and Vercel.
    const hero=document.querySelector('.featured');
    if(hero){
      const img=hero.querySelector('img');
      const kampala='https://upload.wikimedia.org/wikipedia/commons/0/0c/KampalaSkyline.jpg';
      if(img){
        img.src=kampala;
        img.alt='Kampala City skyline, Uganda';
        img.loading='eager';
        img.decoding='async';
        img.style.objectFit='cover';
        img.style.objectPosition='center center';
        img.onerror=function(){this.style.display='none';};
      }
      hero.style.backgroundImage="url('"+kampala+"')";
      hero.style.backgroundPosition='center center';
      hero.style.backgroundSize='cover';
      hero.style.backgroundRepeat='no-repeat';
      const cat=hero.querySelector('.category');
      if(cat)cat.textContent='Kampala City • Uganda';
      const h=hero.querySelector('h1');
      if(h)h.textContent="Kampala City — Uganda's Capital in Focus";
    }

    // Keep the newsroom links visible: Journalist submits stories to the Editor Desk.
    const mainNav=document.querySelector('.main-nav');
    if(mainNav){
      if(!mainNav.querySelector('a[href="journalist.html"]')){
        const j=document.createElement('a'); j.href='journalist.html'; j.textContent='Journalist'; j.className='editor-link'; mainNav.appendChild(j);
      }
      if(!mainNav.querySelector('a[href="editor.html"]')){
        const e=document.createElement('a'); e.href='editor.html'; e.textContent='Editor Desk'; e.className='editor-link'; mainNav.appendChild(e);
      }
    }
    const mobileNav=document.getElementById('navLinks');
    if(mobileNav){
      if(!mobileNav.querySelector('a[href="journalist.html"]')){
        const j=document.createElement('a'); j.href='journalist.html'; j.textContent='Journalist'; j.className='editor-link'; mobileNav.appendChild(j);
      }
      if(!mobileNav.querySelector('a[href="editor.html"]')){
        const e=document.createElement('a'); e.href='editor.html'; e.textContent='Editor Desk'; e.className='editor-link'; mobileNav.appendChild(e);
      }
    }
    const floating=document.getElementById('mbmd-public-private-links');
    if(floating)floating.remove();
    document.querySelectorAll('body > div').forEach(el=>{if(/Careers|Editors/.test(el.textContent||'')&&el.querySelector('a[href="editors"]'))el.remove()});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
