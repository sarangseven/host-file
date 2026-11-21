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

// ===== crowd footer: an illustrated crowd keeps crossing in two rows while the main character stands perfectly still =====
(()=>{const svg=$('#crowd');if(!svg)return;const N='http://www.w3.org/2000/svg';
const el=(n,a,p)=>{const e=document.createElementNS(N,n);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const ME={src:'assets/sarang.webp',ar:.6636,h:345};
// [file number, width/height ratio, relative height] - 34 caricature cut-outs in assets/crowd/
const CUTS=[[1,0.2586,1.06],[2,0.4607,1.02],[3,0.5246,0.98],[4,0.5505,1.00],[5,0.6035,0.99],[6,0.4678,1.02],[7,0.4434,1.04],[8,0.3465,1.07],[9,0.378,0.99],[10,0.4811,1.01],[11,0.4756,1.02],[12,0.4434,0.98],[13,0.4937,1.05],[14,0.4177,0.88],[15,0.3742,1.00],[16,0.4054,1.04],[17,0.4234,0.99],[18,0.4425,0.98],[19,0.4763,0.99],[20,0.4409,0.95],[21,0.5283,0.94],[22,0.6098,0.93],[23,0.5759,0.96],[24,0.4051,0.93],[25,0.4259,0.98],[26,0.6127,0.95],[27,0.5924,1.01],[28,0.4152,0.96],[29,0.4953,0.96],[30,0.4842,0.96],[31,0.4779,1.01],[32,0.6069,1.00],[33,0.5221,0.99],[34,0.4796,0.92]];
const rnd=(a,b)=>a+Math.random()*(b-a);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
let lastW=0;
function build(){svg.replaceChildren();lastW=svg.clientWidth;const H=392,W=Math.max(420,Math.round(svg.clientWidth*H/Math.max(svg.clientHeight,1)));
svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.setProperty('--x0','-200px');svg.style.setProperty('--x1',(W+200)+'px');
const defs=el('defs',{},svg);
const sf=el('filter',{id:'soft',x:'-30%',y:'-30%',width:'160%',height:'160%'},defs);el('feGaussianBlur',{stdDeviation:12},sf);
const lg=el('linearGradient',{id:'beam',x1:0,y1:0,x2:0,y2:1},defs);
el('stop',{offset:'0',class:'bs','stop-opacity':.30},lg);el('stop',{offset:'.7',class:'bs','stop-opacity':.10},lg);el('stop',{offset:'1',class:'bs','stop-opacity':0},lg);
const rg=el('radialGradient',{id:'glow'},defs);el('stop',{offset:'0',class:'bs','stop-opacity':.42},rg);el('stop',{offset:'1',class:'bs','stop-opacity':0},rg);
// spotlight (dark mode) + floor glow/shadow under the main character
const cx=W/2,by=352;
el('polygon',{class:'beam',points:`${cx-40},-10 ${cx+40},-10 ${cx+240},${by} ${cx-240},${by}`,fill:'url(#beam)',stroke:'none',filter:'url(#soft)'},svg);
el('ellipse',{class:'floor',cx,cy:by-2,rx:190,ry:20,fill:'url(#glow)',stroke:'none'},svg);
const back=el('g',{class:'row'},svg);
// random cast: every character appears before any repeats, in a fresh random order
let deck=[];const draw=()=>{if(!deck.length)deck=shuffle(CUTS);return deck.pop()};
function walker(layer,parent){
 const [n,ar,k]=draw(),dir=Math.random()<.5?1:-1,h=345*.9*(layer?1.03:.94)*k*rnd(.97,1.03),w=h*ar,base=layer?388:338;
 const st=rnd(.72,.92),speed=rnd(70,130)*(layer?1.15:.85),dur=(W+400)/speed;
 const o=el('g',{class:'pass '+(dir>0?'r':'l'),style:`--dur:${dur.toFixed(2)}s;--dl:-${(Math.random()*dur).toFixed(2)}s;--st:${st.toFixed(2)}s;--po:${rnd(0,2*st).toFixed(2)}s`},parent);
 const g=el('g',{transform:`translate(0 ${base}) scale(${dir} 1)`},o);const bob=el('g',{class:'bob'},g);const fig=el('g',{class:'fig'},bob);
 el('image',{href:`assets/crowd/c${String(n).padStart(2,'0')}.webp?v=2`,x:-w/2,y:-h,width:w,height:h,preserveAspectRatio:'xMidYMax meet',decoding:'async'},fig)}
// density: many people; random phases and speeds make it thicker in some places and thinner in others
const total=Math.max(10,Math.round(W/50));
for(let i=0;i<Math.ceil(total/2);i++)walker(0,back);
// main character: your photo, standing perfectly still between the two rows
const w=ME.h*ME.ar;
el('image',{class:'me',href:ME.src,x:cx-w/2,y:by-ME.h,width:w,height:ME.h,preserveAspectRatio:'xMidYMax meet'},svg);
const front=el('g',{class:'row'},svg);
for(let i=0;i<Math.floor(total/2);i++)walker(1,front)}
build();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(Math.abs(svg.clientWidth-lastW)>8)build()},200)});
const sec=svg.closest('.crowd');new IntersectionObserver(es=>es.forEach(e=>sec.classList.toggle('off',!e.isIntersecting))).observe(sec);
})();
