/* Mbale Media Daily — mobile menu + continuous breaking ticker v7 + Eastlink advert + Editor Desk */
(function(){
'use strict';
function editorDesk(){
  var n=document.getElementById('navLinks');
  if(!n)return false;
  if(n.querySelector('a[data-editor-desk="1"]')||n.querySelector('a[href="editor.html"]'))return true;
  var a=document.createElement('a');
  a.href='editor.html';
  a.textContent='Editor Desk';
  a.setAttribute('data-editor-desk','1');
  n.appendChild(a);
  return true;
}
function menu(){
  var b=document.getElementById('menuToggle'),n=document.getElementById('navLinks');
  if(!b||!n)return false;
  if(b.dataset.mbmdV6==='1')return true;
  var fresh=b.cloneNode(true); fresh.dataset.mbmdV6='1'; b.parentNode.replaceChild(fresh,b); b=fresh;
  b.type='button'; b.setAttribute('aria-controls','navLinks'); b.setAttribute('aria-expanded','false'); b.setAttribute('aria-haspopup','true');
  function open(){n.classList.add('open');n.style.setProperty('display','grid','important');n.style.setProperty('visibility','visible','important');n.style.setProperty('opacity','1','important');b.setAttribute('aria-expanded','true');b.innerHTML='✕ &nbsp; CLOSE';}
  function close(){n.classList.remove('open');n.style.removeProperty('display');n.style.removeProperty('visibility');n.style.removeProperty('opacity');b.setAttribute('aria-expanded','false');b.innerHTML='☰ &nbsp; MENU';}
  b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(n.classList.contains('open'))close();else open();},false);
  n.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('a'))close();},false);
  document.addEventListener('click',function(e){if(n.classList.contains('open')&&!n.contains(e.target)&&e.target!==b)close();},false);
  window.addEventListener('resize',function(){if(window.innerWidth>850)close();},false);
  return true;
}
function ticker(){var t=document.querySelector('.ticker-track');if(!t||t.dataset.mbmdV6==='1')return false;t.dataset.mbmdV6='1';Array.prototype.slice.call(t.children).forEach(function(x){t.appendChild(x.cloneNode(true));});t.style.animation='mbmdTickerV6 30s linear infinite';return true;}
function advert(){
  if(document.getElementById('mbmd-eastlink-ad'))return true;
  var anchor=document.querySelector('.ticker, .breaking-news, .news-ticker, .hero, main');
  if(!anchor)return false;
  var wrap=document.createElement('section');wrap.id='mbmd-eastlink-ad';
  wrap.setAttribute('aria-label','Advertisement — Eastlink Training Institute');
  wrap.innerHTML='<div class="mbmd-ad-box"><div class="mbmd-ad-label">ADVERTISEMENT</div><a class="mbmd-ad-poster" href="tel:+256768363821" aria-label="Call Eastlink Training Institute"><img src="assets/eastlink-ad.jpg" alt="Eastlink Training Institute — Apply Now" loading="eager"></a><div class="mbmd-ad-info"><h2>Eastlink Training Institute</h2><p><strong>Powering Employability</strong></p><p>Certificate &amp; Diploma courses available in Tailoring, Hairdressing &amp; Beauty, Information Technology, Journalism &amp; Media Studies, Business Administration &amp; Management, Tourism &amp; Hospitality, Records &amp; Information Management, Public Relations, Electrical Installations and Public Administration.</p><p><strong>UVTAB examined • Hostels available</strong></p><p class="mbmd-ad-location">Mbale City, Kumi Road in Namakwekwe, behind Total Petrol Station next to Mbale Church of Christ.</p><div class="mbmd-ad-actions"><a href="tel:+256768363821">CALL +256 768 363821</a><a href="tel:+256200904854">CALL +256 200 904854</a></div></div></div>';
  anchor.parentNode.insertBefore(wrap,anchor.nextSibling);
  return true;
}
function go(){
  var s=document.createElement('style');
  s.textContent='@keyframes mbmdTickerV6{from{transform:translateX(0)}to{transform:translateX(-50%)}}.ticker-track{will-change:transform!important}@media(max-width:850px){.nav-mobile{position:relative!important;z-index:99999!important}.nav-mobile button{position:relative!important;z-index:100000!important;pointer-events:auto!important;touch-action:manipulation!important;cursor:pointer!important}.nav-links.open{display:grid!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:99999!important;max-height:none!important}.ticker-track{animation-duration:24s!important}}#mbmd-eastlink-ad{width:100%;box-sizing:border-box;margin:18px auto;max-width:1180px;padding:0 12px;font-family:Arial,sans-serif}.mbmd-ad-box{display:grid;grid-template-columns:minmax(280px,430px) 1fr;gap:22px;align-items:center;border:2px solid #174ea6;border-radius:14px;background:#fff;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.12)}.mbmd-ad-label{grid-column:1/-1;background:#174ea6;color:#fff;font-weight:800;font-size:12px;letter-spacing:1px;text-align:center;padding:7px}.mbmd-ad-poster{display:block;padding:12px}.mbmd-ad-poster img{display:block;width:100%;height:auto;max-height:600px;object-fit:contain;border-radius:8px}.mbmd-ad-info{padding:18px 22px}.mbmd-ad-info h2{margin:0 0 5px;font-size:28px;text-transform:uppercase;color:#174ea6}.mbmd-ad-info p{font-size:16px;line-height:1.5;margin:9px 0}.mbmd-ad-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:15px}.mbmd-ad-actions a{display:inline-block;background:#e31b23;color:#fff;text-decoration:none;font-weight:800;border-radius:8px;padding:12px 14px}.mbmd-ad-location{font-size:14px!important}@media(max-width:700px){#mbmd-eastlink-ad{padding:0 6px;margin:12px auto}.mbmd-ad-box{display:block;border-radius:10px}.mbmd-ad-label{padding:6px}.mbmd-ad-poster{padding:7px}.mbmd-ad-poster img{max-height:none;width:100%}.mbmd-ad-info{padding:14px}.mbmd-ad-info h2{font-size:22px}.mbmd-ad-info p{font-size:14px}.mbmd-ad-actions{display:grid;grid-template-columns:1fr}.mbmd-ad-actions a{text-align:center}}';
  document.head.appendChild(s);
  editorDesk();menu();ticker();advert();
  var i=0,t=setInterval(function(){editorDesk();menu();ticker();advert();if(++i>30)clearInterval(t);},250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go,{once:true});else go();
})();
