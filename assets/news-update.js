(function(){
  'use strict';
  var stories = [
    {cat:'EASTERN UGANDA',title:'Bududa leaders arrested over alleged PDM funds diversion',lead:'Three local leaders were arrested after an allegation that Shs1 million in PDM funds was accessed using a beneficiary’s national ID and sent to a phone number linked to one suspect.',source:'Uganda Radio Network • 16 September 2026'},
    {cat:'EASTERN UGANDA',title:'Bulambuli launches Shs200m rehabilitation of Bunambutye-Girigi Road',lead:'District leaders launched a road rehabilitation project intended to improve movement along the Bunambutye-Girigi route, which has faced access difficulties because of its condition.',source:'Uganda Radio Network • 16 September 2026'},
    {cat:'KUMI',title:'Eight youths held over night attacks in Kumi Municipality',lead:'Police and local leaders say eight youths have been arrested during a security operation targeting suspected night attacks in South Division, Kumi Municipality.',source:'Uganda Radio Network • 16 September 2026'},
    {cat:'BUSINESS',title:'NSSF revenue rises 85% to Shs6.51 trillion',lead:'NSSF reported revenue of Shs6.51 trillion for the financial year ended June 2026, while assets under management reached Shs32.8 trillion.',source:'Uganda Radio Network • 16 September 2026'},
    {cat:'UGANDA',title:'Local governments urged to boost revenue and invest in industrialisation',lead:'At a regional budget consultative workshop in Lira, officials called for stronger domestic revenue mobilisation and investment in industrialisation ahead of the 2027/2028 budget.',source:'Daily Monitor • 16 September 2026'},
    {cat:'EDUCATION',title:'Agriculture leads Uganda vocational assessment results',lead:'Uganda Vocational and Technical Assessment Board results reported strong performance among National Diploma agriculture candidates, while officials said attracting more students remains a challenge.',source:'Uganda Radio Network • 16 September 2026'},
    {cat:'SPORTS',title:'Uganda football clubs prepare for another busy stretch',lead:'The domestic football season continues as clubs manage league fixtures and preparations for major continental and national competitions.',source:'Mbale Media Sports Desk • 16 September 2026'}
  ];
  function esc(s){return s.replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c]});}
  function homepage(){
    var hero=document.querySelector('.featured');
    if(hero){
      var h=hero.querySelector('h1'), p=hero.querySelector('p'), b=hero.querySelector('.byline'), c=hero.querySelector('.category');
      if(c)c.textContent=stories[0].cat;
      if(h)h.textContent=stories[0].title;
      if(p)p.textContent=stories[0].lead;
      if(b)b.textContent='16 September 2026 • Mbale Media Daily Eastern Desk';
    }
    var side=document.querySelectorAll('.side-story');
    stories.slice(1,3).forEach(function(st,i){
      if(!side[i])return;
      var c=side[i].querySelector('.category'),h=side[i].querySelector('h2'),p=side[i].querySelector('p'),b=side[i].querySelector('.byline');
      if(c)c.textContent=st.cat;
      if(h)h.textContent=st.title;
      if(p)p.textContent=st.lead;
      if(b)b.textContent=st.source;
    });
    var ticker=document.querySelector('.ticker-track');
    if(ticker){ticker.innerHTML=stories.slice(0,5).map(function(s){return '<span>'+esc(s.title)+'</span>';}).join('');}
    var old=document.getElementById('mbmd-live-updates');
    if(old)old.remove();
    if(!hero)return;
    var sec=document.createElement('section');
    sec.id='mbmd-live-updates';
    sec.style.cssText='margin:26px 0 10px;background:#0e1417;border:1px solid #20282d;border-radius:8px;overflow:hidden';
    sec.innerHTML='<div style="padding:15px 17px;border-bottom:1px solid #20282d;display:flex;justify-content:space-between;gap:12px;align-items:center"><h2 style="margin:0;font:800 23px Georgia,serif;color:#fff">Latest Updates</h2><span style="font-size:10px;color:#ff766d;font-weight:800">16 SEP 2026</span></div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr))">'+stories.slice(0,6).map(function(s){return '<article style="padding:15px 16px;border-bottom:1px solid #20282d"><div style="font-size:9px;color:#ff766d;font-weight:900;letter-spacing:.7px">'+esc(s.cat)+'</div><h3 style="margin:6px 0 7px;font:700 16px/1.22 Georgia,serif;color:#fff">'+esc(s.title)+'</h3><p style="margin:0;color:#9aa4aa;font-size:11px;line-height:1.45">'+esc(s.lead)+'</p><div style="margin-top:9px;color:#6f7b82;font-size:9px">'+esc(s.source)+'</div></article>';}).join('')+'</div>';
    hero.parentNode.insertBefore(sec,hero.nextSibling);
  }
  function latestPage(){
    var head=document.querySelector('.head p'); if(head)head.textContent='LATEST NEWS • WEDNESDAY SEPTEMBER 16, 2026';
    var ed=document.querySelector('.edition');
    if(ed){var h=ed.querySelector('h2'),p=ed.querySelector('p');if(h)h.textContent="Wednesday's full news edition";if(p)p.textContent='Mbale Media Daily brings readers a fresh selection of developments from Eastern Uganda, Uganda, business, education, sports and other current affairs. The reports below are original Mbale Media Daily summaries based on identified current sources.';}
    var arts=document.querySelectorAll('.article');
    stories.slice(0,6).forEach(function(st,i){
      if(!arts[i])return;
      var body=arts[i].querySelector('.body');
      if(!body)return;
      var img=arts[i].querySelector('img');
      var imgs=[
        'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1504306661229-7d3c0e5f1b2b?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80'
      ];
      if(img){img.src=imgs[i];img.alt=st.title;img.loading=i<2?'eager':'lazy';}
      body.innerHTML='<div class="kicker">'+esc(st.cat)+'</div><h2>'+esc(st.title)+'</h2><p class="lead">'+esc(st.lead)+'</p><p>Mbale Media Daily is monitoring the development and will continue to update readers as verified information becomes available. Readers should treat allegations as allegations until established by the relevant authorities or courts.</p><p>The report is presented as a concise news update based on identified reporting published on 16 September 2026.</p><div class="meta">16 September 2026 • Mbale Media Daily News Desk</div><div class="source"><strong>Source:</strong> '+esc(st.source)+'</div>';
    });
  }
  function init(){
    if(document.querySelector('.featured'))homepage();
    if(document.querySelector('.article'))latestPage();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
