/* Mbale Media Daily — Eastlink Training Institute advertisement */
(function(){
  'use strict';
  function inject(){
    if(document.querySelector('.mbmd-eastlink-ad')) return;
    var ticker=document.querySelector('.ticker');
    var main=document.querySelector('main');
    if(!ticker && !main) return;
    var ad=document.createElement('section');
    ad.className='mbmd-eastlink-ad';
    ad.setAttribute('aria-label','Advertisement: Eastlink Training Institute');
    ad.innerHTML='\
      <style>\
      .mbmd-eastlink-ad{max-width:1180px;margin:18px auto 0;padding:0 18px}\.mbmd-eastlink-ad .ad-card{display:grid;grid-template-columns:minmax(220px,360px) 1fr;gap:0;background:#fff;border:1px solid #252b2f;border-radius:8px;overflow:hidden;box-shadow:0 8px 28px rgba(0,0,0,.25)}\.mbmd-eastlink-ad .ad-poster{width:100%;height:100%;min-height:280px;object-fit:cover;display:block}\.mbmd-eastlink-ad .ad-copy{padding:24px 26px;background:linear-gradient(135deg,#0d1820,#172b38);color:#fff;display:flex;flex-direction:column;justify-content:center}\.mbmd-eastlink-ad .ad-label{display:inline-block;width:max-content;background:#e4032e;color:#fff;font:900 10px Arial,sans-serif;letter-spacing:.8px;padding:6px 9px;border-radius:3px;margin-bottom:12px}\.mbmd-eastlink-ad h2{font:800 30px/1.05 Georgia,serif;margin:0 0 8px}\.mbmd-eastlink-ad h2 span{color:#ff766d}\.mbmd-eastlink-ad .ad-tag{font:700 14px Arial,sans-serif;color:#d7e1e6;margin:0 0 15px}\.mbmd-eastlink-ad ul{margin:0 0 18px;padding-left:19px;color:#cbd5da;font:12px/1.65 Arial,sans-serif}\.mbmd-eastlink-ad .ad-location{font:700 12px Arial,sans-serif;color:#fff;margin-bottom:17px}\.mbmd-eastlink-ad .ad-actions{display:flex;flex-wrap:wrap;gap:9px}\.mbmd-eastlink-ad .ad-actions a{display:inline-block;text-decoration:none;padding:11px 14px;border-radius:4px;font:900 11px Arial,sans-serif}\.mbmd-eastlink-ad .apply{background:#e4032e;color:#fff}.mbmd-eastlink-ad .call{background:#fff;color:#101619}.mbmd-eastlink-ad .ad-note{margin-top:12px;color:#8999a2;font:10px/1.4 Arial,sans-serif}\.mbmd-eastlink-ad .ad-note a{color:#ffaaa5}\.mbmd-eastlink-ad .ad-poster-wrap{background:#fff}\.mbmd-eastlink-ad .ad-poster-wrap a{display:block;height:100%}\
      @media(max-width:850px){.mbmd-eastlink-ad{margin:12px 0 0;padding:0}.mbmd-eastlink-ad .ad-card{grid-template-columns:1fr;border-radius:0}.mbmd-eastlink-ad .ad-poster{height:auto;max-height:none;min-height:0;object-fit:contain}.mbmd-eastlink-ad .ad-copy{padding:20px 18px}.mbmd-eastlink-ad h2{font-size:25px}.mbmd-eastlink-ad .ad-actions a{flex:1;text-align:center;min-width:125px}}\
      </style>\
      <div class="ad-card">\
        <div class="ad-poster-wrap"><a href="tel:+256768363821" aria-label="Call Eastlink Training Institute"><img class="ad-poster" src="assets/eastlink-ad.jpg" alt="Eastlink Training Institute courses and Apply Now advertisement"></a></div>\
        <div class="ad-copy">\
          <span class="ad-label">ADVERTISEMENT</span>\
          <h2>EASTLINK <span>TRAINING INSTITUTE</span></h2>\
          <p class="ad-tag">Powering Employability</p>\
          <ul><li>Certificate & Diploma courses</li><li>Tailoring, Fashion & Design</li><li>Hairdressing & Beauty</li><li>Information Technology</li><li>Journalism & Media Studies</li><li>Business, Tourism, Records & more</li><li>Hostels available • UVTAB assessed</li></ul>\
          <div class="ad-location">Mbale City, Kumi Road — Namakwekwe, behind Total Petrol Station next to Mbale Miracle Church of Christ.</div>\
          <div class="ad-actions"><a class="apply" href="tel:+256768363821">APPLY / CALL</a><a class="call" href="tel:+256200904854">+256 200 904 854</a></div>\
          <div class="ad-note">Advertiser contact: <a href="tel:+256768363821">+256 768 363 821</a> / <a href="tel:+256200904854">+256 200 904 854</a></div>\
        </div>\
      </div>';
    if(ticker && ticker.parentNode) ticker.parentNode.insertBefore(ad,ticker.nextSibling);
    else if(main) main.parentNode.insertBefore(ad,main);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',inject,{once:true}); else inject();
})();