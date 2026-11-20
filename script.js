/* ===== Edit these links ===== */
const LINKS={email:'mailto:atmesarang7@gmail.com',linkedin:'https://www.linkedin.com/in/sarang-s-7b0133233',instagram:'https://www.instagram.com/sarangseven',booking:'https://calendar.app.google/ifVVRtHYBuwsCH1r5',resume:'https://drive.google.com/file/d/1SRKbRa9WkxLJYChYpenINQ_uPfukZncP/view?usp=sharing'};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$$('[data-link]').forEach(a=>a.href=LINKS[a.dataset.link]||'#');
// Theme: light by default, remembered after first toggle
$('#theme').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}};
// "+" menu
const plus=$('#plus'),menu=$('#menu');
plus.onclick=e=>{e.stopPropagation();menu.hidden=!menu.hidden;plus.setAttribute('aria-expanded',!menu.hidden)};
document.onclick=()=>{menu.hidden=true;plus.setAttribute('aria-expanded',false)};
// Live IST clock
const tick=()=>{const t=new Date().toLocaleTimeString('en-US',{timeZone:'Asia/Kolkata',hour12:true}).toLowerCase();$('#clock').textContent=t+' IST';$('#status').textContent="It's "+t.replace(/:\d\d /,' ')+" in Bengaluru — available to connect across US and UK time zones"};
tick();let ck=setInterval(tick,1000);document.addEventListener('visibilitychange',()=>{clearInterval(ck);if(!document.hidden){tick();ck=setInterval(tick,1000)}});
// Spinning starburst
$('#burst').innerHTML=Array.from({length:12},(_,i)=>{const a=i*Math.PI/6+(i%3)*.04,r=[88,80,92,76][i%4];return `<line x1="0" y1="0" x2="${(Math.cos(a)*r).toFixed(1)}" y2="${(Math.sin(a)*r).toFixed(1)}"/>`}).join('');
// Auto-scrolling skills ticker (content is duplicated for a seamless loop)
const skills=['Consultative Selling','Customer Experience','Pipeline Management','Revenue Generation','International Sales','Business Development'];
const row=skills.map(s=>`<span>${s}</span>`).join('');$('#track').innerHTML=row+row+row+row;
// Playground accordions
$$('.more').forEach(b=>b.onclick=()=>{const o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',o);b.nextElementSibling.hidden=!o});
const topBtn=$('#top'),toggleTop=()=>topBtn.classList.toggle('show',scrollY>400);addEventListener('scroll',toggleTop,{passive:true});toggleTop();
topBtn.onclick=()=>scrollTo({top:0,behavior:'smooth'});

// ===== v2 polish: theme-color, nav state, scroll reveal, section spy =====
const root=document.documentElement,meta=$('meta[name=theme-color]');
const sync=()=>meta.content=root.dataset.theme==='dark'?'#000000':'#ffffff';sync();
new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['data-theme']});
const nav=$('.nav'),onScroll=()=>nav.classList.toggle('scrolled',scrollY>8);addEventListener('scroll',onScroll,{passive:true});onScroll();
$$('.eyebrow,h2,.job,.caps>div,.card,.edu>div,.about>*,.ct>*,.foot').forEach(el=>{el.classList.add('rv');el.style.setProperty('--i',Math.min([...el.parentNode.children].indexOf(el),4))});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.06});
$$('.rv').forEach(el=>io.observe(el));
const links=$$('.links a'),spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
['experience','playground','about'].forEach(id=>spy.observe($('#'+id)));
addEventListener('keydown',e=>{if(e.key==='Escape'){menu.hidden=true;plus.setAttribute('aria-expanded',false)}});

// ===== crowd footer: a chibi crowd keeps crossing in two alternating rows while the main character stands still =====
(()=>{const svg=$('#crowd');if(!svg)return;const N='http://www.w3.org/2000/svg';
const el=(n,a,p)=>{const e=document.createElementNS(N,n);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const ink={stroke:'#111','stroke-width':3,'stroke-linejoin':'round','stroke-linecap':'round'};
const SKIN='#f6d3b0',ME={src:'assets/sarang.webp',ar:.6636,h:345};
// all characters are original designs: [suit, accent, cape, head style]
const CAST=[['#d62839','#ffd166',null,'cowl'],['#1d4ed8','#e63946','#e63946','visor'],['#2b2d42','#a8b2c1',null,'cowl'],['#16a34a','#fef08a',null,'hood'],
['#f59e0b','#7c2d12','#7c2d12','helmet'],['#7c3aed','#fde047','#4c1d95','hair'],['#0ea5e9','#ffffff','#0369a1','visor'],['#be123c','#fecdd3',null,'hood'],
['#14532d','#bbf7d0',null,'cowl'],['#374151','#f87171','#111827','helmet'],['#fb7185','#fff1f2','#e11d48','hair'],['#1e3a8a','#fbbf24','#fbbf24','visor']];
const STEPS=[.46,.5,.44,.52,.48,.42,.54,.47];
let lastW=0;
function build(){svg.replaceChildren();lastW=svg.clientWidth;const H=392,W=Math.max(420,Math.round(svg.clientWidth*H/Math.max(svg.clientHeight,1)));
svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.setProperty('--x0','-190px');svg.style.setProperty('--x1',(W+190)+'px');
function walker(i,layer,ph){
 const [suit,acc,cape,head]=CAST[(i*5)%CAST.length],dir=(i*7)%3===0?-1:(i%2?-1:1),st=STEPS[(i*3)%STEPS.length];
 const sc=layer?1.75:1.5,base=layer?386:336;
 const speed=(.85+((i*37)%10)/40)*32*sc/st,dur=(W+380)/speed,po=((i*.29)%1)*2*st;
 const o=el('g',{class:'pass '+(dir>0?'r':'l'),style:`--dur:${dur.toFixed(2)}s;--dl:-${(ph*dur).toFixed(2)}s;--st:${st}s;--po:${po.toFixed(2)}s`},svg);
 const g=el('g',{transform:`translate(0 ${base}) scale(${dir*sc} ${sc})`},o);const bob=el('g',{class:'bob'},g);
 const leg=(side,x)=>{const h=el('g',{transform:`translate(${x} -34)`},bob);const th=el('g',{class:'th '+side},h);
  el('path',{...ink,fill:suit,d:'M-6 0C-7 6-6 12-5.5 17L5.5 17C6 12 7 6 6 0Z'},th);
  const k=el('g',{transform:'translate(0 17)'},th);const kn=el('g',{class:'kn '+side},k);
  el('path',{...ink,fill:suit,d:'M-5.5 0C-5.5 6-5 12-5 15L5 15C5 12 5.5 6 5.5 0Z'},kn);el('path',{...ink,fill:acc,d:'M-6 13L-6 19L10 19C10 15 7 13 5 13Z'},kn)};
 leg('a',-4);leg('b',4);
 const up=el('g',{class:'up'},bob);
 const arm=(side)=>{const s=el('g',{transform:'translate(0 -62)'},up);const a=el('g',{class:'arm '+side},s);
  el('path',{...ink,fill:suit,d:'M-5 0C-6 5-6 9-5 13L5 13C6 9 6 5 5 0Z'},a);
  const e=el('g',{transform:'translate(0 13)'},a);const f=el('g',{class:'fore '+side},e);
  el('path',{...ink,fill:suit,d:'M-4.5 0C-5 5-5 9-4.5 12L4.5 12C5 9 5 5 4.5 0Z'},f);el('circle',{...ink,fill:acc,cx:0,cy:13,r:5.5},f)};
 arm('a');
 if(cape)el('path',{...ink,fill:cape,d:'M-12-66C-34-52-38-22-30-2L-8-30Z'},up);
 el('rect',{...ink,fill:suit,x:-15,y:-70,width:30,height:40,rx:10},up);
 el('rect',{...ink,fill:acc,x:-15,y:-43,width:30,height:6},up);el('circle',{...ink,fill:acc,cx:2,cy:-58,r:5},up);
 arm('b');
 const hd=el('g',{class:'hd'},up);
 const eyes=()=>{for(const x of[-8,14]){el('circle',{fill:'#111',cx:x,cy:-97,r:3.6},hd);el('circle',{fill:'#fff',cx:x+1.2,cy:-98.2,r:1.2},hd)}el('path',{...ink,fill:'none','stroke-width':2.2,d:'M-1-86Q6-81 13-86'},hd)};
 if(head==='cowl'){el('path',{...ink,fill:suit,d:'M-24-112L-28-140L-8-124ZM24-112L28-140L8-124Z'},hd);el('circle',{...ink,fill:suit,cx:0,cy:-98,r:28},hd);
  el('ellipse',{...ink,fill:'#fff','stroke-width':2.4,cx:-9,cy:-98,rx:9,ry:7},hd);el('ellipse',{...ink,fill:'#fff','stroke-width':2.4,cx:13,cy:-98,rx:9,ry:7},hd);
  el('circle',{fill:'#111',cx:-6,cy:-98,r:3},hd);el('circle',{fill:'#111',cx:16,cy:-98,r:3},hd);el('path',{...ink,fill:'none','stroke-width':2.2,d:'M-1-84Q6-80 13-84'},hd)}
 else if(head==='visor'){el('circle',{...ink,fill:suit,cx:0,cy:-98,r:28},hd);el('path',{...ink,fill:acc,d:'M-25-106Q0-114 25-106L25-90Q0-84-25-90Z'},hd);
  el('rect',{fill:'#fff',x:-17,y:-102,width:11,height:6,rx:3},hd);el('rect',{fill:'#fff',x:6,y:-102,width:11,height:6,rx:3},hd);el('path',{...ink,fill:'none',d:'M0-126V-134'},hd);el('circle',{...ink,fill:acc,cx:0,cy:-136,r:4},hd)}
 else if(head==='hood'){el('circle',{...ink,fill:SKIN,cx:0,cy:-98,r:28},hd);eyes();el('path',{...ink,fill:suit,d:'M-29-96C-33-134 33-134 29-96C24-114-24-114-29-96Z'},hd)}
 else if(head==='helmet'){el('circle',{...ink,fill:'#cfd5de',cx:0,cy:-98,r:28},hd);el('ellipse',{...ink,fill:SKIN,cx:3,cy:-95,rx:20,ry:17},hd);
  for(const x of[-5,14]){el('circle',{fill:'#111',cx:x,cy:-97,r:3.3},hd)}el('path',{...ink,fill:'none','stroke-width':5,stroke:acc,d:'M0-126V-114'},hd)}
 else{el('circle',{...ink,fill:SKIN,cx:0,cy:-98,r:28},hd);eyes();el('path',{...ink,fill:acc,d:'M-30-98C-38-128-12-136 0-128C14-138 36-124 30-98C24-114-24-114-30-98Z'},hd)}}
// alternate the rows: one in the back, one in the front, one in the back...
const total=Math.max(8,Math.round(W/105));
const nb=Math.ceil(total/2),nf=Math.floor(total/2);
for(let k=0;k<nb;k++)walker(k*2,0,(k+((k*37)%10)/25)/nb);
// main character: your photo, standing perfectly still between the two rows
const w=ME.h*ME.ar,bx=W/2,by=352;
el('ellipse',{cx:bx,cy:by-2,rx:w*.34,ry:7,fill:'rgba(0,0,0,.10)'},svg);
el('image',{href:ME.src,x:bx-w/2,y:by-ME.h,width:w,height:ME.h,preserveAspectRatio:'xMidYMax meet'},svg);
for(let k=0;k<nf;k++)walker(k*2+1,1,(k+.5+((k*53)%10)/30)/nf)}
build();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(Math.abs(svg.clientWidth-lastW)>8)build()},200)});
const sec=svg.closest('.crowd');new IntersectionObserver(es=>es.forEach(e=>sec.classList.toggle('off',!e.isIntersecting))).observe(sec);
})();
