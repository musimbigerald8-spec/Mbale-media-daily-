/* Mbale Media Daily — mobile menu + continuous breaking ticker v5 */
(function(){
'use strict';
function menu(){
  var b=document.getElementById('menuToggle'),n=document.getElementById('navLinks');
  if(!b||!n)return false;
  if(b.dataset.mbmdV5==='1')return true;
  /* Replace the button so older menu-fix scripts cannot fire a second toggle. */
  var fresh=b.cloneNode(true);
  fresh.dataset.mbmdV5='1';
  b.parentNode.replaceChild(fresh,b);
  b=fresh;
  b.type='button';
  b.setAttribute('aria-controls','navLinks');
  b.setAttribute('aria-expanded','false');
  b.setAttribute('aria-haspopup','true');
  function open(){
    n.classList.add('open');
    n.style.setProperty('display','grid','important');
    n.style.setProperty('visibility','visible','important');
    n.style.setProperty('opacity','1','important');
    b.setAttribute('aria-expanded','true');
    b.innerHTML='✕ &nbsp; CLOSE';
  }
  function close(){
    n.classList.remove('open');
    n.style.removeProperty('display');
    n.style.removeProperty('visibility');
    n.style.removeProperty('opacity');
    b.setAttribute('aria-expanded','false');
    b.innerHTML='☰ &nbsp; MENU';
  }
  b.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    if(n.classList.contains('open'))close();else open();
  },false);
  n.addEventListener('click',function(e){
    if(e.target.closest&&e.target.closest('a'))close();
  },false);
  document.addEventListener('click',function(e){
    if(n.classList.contains('open')&&!n.contains(e.target)&&e.target!==b)close();
  },false);
  window.addEventListener('resize',function(){if(window.innerWidth>850)close();},false);
  return true;
}
function ticker(){
  var t=document.querySelector('.ticker-track');
  if(!t||t.dataset.mbmdV5==='1')return false;
  t.dataset.mbmdV5='1';
  Array.prototype.slice.call(t.children).forEach(function(x){t.appendChild(x.cloneNode(true));});
  t.style.animation='mbmdTickerV5 30s linear infinite';
  return true;
}
function go(){
  var s=document.createElement('style');
  s.textContent='@keyframes mbmdTickerV5{from{transform:translateX(0)}to{transform:translateX(-50%)}}.ticker-track{will-change:transform!important}@media(max-width:850px){.nav-mobile{position:relative!important;z-index:99999!important}.nav-mobile button{position:relative!important;z-index:100000!important;pointer-events:auto!important;touch-action:manipulation!important;cursor:pointer!important}.nav-links.open{display:grid!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:99999!important;max-height:none!important}.ticker-track{animation-duration:24s!important}}';
  document.head.appendChild(s);
  menu();ticker();
  var i=0,t=setInterval(function(){menu();ticker();if(++i>20)clearInterval(t);},250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go,{once:true});else go();
})();
