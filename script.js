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

// ===== crowd footer: original line-art figures; the centre one is solid black and never moves =====
(()=>{const svg=$('#crowd');if(!svg)return;const N='http://www.w3.org/2000/svg';
const hair={short:'M-27-112C-27-140 27-140 27-112C14-122-14-122-27-112Z',side:'M-28-110C-30-142 30-142 28-110L28-84C22-98 22-116 0-120C-22-116-22-98-28-84Z',long:'M-29-108C-32-146 32-146 29-108L33-62C22-70 24-112 0-118C-24-112-22-70-33-62Z',curly:'M-30-112C-36-132-14-146 0-138C14-146 36-132 30-112C20-122-20-122-30-112Z',cap:'M-29-114C-29-142 29-142 29-114Z M-29-114H34'};
const people=[ // x, row(0 back/1 front), scale, hair, glasses, smile, shirt
[60,0,1,'long',0,1,'plain'],[150,0,1.05,'curly',1,1,'stripe'],[235,0,.95,'short',0,1,'plain'],[318,0,1.1,'side',0,1,'collar'],[410,0,1,'cap',1,1,'hood'],
[790,0,1,'long',0,1,'collar'],[880,0,1.05,'short',1,1,'stripe'],[965,0,.95,'curly',0,1,'plain'],[1050,0,1.1,'side',1,1,'hood'],[1140,0,1,'cap',0,1,'plain'],
[20,1,1.2,'short',1,1,'hood'],[130,1,1.15,'long',0,1,'plain'],[250,1,1.2,'curly',0,1,'collar'],[365,1,1.15,'side',1,1,'stripe'],[475,1,1.2,'cap',0,1,'hood'],
[725,1,1.2,'side',0,1,'plain'],[835,1,1.15,'short',1,1,'collar'],[945,1,1.2,'long',0,1,'hood'],[1060,1,1.15,'curly',1,1,'plain'],[1170,1,1.2,'cap',0,1,'stripe']];
const el=(n,a,p)=>{const e=document.createElementNS(N,n);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const ink={fill:'#fff',stroke:'#000','stroke-width':3,'stroke-linejoin':'round','stroke-linecap':'round'};
function person(g,[x,row,sc,hr,gl,sm,sh],i){const base=row?352:318;const f=el('g',{class:'f',style:'--d:-'+((i*.37)%3.8).toFixed(2)+'s'},svg);
const b=el('g',{transform:`translate(${x} ${base}) scale(${sc})`},f);
el('path',{...ink,d:'M-52 0C-52-62-32-80 0-80C32-80 52-62 52 0Z'},b);el('path',{...ink,d:'M-10-80V-92H10V-80'},b);
if(sh==='stripe'){el('path',{...ink,fill:'none',d:'M-50-30H50M-51-14H51'},b)}
if(sh==='collar'){el('path',{...ink,fill:'none',d:'M-14-80L0-60L14-80'},b)}
if(sh==='hood'){el('path',{...ink,fill:'none',d:'M-14-78C-14-60-12-40-12-30M14-78C14-60 12-40 12-30'},b)}
el('circle',{...ink,cx:0,cy:-112,r:27},b);
el('path',{...ink,fill:hr==='cap'?'#fff':'#000',d:hair[hr]},b);
el('circle',{cx:-9,cy:-110,r:2.6,fill:'#000'},b);el('circle',{cx:9,cy:-110,r:2.6,fill:'#000'},b);
if(gl){el('circle',{...ink,fill:'none','stroke-width':2.2,cx:-9,cy:-110,r:7.5},b);el('circle',{...ink,fill:'none','stroke-width':2.2,cx:9,cy:-110,r:7.5},b);el('path',{...ink,fill:'none','stroke-width':2.2,d:'M-1.5-110H1.5'},b)}
el('path',{...ink,fill:'none','stroke-width':2.4,d:sm?'M-7-98Q0-92 7-98':'M-6-97H6'},b)}
people.filter(p=>!p[1]).slice(0,5).forEach((p,i)=>person(0,p,i));
people.filter(p=>!p[1]).slice(5).forEach((p,i)=>person(0,p,i+5));
// the centre character: solid black, tall, completely still
const me=el('g',{class:'f me',transform:'translate(600 330) scale(1.3)',fill:'#000',stroke:'#000'},svg);
el('path',{d:'M-54 0C-54-64-34-84 0-84C34-84 54-64 54 0Z'},me);el('rect',{x:-11,y:-98,width:22,height:18},me);el('circle',{cx:0,cy:-116,r:29},me);
el('path',{d:'M-30-120C-34-152 34-152 30-120C18-132-18-132-30-120Z'},me);
people.filter(p=>p[1]).forEach((p,i)=>person(0,p,i+10));
})();

