/* Mbale Media Daily — mobile interaction and continuous ticker fix */
(function(){
  'use strict';
  function initMenu(){
    var button=document.getElementById('menuToggle');
    var links=document.getElementById('navLinks');
    if(!button||!links||button.dataset.mbmdInteraction==='1') return false;
    button.dataset.mbmdInteraction='1';
    button.type='button';
    button.setAttribute('aria-controls','navLinks');
    button.setAttribute('aria-expanded','false');
    function setOpen(open){
      links.classList.toggle('open',open);
      links.style.display=open?'grid':'';
      button.setAttribute('aria-expanded',open?'true':'false');
      button.textContent=open?'✕  CLOSE':'☰  MENU';
    }
    button.onclick=function(e){e.preventDefault();e.stopPropagation();setOpen(!links.classList.contains('open'));};
    links.onclick=function(e){if(e.target.closest&&e.target.closest('a'))setOpen(false);};
    document.addEventListener('click',function(e){if(links.classList.contains('open')&&e.target!==button&&!links.contains(e.target))setOpen(false);});
    window.addEventListener('resize',function(){if(window.innerWidth>850)setOpen(false);});
    return true;
  }
  function initTicker(){
    var track=document.querySelector('.ticker-track');
    if(!track||track.dataset.mbmdTicker==='1') return false;
    track.dataset.mbmdTicker='1';
    var items=Array.prototype.slice.call(track.children);
    if(!items.length)return true;
    var first=items.map(function(x){return x.cloneNode(true);});
    first.forEach(function(x){track.appendChild(x);});
    track.style.animation='none';
    track.offsetHeight;
    track.style.animation='mbmdTickerContinuous 32s linear infinite';
    return true;
  }
  function start(){
    initMenu();initTicker();
    var observer=new MutationObserver(function(){initMenu();initTicker();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(function(){observer.disconnect();initMenu();initTicker();},6000);
  }
  function go(){
    var style=document.createElement('style');
    style.textContent='@keyframes mbmdTickerContinuous{from{transform:translateX(0)}to{transform:translateX(-50%)}} .ticker-track{will-change:transform;} @media(max-width:850px){.ticker-track{animation-duration:24s!important;}}';
    document.head.appendChild(style);start();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go,{once:true});else go();
})();
