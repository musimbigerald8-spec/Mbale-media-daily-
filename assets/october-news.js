(function(){
"use strict";
var API="https://dwbgcaxwemrwheybdpya.supabase.co/rest/v1/news?select=id,title,excerpt,category,author,created_at,image_url,breaking&published=eq.true&approval_status=eq.published&created_at=gte.2026-10-01T00:00:00%2B00:00&order=created_at.desc&limit=9";
var KEY="sb_publishable_WkkWUJF8ONyX4oS2nvGNFw_jdAob8M8";
var FALLBACK=[
 {title:"Uganda marks International Ombuds Day with call to use complaint and accountability channels",excerpt:"Uganda joins the global community on October 8 under the theme “Ombuds: Office of Options”, encouraging citizens to engage the Ombudsman on public-service concerns.",category:"UGANDA • GOVERNANCE",author:"Mbale Media Daily Desk",created_at:"2026-10-08T04:00:00Z",image_url:"assets/news-uganda-oct1.svg",breaking:false},
 {title:"Uganda approves domestic participation in Dangote refinery share offer",excerpt:"Uganda’s Capital Markets Authority has approved domestic investors to participate in the Dangote Petroleum Refinery initial public offering.",category:"UGANDA • BUSINESS",author:"Mbale Media Daily Business Desk",created_at:"2026-10-07T18:00:00Z",image_url:"assets/business-news.svg",breaking:false},
 {title:"Uganda exceeds mass measles vaccination target as campaign continues",excerpt:"Uganda has reported that 8.2 million children have been vaccinated as the country works to address recurring measles outbreaks.",category:"UGANDA • HEALTH",author:"Mbale Media Daily Health Desk",created_at:"2026-10-08T03:00:00Z",image_url:"assets/mbale-news.svg",breaking:false},
 {title:"Mbale High Court concludes hearing of Bungokho North election petition",excerpt:"The Mbale High Court has concluded hearing of the Bungokho North election petition, with the case involving allegations about votes and the final results.",category:"MBALE • COURTS",author:"Mbale Media Daily News Desk",created_at:"2026-10-07T20:49:00Z",image_url:"assets/mbale-news.svg",breaking:false},
 {title:"Fuel prices remain under pressure as shilling depreciation adds to costs",excerpt:"Ugandan MPs have questioned rising petrol and diesel prices, with officials citing global disruptions, taxes and shilling depreciation.",category:"UGANDA • ECONOMY",author:"Mbale Media Daily Business Desk",created_at:"2026-10-07T18:44:00Z",image_url:"assets/business-news.svg",breaking:false},
 {title:"EC orders repeat LC1 elections in disputed villages",excerpt:"The Electoral Commission has ordered repeat LC1 polls in 54 villages, with voting scheduled in batches beginning October 15 and 19.",category:"UGANDA • ELECTIONS",author:"Mbale Media Daily Politics Desk",created_at:"2026-10-07T19:13:00Z",image_url:"assets/news-uganda-oct1.svg",breaking:false}
];
function esc(s){return String(s||"").replace(/[&<>"]/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]});}
function render(items){
 var old=document.getElementById("mbmd-october-live"); if(old) old.remove();
 items=(items&&items.length)?items:FALLBACK;
 var section=document.createElement("section"); section.id="mbmd-october-live"; section.className="section";
 section.innerHTML='<div class="section-head"><h2>Latest Today</h2><a href="latest-news.html">VIEW ALL →</a></div><div class="news-grid">'+items.slice(0,9).map(function(x){
   var d=new Date(x.created_at).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"});
   return '<article class="card"><img loading="lazy" decoding="async" src="'+esc(x.image_url||"assets/news-uganda-oct1.svg")+'" alt="'+esc(x.title)+'"><div class="card-body"><span class="category">'+esc(x.category||"NEWS")+(x.breaking?" • BREAKING":"")+'</span><h3>'+esc(x.title)+'</h3><p>'+esc(x.excerpt)+'</p><div class="byline">'+d+' • '+esc(x.author||"Mbale Media Daily")+'</div></div></article>';
 }).join("")+'</div>';
 var anchor=document.querySelector(".network-banner"); if(anchor) anchor.parentNode.insertBefore(section,anchor); else document.querySelector("main")?.appendChild(section);
}
fetch(API,{headers:{apikey:KEY,Authorization:"Bearer "+KEY}}).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json();}).then(render).catch(function(){render(FALLBACK);});
})();