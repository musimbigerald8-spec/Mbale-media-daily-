/* Mbale Media Daily — reliable mobile menu fix */
(function(){'use strict';
  function init(){
    var button=document.getElementById('menuToggle');
    var links=document.getElementById('navLinks');
    if(!button||!links)return;
    if(button.dataset.mbmdMenuBound==='1')return;
    button.dataset.mbmdMenuBound='1';
    button.type='button';
    button.setAttribute('aria-controls','navLinks');
    button.setAttribute('aria-expanded','false');
    links.classList.remove('open');
    function setOpen(open){
      links.classList.toggle('open',open);
      links.style.display=open?'grid':'';
      button.setAttribute('aria-expanded',open?'true':'false');
      button.innerHTML=open?'✕ &nbsp; CLOSE':'☰ &nbsp; MENU';
    }
    button.addEventListener('click',function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      setOpen(!links.classList.contains('open'));
    },false);
    links.addEventListener('click',function(ev){
      if(ev.target.closest('a'))setOpen(false);
    },false);
    document.addEventListener('click',function(ev){
      if(links.classList.contains('open')&&!links.contains(ev.target)&&ev.target!==button)setOpen(false);
    },false);
    window.addEventListener('resize',function(){
      if(window.innerWidth>850)setOpen(false);
    },false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
