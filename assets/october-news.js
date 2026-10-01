(function(){
"use strict";
var API="https://dwbgcaxwemrwheybdpya.supabase.co/rest/v1/news?select=id,title,excerpt,category,author,created_at,image_url,breaking&published=eq.true&approval_status=eq.published&created_at=gte.2026-10-01T00:00:00%2B00:00&order=created_at.desc&limit=9";
var KEY="sb_publishable_WkkWUJF8ONyX4oS2nvGNFw_jdAob8M8";
function esc(s){return String(s||"").replace(/[&<>"]/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]});}
function render(items){
 var old=document.getElementById("mbmd-october-live");
 if(old) old.remove();
 if(!items.length) return;
 var section=document.createElement("section");
 section.id="mbmd-october-live";
 section.className="section";
 section.innerHTML='<div class="section-head"><h2>Latest Today</h2><a href="latest-news.html">VIEW ALL →</a></div><div class="news-grid">'+items.map(function(x){
   var d=new Date(x.created_at).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"});
   return '<article class="card"><img loading="lazy" decoding="async" src="'+esc(x.image_url||"assets/news-uganda-oct1.svg")+'" alt="'+esc(x.title)+'"><div class="card-body"><span class="category">'+esc(x.category||"NEWS")+(x.breaking?" • BREAKING":"")+'</span><h3>'+esc(x.title)+'</h3><p>'+esc(x.excerpt)+'</p><div class="byline">'+d+' • '+esc(x.author||"Mbale Media Daily")+'</div></div></article>';
 }).join("")+'</div>';
 var anchor=document.querySelector(".network-banner");
 if(anchor) anchor.parentNode.insertBefore(section,anchor); else document.querySelector("main")?.appendChild(section);
}
fetch(API,{headers:{apikey:KEY,Authorization:"Bearer "+KEY}})
.then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json();})
.then(render).catch(function(){});
})();