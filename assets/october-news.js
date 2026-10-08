(function(){
"use strict";
var API="https://dwbgcaxwemrwheybdpya.supabase.co/rest/v1/news?select=id,title,excerpt,category,author,created_at,image_url,breaking&published=eq.true&approval_status=eq.published&created_at=gte.2026-10-01T00:00:00%2B00:00&order=created_at.desc&limit=9";
var KEY="sb_publishable_WkkWUJF8ONyX4oS2nvGNFw_jdAob8M8";
var FALLBACK=[
 {title:"Over 16,000 pupils missing from Kwania school registers, Shs90m capitation withheld",excerpt:"A Term III headcount found 16,101 fewer pupils physically attending than were registered on EMIS, leading to more than Shs90 million in withheld capitation grants.",category:"UGANDA • EDUCATION",author:"Mbale Media Daily News Desk",created_at:"2026-10-08T06:00:00Z",image_url:"assets/news-uganda-oct1.svg",breaking:false},
 {title:"Kenya moves to allay Ebola fears as Uganda calls for regional tourism unity",excerpt:"Kenyan authorities are reassuring visitors after a reported Ebola case while Uganda is urging East African destinations to work together on tourism promotion.",category:"EAST AFRICA • TOURISM",author:"Mbale Media Daily East Africa Desk",created_at:"2026-10-08T05:30:00Z",image_url:"assets/africa-news.svg",breaking:false},
 {title:"Museveni set to receive top military medal at Independence Day celebrations",excerpt:"President Yoweri Museveni is among 20 distinguished medalists due to be honoured during Uganda's 64th Independence Day celebrations on October 9.",category:"UGANDA • INDEPENDENCE",author:"Mbale Media Daily News Desk",created_at:"2026-10-08T05:00:00Z",image_url:"assets/news-uganda-oct1.svg",breaking:false},
 {title:"Akii-Bua Stadium confirmed as Uganda AFCON 2027 venue",excerpt:"Akii-Bua Olympic Stadium has been confirmed as one of Uganda's three AFCON 2027 venues, alongside Hoima and Namboole, as construction advances.",category:"SPORTS • AFCON 2027",author:"Mbale Media Daily Sports Desk",created_at:"2026-10-08T04:30:00Z",image_url:"assets/sports-spotlight.svg",breaking:false},
 {title:"Uganda reports 8.2 million children vaccinated in measles campaign",excerpt:"Uganda has vaccinated 8.2 million children as the country works to contain recurring measles outbreaks.",category:"UGANDA • HEALTH",author:"Mbale Media Daily Health Desk",created_at:"2026-10-08T04:00:00Z",image_url:"assets/mbale-news.svg",breaking:false},
 {title:"Uganda marks International Ombuds Day with focus on accountability",excerpt:"The Inspectorate of Government is joining the global observance of International Ombuds Day on October 8 under the theme “Ombuds: Office of Options”.",category:"UGANDA • GOVERNANCE",author:"Mbale Media Daily Desk",created_at:"2026-10-08T03:30:00Z",image_url:"assets/news-uganda-oct1.svg",breaking:false},
 {title:"EC sets repeat LC1 elections in 54 villages for October",excerpt:"The Electoral Commission has scheduled repeat Local Council I elections in 54 villages after disputes and other electoral issues.",category:"UGANDA • ELECTIONS",author:"Mbale Media Daily Politics Desk",created_at:"2026-10-07T19:13:00Z",image_url:"assets/news-uganda-oct1.svg",breaking:false},
 {title:"Uganda approves domestic participation in Dangote refinery share offer",excerpt:"The Capital Markets Authority has approved domestic investors to participate in the Dangote Petroleum Refinery initial public offering.",category:"UGANDA • BUSINESS",author:"Mbale Media Daily Business Desk",created_at:"2026-10-07T18:00:00Z",image_url:"assets/business-news.svg",breaking:false},
 {title:"Fuel prices remain under pressure as shilling depreciation adds to costs",excerpt:"Ugandan officials have cited global disruptions, taxes and shilling depreciation among factors affecting fuel prices.",category:"UGANDA • ECONOMY",author:"Mbale Media Daily Business Desk",created_at:"2026-10-07T17:30:00Z",image_url:"assets/business-news.svg",breaking:false}
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