(function(){
"use strict";
var API="https://dwbgcaxwemrwheybdpya.supabase.co/rest/v1/news?select=id,title,excerpt,category,author,created_at,image_url,breaking&published=eq.true&approval_status=eq.published&created_at=gte.2026-10-08T00:00:00%2B00:00&order=created_at.desc&limit=9";
var KEY="sb_publishable_WkkWUJF8ONyX4oS2nvGNFw_jdAob8M8";
var FALLBACK=[
 {title:"Uganda marks 64 years of Independence",excerpt:"Uganda marks Independence Day on 9 October. The government announced a scaled-down celebration centred at State House, Entebbe, with President Yoweri Museveni presiding.",category:"UGANDA • INDEPENDENCE",author:"Source: Nile Post / Uganda Media Centre",created_at:"2026-10-09T06:00:00Z",image_url:"assets/news-independence-oct9.svg",breaking:false},
 {title:"EU pledges continued support for Uganda’s education and research sector",excerpt:"The European Union reaffirmed support for Uganda’s education and research sector at the EU–Uganda Research and Study Fair held at Makerere University.",category:"UGANDA • EDUCATION",author:"Source: Daily Monitor",created_at:"2026-10-08T13:00:00Z",image_url:"assets/news-education-oct9.svg",breaking:false},
 {title:"UNEB allows limited late UCE registration exceptions",excerpt:"The Uganda National Examinations Board has allowed limited exceptions for late candidates ahead of the October 9 registration cut-off. Candidates should confirm details directly with their schools and UNEB.",category:"UGANDA • EDUCATION",author:"Source: Nile Post",created_at:"2026-10-09T05:30:00Z",image_url:"assets/news-education-oct9.svg",breaking:false},
 {title:"URA and KCCA prepare for Friday night Premier League clash",excerpt:"URA FC and KCCA FC are scheduled to meet at Hamz Stadium in Nakivubo on Friday evening, with KCCA striker Ivan Ahimbisibwe expected to feature.",category:"SPORTS • UGANDA PREMIER LEAGUE",author:"Source: Kawowo Sports",created_at:"2026-10-09T05:00:00Z",image_url:"assets/news-football-oct9.svg",breaking:false},
 {title:"Vipers beat Blacks Power 4–0 as Uganda Premier League action continues",excerpt:"Defending champions Vipers SC recorded a 4–0 win over Blacks Power, while NEC and Express played out a goalless draw in Thursday’s league fixtures.",category:"SPORTS • UGANDA PREMIER LEAGUE",author:"Source: Uganda Premier League",created_at:"2026-10-09T04:30:00Z",image_url:"assets/news-football-oct9.svg",breaking:false},
 {title:"Uganda approves domestic investor participation in Dangote refinery share offer",excerpt:"Uganda’s Capital Markets Authority approved domestic investors’ participation in the Dangote Petroleum Refinery initial public offering, opening another route for regional investment participation.",category:"BUSINESS • INVESTMENT",author:"Source: Reuters",created_at:"2026-10-07T10:00:00Z",image_url:"assets/news-business-oct9.svg",breaking:false},
 {title:"Museveni meets Commonwealth Secretary-General Shirley Botchwey",excerpt:"President Yoweri Museveni met Commonwealth Secretary-General Shirley Botchwey during her visit to Uganda, according to the Office of the President.",category:"UGANDA • GOVERNMENT",author:"Source: Office of the President",created_at:"2026-10-08T09:00:00Z",image_url:"assets/news-independence-oct9.svg",breaking:false},
 {title:"East Africa continues preparations for AFCON 2027",excerpt:"Co-hosts Uganda, Kenya and Tanzania are continuing preparations for the 2027 Africa Cup of Nations, scheduled to bring the tournament to the region.",category:"AFRICA • SPORTS",author:"Source: Al Jazeera",created_at:"2026-09-23T08:00:00Z",image_url:"assets/news-football-oct9.svg",breaking:false}
];
function esc(s){return String(s||"").replace(/[&<>"]/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]});}
function niceDate(v){return new Date(v).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",timeZone:"Africa/Kampala"});}
function card(x){
 var d=niceDate(x.created_at);
 return '<article class="card"><img loading="lazy" decoding="async" src="'+esc(x.image_url||"assets/news-independence-oct9.svg")+'" alt="'+esc(x.title)+'"><div class="card-body"><span class="category">'+esc(x.category||"NEWS")+(x.breaking?" • BREAKING":"")+'</span><h3>'+esc(x.title)+'</h3><p>'+esc(x.excerpt||"")+'</p><div class="byline">'+d+' • '+esc(x.author||"Mbale Media Daily")+'</div></div></article>';
}
function updateTop(items){
 if(!items||!items.length)return;
 var lead=items[0], featured=document.querySelector(".featured");
 if(featured){
  var img=featured.querySelector("img"), cat=featured.querySelector(".category"), h=featured.querySelector("h1"), p=featured.querySelector("p"), by=featured.querySelector(".byline");
  if(img){img.src=lead.image_url||"assets/news-independence-oct9.svg";img.alt=lead.title;}
  if(cat)cat.textContent=lead.category||"LATEST NEWS";
  if(h)h.textContent=lead.title;
  if(p)p.textContent=lead.excerpt||"Latest verified news from Uganda and the region.";
  if(by)by.textContent=niceDate(lead.created_at)+" • "+(lead.author||"Mbale Media Daily News Desk");
 }
 var side=document.querySelectorAll(".side-story");
 items.slice(1,3).forEach(function(x,i){
  var el=side[i];if(!el)return;
  var img=el.querySelector("img"),cat=el.querySelector(".category"),h=el.querySelector("h2"),p=el.querySelector("p"),by=el.querySelector(".byline");
  if(img){img.src=x.image_url||"assets/news-education-oct9.svg";img.alt=x.title;}
  if(cat)cat.textContent=x.category||"LATEST NEWS";
  if(h)h.textContent=x.title;
  if(p)p.textContent=x.excerpt||"Read the latest report from Mbale Media Daily.";
  if(by)by.textContent=niceDate(x.created_at)+" • "+(x.author||"Mbale Media Daily");
 });
 var ticker=document.querySelector(".ticker-track");
 if(ticker){var t=items.slice(0,6).map(function(x){return "<span>"+esc((x.breaking?"BREAKING: ":"")+x.title+" • "+niceDate(x.created_at))+"</span>";}).join("");ticker.innerHTML=t+t;}
 var edition=document.getElementById("mbmd-current-edition");
 if(!edition){edition=document.createElement("div");edition.id="mbmd-current-edition";edition.style.cssText="background:linear-gradient(90deg,#e4032e,#11191d);border-radius:6px;padding:14px 18px;margin:0 0 18px;color:#fff;font-weight:800;font-size:13px";var hero=document.querySelector(".hero");if(hero)hero.insertAdjacentElement("afterend",edition);}
 edition.innerHTML="📰 FRIDAY NEWS UPDATE <span style=\"font-weight:500;color:#e7ecef\">• Friday, 9 October 2026 • Mbale Media Daily</span>";
}
function render(items){
 items=(items&&items.length)?items:FALLBACK;
 updateTop(items);
 var old=document.getElementById("mbmd-october-live");if(old)old.remove();
 var section=document.createElement("section");section.id="mbmd-october-live";section.className="section";
 section.innerHTML='<div class="section-head"><h2>Latest News • 9 October 2026</h2><a href="latest-news.html">VIEW ALL →</a></div><div class="news-grid">'+items.slice(0,8).map(card).join("")+'</div>';
 var hero=document.querySelector(".hero");
 if(hero)hero.insertAdjacentElement("afterend",section);else document.querySelector("main")?.appendChild(section);
}
fetch(API,{headers:{apikey:KEY,Authorization:"Bearer "+KEY}}).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json();}).then(function(items){render(items&&items.length?items:FALLBACK);}).catch(function(){render(FALLBACK);});
})();