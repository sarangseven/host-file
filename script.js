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

// ===== crowd footer: two layers of people cross the road while the main character stands perfectly still =====
(()=>{const svg=$('#crowd');if(!svg)return;const N='http://www.w3.org/2000/svg';
const el=(n,a,p)=>{const e=document.createElementNS(N,n);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const ink={stroke:'#111','stroke-width':2.6,'stroke-linejoin':'round','stroke-linecap':'round'};
const BUR='#6b1b34',DK='#1a0a10';
const HAIR={short:'M-16-172C-18-192 14-194 16-176C8-184-6-182-16-172Z',long:'M-16-172C-20-198 18-198 16-174L-4-142C-14-150-18-162-16-172Z',bun:'M-16-172C-18-192 14-194 16-176C8-184-6-182-16-172Z'};
// direction, step time (s per step), hair, top, accessory, sunglasses
const POOL=[[1,.7,'bun','coat','bag',0],[-1,.66,'short','jacket','pack',1],[1,.62,'beanie','jacket','',0],[-1,.74,'long','coat','',0],
[1,.68,'cap','jacket','pack',1],[-1,.6,'short','scarf','',0],[1,.72,'long','coat','bag',0],[-1,.64,'beanie','jacket','',0],
[-1,.63,'short','jacket','pack',0],[1,.7,'long','coat','bag',0],[-1,.76,'beanie','scarf','',1],[1,.6,'cap','jacket','pack',0],
[-1,.66,'bun','coat','',0],[1,.72,'short','jacket','bag',1],[-1,.61,'long','jacket','',0],[1,.68,'beanie','coat','pack',0]];
let lastW=0;
function build(){svg.replaceChildren();lastW=svg.clientWidth;const H=392,W=Math.max(420,Math.round(svg.clientWidth*H/Math.max(svg.clientHeight,1)));
svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.setProperty('--x0','-190px');svg.style.setProperty('--x1',(W+190)+'px');
const road=el('g',{},svg);for(let i=0;i<Math.ceil(W/84)+2;i++)el('path',{d:`M${i*84-20} 352H${i*84+36}L${i*84+20} 392H${i*84-36}Z`,fill:'#f0f0f0',stroke:'none'},road);
// one walker: layer 0 = behind the main character, layer 1 = in front of him (larger, closer to the camera)
function walker([dir,st,hair,top,acc,gl],i,layer){
 const sc=layer?1.25:1.1,base=layer?394:330;
 // walking speed is tied to stride length so feet never slide
 const speed=(.85+((i*37)%10)/40)*76*sc/st,dur=(W+380)/speed,po=((i*.29)%1)*2*st;
 const o=el('g',{class:'pass '+(dir>0?'r':'l'),style:`--dur:${dur.toFixed(2)}s;--dl:-${(((i*.173+layer*.41)%1)*dur).toFixed(2)}s;--st:${st}s;--po:${po.toFixed(2)}s`},svg);
 const g=el('g',{transform:`translate(0 ${base}) scale(${dir*sc} ${sc})`},o);const bob=el('g',{class:'bob'},g);
 const leg=(side,fill)=>{const h=el('g',{transform:'translate(0 -88)'},bob);const th=el('g',{class:'th '+side},h);
  el('path',{...ink,fill,d:'M-8 0C-9 14-8 28-7 44L7 44C8 28 9 14 8 0Z'},th);
  const k=el('g',{transform:'translate(0 44)'},th);const kn=el('g',{class:'kn '+side},k);
  el('path',{...ink,fill,d:'M-7 0C-7 14-6 28-6 38L6 38C6 28 7 14 7 0Z'},kn);el('path',{...ink,fill:'#fff',d:'M-7 38L-7 46L17 46C17 41 11 38 6 38Z'},kn)};
 leg('a','#ededed');leg('b','#fff');
 const up=el('g',{class:'up'},bob);
 const arm=(side,fill)=>{const s=el('g',{transform:'translate(0 -146)'},up);const a=el('g',{class:'arm '+side},s);
  el('path',{...ink,fill,d:'M-6 0C-7 12-7 24-6 34L6 34C7 24 7 12 6 0Z'},a);
  const e=el('g',{transform:'translate(0 34)'},a);const f=el('g',{class:'fore '+side},e);
  el('path',{...ink,fill,d:'M-5.5 0C-6 10-6 20-5 28L5 28C6 20 6 10 5.5 0Z'},f);el('circle',{...ink,fill:'#fff',cx:0,cy:32,r:5.5},f)};
 arm('a','#ededed');
 if(acc==='pack')el('rect',{...ink,fill:'#f3f3f3',x:-27,y:-146,width:15,height:46,rx:6},up);
 const long=top==='coat';
 el('path',{...ink,fill:'#fff',d:long?'M-15-150C-22-126-22-96-27-52L27-52C22-96 21-126 14-150C7-156-7-156-15-150Z':'M-15-150C-21-128-20-100-18-80L18-80C20-100 21-128 14-150C7-156-7-156-15-150Z'},up);
 el('path',{...ink,fill:'none','stroke-width':2,d:long?'M2-150V-54M-18-84H-6':'M2-150V-82'},up);
 if(top==='scarf')el('path',{...ink,fill:'#fff',d:'M-12-156H12V-146H-12Z'},up);
 if(acc==='bag'){el('path',{...ink,fill:'none','stroke-width':2,d:'M-8-150L18-90'},up);el('rect',{...ink,fill:'#fff',x:6,y:-100,width:22,height:18,rx:3},up)}
 arm('b','#fff');
 el('rect',{...ink,fill:'#fff',x:-4,y:-158,width:8,height:10},up);
 const hd=el('g',{class:'hd'},up);
 el('circle',{...ink,fill:'#fff',cx:0,cy:-172,r:16},hd);
 if(hair==='beanie'){el('path',{...ink,fill:'#fff',d:'M-17-176C-17-200 17-200 17-176Z'},hd);el('path',{...ink,d:'M-18-177H18'},hd);el('circle',{...ink,fill:'#fff',cx:0,cy:-197,r:5},hd)}
 else if(hair==='cap'){el('path',{...ink,fill:'#fff',d:'M-17-178C-16-198 16-198 17-178Z'},hd);el('path',{...ink,fill:'#fff',d:'M10-179H29L27-175H10Z'},hd)}
 else{el('path',{...ink,fill:'#111',d:HAIR[hair]},hd);if(hair==='bun')el('circle',{...ink,fill:'#111',cx:-12,cy:-190,r:7},hd)}
 if(gl)el('rect',{fill:'#111',x:3,y:-178,width:15,height:6,rx:2},hd);else el('circle',{cx:8,cy:-173,r:2,fill:'#111'},hd);
 el('path',{...ink,fill:'none','stroke-width':2,d:'M9-164H13'},hd)}
const backN=Math.max(7,Math.round(W/85)),frontN=Math.max(3,Math.round(W/280));
for(let i=0;i<backN;i++)walker(POOL[(i*5)%16],i,0);
// main character: burgundy suit, front view, never moves
const me=el('g',{transform:`translate(${W/2} 340) scale(1.1)`,stroke:DK,'stroke-width':2.8,'stroke-linejoin':'round','stroke-linecap':'round'},svg);
el('path',{fill:BUR,d:'M-24-108L-27-12L-6-12L-2-108ZM24-108L27-12L6-12L2-108Z'},me);
el('path',{fill:DK,d:'M-32-12L-32 0L-3 0L-3-12ZM32-12L32 0L3 0L3-12Z'},me);
el('path',{fill:BUR,d:'M-34-178C-44-164-44-130-42-90L-40-84L40-84L42-90C44-130 44-164 34-178C20-188-20-188-34-178Z'},me);
el('path',{fill:BUR,d:'M-44-174C-53-148-53-108-51-80L-38-80C-38-110-38-150-34-176ZM44-174C53-148 53-108 51-80L38-80C38-110 38-150 34-176Z'},me);
el('path',{fill:DK,d:'M-12-184L0-142L12-184Z'},me);
el('path',{fill:'none',d:'M-12-184L-20-150L0-120M12-184L20-150L0-120'},me);
el('path',{fill:'#fff','stroke-width':1.6,d:'M-30-150L-20-150L-20-143L-30-143Z'},me);
el('circle',{fill:'#fff',cx:-44,cy:-75,r:6},me);el('circle',{fill:'#fff',cx:44,cy:-75,r:6},me);
el('rect',{fill:'#fff',x:-5,y:-196,width:10,height:14},me);
el('circle',{fill:'#fff',cx:0,cy:-208,r:20},me);
el('path',{fill:DK,d:'M-21-210C-24-236 24-238 21-210C14-222-14-222-21-210Z'},me);
el('rect',{fill:DK,x:-15,y:-214,width:12,height:7,rx:3},me);el('rect',{fill:DK,x:3,y:-214,width:12,height:7,rx:3},me);
el('path',{fill:'none','stroke-width':2,d:'M-4-197Q0-194 4-197'},me);
// second layer: walks in front of him
for(let i=0;i<frontN;i++)walker(POOL[(i*5+3)%16],i+20,1)}
build();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(Math.abs(svg.clientWidth-lastW)>8)build()},200)});
const sec=svg.closest('.crowd');new IntersectionObserver(es=>es.forEach(e=>sec.classList.toggle('off',!e.isIntersecting))).observe(sec);
})();
