/* Mbale Media Daily — link homepage stories to full articles */
(function(){
  'use strict';
  var links={
    'Bududa leaders arrested over alleged PDM funds diversion':'top-stories.html#bududa',
    'Bulambuli launches Shs200m rehabilitation of Bunambutye-Girigi Road':'top-stories.html#bulambuli',
    'Eight youths held over night attacks in Kumi Municipality':'top-stories.html#kumi',
    'NSSF revenue rises 85% to Shs6.51 trillion':'top-stories.html#nssf',
    'Local governments urged to boost revenue and invest in industrialisation':'top-stories.html#local-revenue',
    'Agriculture leads Uganda vocational assessment results':'top-stories.html#agriculture'
  };
  function clean(s){return (s||'').replace(/\s+/g,' ').trim();}
  function run(){
    Object.keys(links).forEach(function(title){
      document.querySelectorAll('h1,h2,h3').forEach(function(h){
        if(clean(h.textContent)===title && !h.closest('a')){
          var a=document.createElement('a');
          a.href=links[title];
          a.style.color='inherit';
          a.style.textDecoration='none';
          a.setAttribute('aria-label','Read full story: '+title);
          h.parentNode.insertBefore(a,h);a.appendChild(h);
        }
      });
    });
    document.querySelectorAll('a').forEach(function(a){
      var t=clean(a.textContent);
      if(links[t])a.href=links[t];
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  setTimeout(run,1500);
})();
