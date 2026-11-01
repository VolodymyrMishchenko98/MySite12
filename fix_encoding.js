const fs = require('fs');

// 1. Fix index.html hero chat
let html = fs.readFileSync('index.html', 'utf8');

// Use regex to find and replace hero chat content
const heroChatRegex = /(<div class="hero-chat-top">[\s\S]*?<\/div>\n\s*<\/div>\n)(\s*<div class="hero-chat-row user">[\s\S]*?<p class="i18n hero-card-note"[\s\S]*?<\/p>\n\s*<\/div>\n\s*<\/div>\n\s*<\/header>)/;

const match = html.match(heroChatRegex);
if (match) {
  html = html.replace(heroChatRegex, '$1            <div class="tg-chat"></div>\n           </div>\n         </div>\n       </header>');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html: hero chat replaced');
} else {
  // Try simpler approach - find position by markers
  const start = html.indexOf('<div class="hero-chat-row user">');
  const end = html.indexOf('</header>') + '</header>'.length;
  
  if (start > 0 && end > start) {
    // Find the last </div> before </header> which closes hero-chat-card
    const beforeEnd = html.lastIndexOf('</div>', end - 30);
    const contentAfter = html.slice(beforeEnd);
    
    // Find position of hero-chat-card closing div
    const cardClosePos = html.lastIndexOf('</div>', end - 30);
    
    html = html.slice(0, start) + '            <div class="tg-chat"></div>\n' + contentAfter;
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('index.html: hero chat replaced (fallback)');
  } else {
    console.log('Could not find hero chat section', start, end);
  }
}

// 2. Add CSS for tg-chat and comparison table to style.css
let css = fs.readFileSync('style.css', 'utf8');
const tgCss = `
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
`;

const compareCss = `
.compare-table { width:100%; max-width:700px; margin:0 auto; border-collapse:collapse; font-size:15px; }
.compare-table th, .compare-table td { padding:14px 18px; border-bottom:1px solid rgba(255,255,255,0.08); }
.compare-table th { font-weight:600; opacity:0.7; font-size:13px; }
.compare-table .highlight-col { background:rgba(88,101,242,0.15); color:#a78bfa; font-weight:600; }
.compare-table thead .highlight-col { font-size:15px; color:#fff; background:rgba(88,101,242,0.3); }
.compare-table tr:hover td { background:rgba(255,255,255,0.03); }
`;

if (!css.includes('.tg-chat')) {
  fs.writeFileSync('style.css', css + tgCss, 'utf8');
  console.log('style.css: tg-chat styles added');
}

if (!fs.readFileSync('style.css', 'utf8').includes('.compare-table')) {
  fs.appendFileSync('style.css', compareCss, 'utf8');
  console.log('style.css: compare-table styles added');
}

console.log('Done');