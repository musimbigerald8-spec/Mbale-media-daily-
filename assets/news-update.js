(function(){
'use strict';
var SUPABASE_URL='https://dwbgcaxwemrwheybdpya.supabase.co';
var SUPABASE_KEY='sb_publishable_WkkWUJF8ONyX4oS2nvGNFw_jdAob8M8';
function esc(s){return String(s||'').replace(/[&<>\\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c]});}
function card(s){return '<article class="card"><div class="card-body"><div class="category">'+esc(s.category||'NEWS')+'</div><h3>'+esc(s.title)+'</h3><p>'+esc(s.summary||'')+'</p><div class="byline">Mbale Media Daily News Desk • '+new Date(s.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})+'</div></article>';}
function setSection(id,title,items){var el=document.getElementById(id);if(!el||!items.length)return;var grid=el.querySelector('.news-grid');if(grid)grid.innerHTML=items.map(card).join('');var h=el.querySelector('.section-head h2');if(h)h.textContent=title;}
function cleanOldAds(){document.querySelectorAll('.mbmd-ad').forEach(function(e){e.remove();});}
/* Eastlink advertising is already supplied by assets/mobile-interaction-fix.js.
   Do not inject a second Eastlink advert here; duplicate ad systems caused the
   mobile homepage to show a large blank/duplicate advert before the news. */
function ensureEastlinkAd(){return true;}
function repairKampalaImages(){var fallback='https://commons.wikimedia.org/wiki/Special:Redirect/file/KampalaSkyline.jpg';document.querySelectorAll('img').forEach(function(img){var label=((img.alt||'')+' '+(img.src||'')).toLowerCase();if(label.indexOf('kampala')<0&&label.indexOf('skyline')<0)return;if(img.dataset.mbmdKampalaRepair)return;img.dataset.mbmdKampalaRepair='1';img.addEventListener('error',function(){if(img.src!==fallback){img.src=fallback;img.alt='Kampala skyline — Wikimedia Commons';img.title='Kampala skyline — Wikimedia Commons, Omoo, CC BY-SA 3.0';}}, {once:false});});}
async function load(){try{cleanOldAds();repairKampalaImages();var r=await fetch(SUPABASE_URL+'/rest/v1/news?select=id,title,summary,category,author,created_at,featured,breaking&published=eq.true&approval_status=eq.published&order=created_at.desc&limit=60',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});if(!r.ok)throw new Error('HTTP '+r.status);var all=await r.json();if(!all.length){ensureEastlinkAd();repairKampalaImages();return;}
var latest=all.slice(0,12),hero=latest[0];
var fh=document.querySelector('.featured h1'),fp=document.querySelector('.featured p'),fb=document.querySelector('.featured .byline'),fc=document.querySelector('.featured .category');
if(hero){if(fh)fh.textContent=hero.title;if(fp)fp.textContent=hero.summary||'';if(fb)fb.textContent='Mbale Media Daily News Desk • '+new Date(hero.created_at).toLocaleDateString('en-GB');if(fc)fc.textContent=hero.category||'NEWS';}
var ss=document.querySelectorAll('.side-story');latest.slice(1,3).forEach(function(s,i){if(!ss[i])return;var h=ss[i].querySelector('h2'),p=ss[i].querySelector('p'),b=ss[i].querySelector('.byline'),c=ss[i].querySelector('.category');if(h)h.textContent=s.title;if(p)p.textContent=s.summary||'';if(b)b.textContent='Mbale Media Daily • '+new Date(s.created_at).toLocaleDateString('en-GB');if(c)c.textContent=s.category||'NEWS';});
var ticker=document.querySelector('.ticker-track');if(ticker)ticker.innerHTML=latest.slice(0,8).map(function(s){return '<span>'+esc(s.title)+'</span>';}).join('');
var cats={'Local':'mbale','National':'uganda','Africa':'africa','Global':'global','Business':'business','Sports':'sports','Entertainment':'culture','Feature':'features'};Object.keys(cats).forEach(function(c){setSection(cats[c],c,all.filter(function(s){return String(s.category||'').toLowerCase()===c.toLowerCase();}).slice(0,6));});
var live=document.getElementById('mbmd-live-feed');if(!live){live=document.createElement('section');live.id='mbmd-live-feed';live.className='section';var heroEl=document.querySelector('.hero');if(heroEl)heroEl.insertAdjacentElement('afterend',live);}live.innerHTML='<div class="section-head"><h2>Latest News</h2><a href="latest-news.html">View All</a></div><div class="news-grid">'+latest.slice(0,6).map(card).join('')+'</div>';
ensureEastlinkAd();repairKampalaImages();
}catch(e){console.warn('Mbale Media live feed failed:',e);ensureEastlinkAd();repairKampalaImages();}}
function init(){load();setInterval(load,300000);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();