(function(){
'use strict';
const API='/api/chat';
const messages=document.getElementById('messages');
const form=document.getElementById('form');
const input=document.getElementById('input');
const clear=document.getElementById('clear');
function add(text,type){const d=document.createElement('div');d.className='msg '+type;d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;return d}
function sendQuestion(q){input.value=q;form.requestSubmit()}
document.querySelectorAll('.suggestions button').forEach(b=>b.addEventListener('click',()=>sendQuestion(b.textContent)));
clear.addEventListener('click',()=>{messages.innerHTML='<div class="msg ai">Chat cleared. What would you like to know?</div>';input.focus()});
form.addEventListener('submit',async e=>{
 e.preventDefault(); const q=input.value.trim(); if(!q)return;
 input.value=''; add(q,'user'); const reply=add('Thinking…','ai');
 try{
   const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,pageContext:document.body.innerText.slice(0,6000),news:[]})});
   const raw=await r.text(); let data={}; try{data=JSON.parse(raw)}catch(_){}
   if(!r.ok) throw new Error(data.error||'The AI service is temporarily unavailable.');
   reply.textContent=data.answer||data.output_text||data.reply||'No answer was returned.';
 }catch(err){
   reply.textContent='Mbale AI is ready, but its secure AI engine is not connected yet. The new interface is live; the next step is connecting the server-side AI provider.';
 }
 messages.scrollTop=messages.scrollHeight;
});
})();