/* Mbale Media Daily — mobile menu v2: works on cached Google/mobile loads */
(function(){
  'use strict';
  function bind(){
    var button=document.getElementById('menuToggle');
    var links=document.getElementById('navLinks');
    if(!button||!links)return false;
    if(button.dataset.mbmdMenuV2==='1')return true;
    button.dataset.mbmdMenuV2='1';
    button.type='button';
    button.setAttribute('aria-controls','navLinks');
    button.setAttribute('aria-expanded','false');
    function openMenu(){
      links.classList.add('open');
      links.style.display='grid';
      button.setAttribute('aria-expanded','true');
      button.innerHTML='✕ &nbsp; CLOSE';
    }
    function closeMenu(){
      links.classList.remove('open');
      links.style.display='';
      button.setAttribute('aria-expanded','false');
      button.innerHTML='☰ &nbsp; MENU';
    }
    button.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      if(links.classList.contains('open')) closeMenu(); else openMenu();
    },false);
    links.addEventListener('click',function(e){
      var a=e.target.closest ? e.target.closest('a') : null;
      if(a) closeMenu();
    },false);
    document.addEventListener('click',function(e){
      if(links.classList.contains('open') && !links.contains(e.target) && e.target!==button) closeMenu();
    },false);
    window.addEventListener('resize',function(){if(window.innerWidth>850)closeMenu();},false);
    return true;
  }
  function start(){
    if(bind())return;
    var observer=new MutationObserver(function(){if(bind())observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(function(){observer.disconnect();bind();},5000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
