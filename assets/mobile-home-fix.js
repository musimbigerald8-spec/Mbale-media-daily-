/* Mbale Media Daily — mobile homepage overflow fix */
(function(){'use strict';
  function apply(){
    if(document.getElementById('mbmd-mobile-fix-style')) return;
    const style=document.createElement('style');
    style.id='mbmd-mobile-fix-style';
    style.textContent=`
      html,body{max-width:100%;overflow-x:hidden!important}
      @media(max-width:850px){
        .topbar-inner{min-width:0!important;max-width:100%!important}
        .brand{min-width:0!important;max-width:calc(100vw - 75px)!important}
        .brand img{flex:0 0 auto!important}
        .brand-name{min-width:0!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;font-size:18px!important}
        .tools{flex:0 0 auto!important}
        .ticker{width:100%!important;max-width:100vw!important;overflow:hidden!important}
        .ticker-label{flex:0 0 auto!important;z-index:2!important}
        .ticker-track{min-width:max-content!important}
        .container{width:100%!important;max-width:100%!important;overflow:hidden!important;padding-left:0!important;padding-right:0!important}
        .hero{display:grid!important;grid-template-columns:minmax(0,1fr)!important;width:100%!important;max-width:100%!important;gap:10px!important}
        .featured{width:100%!important;max-width:100%!important;height:360px!important;min-width:0!important}
        .featured-content{max-width:100%!important;overflow:hidden!important}
        .featured h1{font-size:31px!important;overflow-wrap:anywhere!important;word-break:normal!important}
        .side-stories{display:grid!important;grid-template-columns:minmax(0,1fr)!important;grid-template-rows:none!important;width:100%!important;max-width:100%!important;gap:10px!important}
        .side-story{width:100%!important;max-width:100%!important;min-width:0!important;grid-template-columns:105px minmax(0,1fr)!important}
        .side-story img{width:105px!important;max-width:105px!important}
        .side-copy{min-width:0!important;overflow:hidden!important}
        .side-copy h2,.side-copy p{overflow-wrap:anywhere!important}
        .trending{max-width:100%!important}
        .news-grid,.split{width:100%!important;max-width:100%!important;grid-template-columns:minmax(0,1fr)!important}
        .card,.story,.list-panel,.side-panel{min-width:0!important;max-width:100%!important}
        .footer{max-width:100%!important;overflow:hidden!important}
        .footer-top{max-width:100%!important}
        .nav-links{max-width:100%!important;overflow:hidden!important}
      }
    `;
    document.head.appendChild(style);
    // The public site should not expose private newsroom controls.
    document.querySelectorAll('a[href="journalist.html"],a[href^="journalist.html?"],a[href="editor.html"],a[href="editors"],a[href="careers"]').forEach(a=>a.remove());
    document.querySelectorAll('.main-nav a').forEach(a=>{if(/journalist|editor desk/i.test(a.textContent))a.remove()});
    const floating=document.getElementById('mbmd-public-private-links');
    if(floating)floating.remove();
    document.querySelectorAll('body > div').forEach(el=>{if(/Careers|Editors/.test(el.textContent||'')&&el.querySelector('a[href="editors"]'))el.remove()});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
