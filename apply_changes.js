// Apply all changes for hero chat animation and comparison table

const fs = require('fs');

// 1. Fix index.html hero chat
let html = fs.readFileSync('index.html', 'utf8');

// Remove hero chat content (lines 414-431) and replace with tg-chat
const heroChatPattern = /(\s*<div class="hero-chat-card">\s*<div class="hero-chat-top">[\s\S]*?<\/div>\s*)<div class="hero-chat-row user">[\s\S]*?<p class="i18n hero-card-note"[\s\S]*?<\/p>\s*<\/div>\s*<\/div>\s*<\/header>/;

const match = html.match(heroChatPattern);
if (match) {
  html = html.replace(heroChatPattern, '$1<div class="tg-chat"></div>\n           </div>\n         </div>\n       </header>');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html: hero chat replaced');
} else {
  console.log('Pattern not matched for hero chat');
}

// 2. Add CSS for tg-chat and comparison table to style.css
let css = fs.readFileSync('style.css', 'utf8');

const stylesToAdd = `
.tg-chat { display:flex; flex-direction:column; gap:8px; padding:12px 14px; min-height:110px; }
.tg-bubble { max-width:82%; padding:8px 13px; font-size:13px; line-height:1.4;
             color:#fff; white-space:pre-line; border-radius:18px;
             opacity:0; animation:tgFade 0.3s ease forwards; }
.tg-bubble.user { background:#5865F2; border-radius:18px 18px 4px 18px; align-self:flex-end; }
.tg-bubble.bot  { background:#2d2d4e; border-radius:18px 18px 18px 4px; align-self:flex-start; }
.tg-bubble.typing { background:#2d2d4e; border-radius:18px 18px 18px 4px; align-self:flex-start;
                    display:flex; gap:4px; align-items:center; padding:10px 16px; }
.tg-bubble.typing span { width:5px; height:5px; background:#aaa; border-radius:50%;
                          animation:tgDot 0.6s infinite; }
.tg-bubble.typing span:nth-child(2) { animation-delay:0.15s; }
.tg-bubble.typing span:nth-child(3) { animation-delay:0.30s; }
@keyframes tgFade { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
@keyframes tgDot  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
.compare-table { width:100%; max-width:700px; margin:0 auto; border-collapse:collapse; font-size:15px; }
.compare-table th, .compare-table td { padding:14px 18px; border-bottom:1px solid rgba(255,255,255,0.08); }
.compare-table th { font-weight:600; opacity:0.7; font-size:13px; }
.compare-table .highlight-col { background:rgba(88,101,242,0.15); color:#a78bfa; font-weight:600; }
.compare-table thead .highlight-col { font-size:15px; color:#fff; background:rgba(88,101,242,0.3); }
.compare-table tr:hover td { background:rgba(255,255,255,0.03); }
`;

if (!css.includes('.tg-chat')) {
  fs.writeFileSync('style.css', css + stylesToAdd, 'utf8');
  console.log('style.css: styles added');
}

// 3. Add JS for tg chat animation
let js = fs.readFileSync('script.js', 'utf8');

const jsToAdd = `
// Telegram chat animation
function runTgChat(){
  const chat=document.querySelector('.tg-chat');
  if(!chat)return;
  chat.innerHTML='';
  const steps=[
    {cls:'user', text:'/workout chest 💪', at:400},
    {cls:'typing', at:1000},
    {cls:'bot', text:'✅ Жим лежачи — 80кг × 8\\nЗаписано! Рекорд +5% 🔥', at:2000},
  ];
  steps.forEach(({cls,text,at})=>{
    setTimeout(()=>{
      const b=document.createElement('div');
      b.className='tg-bubble '+cls;
      if(cls==='typing'){
        b.innerHTML='<span></span><span></span><span></span>';
        chat.appendChild(b);
        setTimeout(()=>b.remove(),800);
      } else {
        b.innerText=text;
        chat.appendChild(b);
      }
    },at);
  });
  setTimeout(runTgChat,5000);
}
document.addEventListener('DOMContentLoaded',runTgChat);
`;

if (!js.includes('runTgChat')) {
  fs.writeFileSync('script.js', js + jsToAdd, 'utf8');
  console.log('script.js: animation added');
}

console.log('Done');