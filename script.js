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

// ===== crowd footer: caricature street crowd in two alternating, depth-blurred rows; the main character never moves =====
(()=>{const svg=$('#crowd');if(!svg)return;const N='http://www.w3.org/2000/svg';
const el=(n,a,p)=>{const e=document.createElementNS(N,n);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const P=(d,cls,p,extra)=>el('path',{d,class:cls,...extra},p);
const ME={src:'assets/sarang.webp',ar:.6636,h:345};
// original caricature designs, inspired by everyday winter street style (beanies, puffers, scarves, bags, umbrellas)
// [dir, step s, hair, top, tone(f0/f1/f2), accessory, glasses, beard, mood]
const POOL=[[1,.68,'beanie','puffer','f2','pack',0,1,1],[-1,.64,'bun','coat','f1','tote',1,0,0],[1,.72,'cap','hoodie','f0','pack',0,0,2],[-1,.7,'long','coat','f2','tote',0,0,1],
[1,.62,'short','puffer','f1','',1,1,0],[-1,.76,'beanie','scarf','f0','pack',0,0,1],[1,.66,'curly','puffer','f2','tote',0,0,2],[-1,.74,'hood','hoodie','f1','',1,0,0],
[1,.7,'long','coat','f0','umbrella',0,0,1],[-1,.64,'bald','puffer','f2','pack',1,1,0],[1,.76,'bun','scarf','f1','tote',0,0,2],[-1,.68,'cap','puffer','f0','',0,1,1],
[1,.63,'short','coat','f2','pack',1,0,0],[-1,.72,'beanie','puffer','f1','umbrella',0,0,1],[1,.74,'curly','hoodie','f0','tote',0,1,2],[-1,.66,'hood','scarf','f2','',0,0,0]];
let lastW=0;const lite=matchMedia('(max-width:600px)').matches;
function build(){svg.replaceChildren();lastW=svg.clientWidth;const H=392,W=Math.max(420,Math.round(svg.clientWidth*H/Math.max(svg.clientHeight,1)));
svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.setProperty('--x0','-190px');svg.style.setProperty('--x1',(W+190)+'px');
const defs=el('defs',{},svg);
for(const[id,sd]of[['bl0',1.1],['bl1',2.3],['soft',12]]){const f=el('filter',{id,x:id==='soft'?'-30%':'-5%',y:id==='soft'?'-30%':'-5%',width:id==='soft'?'160%':'110%',height:id==='soft'?'160%':'110%'},defs);el('feGaussianBlur',{stdDeviation:sd},f)}
const lg=el('linearGradient',{id:'beam',x1:0,y1:0,x2:0,y2:1},defs);
el('stop',{offset:'0',class:'bs','stop-opacity':.30},lg);el('stop',{offset:'.7',class:'bs','stop-opacity':.10},lg);el('stop',{offset:'1',class:'bs','stop-opacity':.0},lg);
const rg=el('radialGradient',{id:'glow'},defs);el('stop',{offset:'0',class:'bs','stop-opacity':.42},rg);el('stop',{offset:'1',class:'bs','stop-opacity':0},rg);
// spotlight (visible in dark mode) + floor glow/shadow under the main character
const cx=W/2,by=352;
el('polygon',{class:'beam',points:`${cx-40},-10 ${cx+40},-10 ${cx+240},${by} ${cx-240},${by}`,fill:'url(#beam)',stroke:'none',filter:'url(#soft)'},svg);
el('ellipse',{class:'floor',cx,cy:by-2,rx:190,ry:20,fill:'url(#glow)',stroke:'none'},svg);
const rows=[el('g',{class:'row',filter:lite?null:'url(#bl0)'},svg)];
function walker(i,layer,ph,parent){
 const [dir,st,hair,top,tone,acc,gl,beard,mood]=POOL[(i*5)%POOL.length];
 const sc=layer?1.56:1.44,base=layer?388:338;
 const speed=(.85+((i*37)%10)/40)*76*sc/st,dur=(W+380)/speed,po=((i*.29)%1)*2*st;
 const o=el('g',{class:'pass '+(dir>0?'r':'l'),style:`--dur:${dur.toFixed(2)}s;--dl:-${(ph*dur).toFixed(2)}s;--st:${st}s;--po:${po.toFixed(2)}s`},parent);
 const g=el('g',{transform:`translate(0 ${base}) scale(${dir*sc} ${sc})`},o);const bob=el('g',{class:'bob'},g);
 const leg=(side,fc)=>{const h=el('g',{transform:'translate(0 -88)'},bob);const th=el('g',{class:'th '+side},h);
  P('M-8 0C-9 14-8 28-7 44L7 44C8 28 9 14 8 0Z','k '+fc,th);
  const kn=el('g',{class:'kn '+side},el('g',{transform:'translate(0 44)'},th));
  P('M-7 0C-7 14-6 28-6 38L6 38C6 28 7 14 7 0Z','k '+fc,kn);P('M-7 38L-7 46L17 46C17 41 11 38 6 38Z','k fi',kn)};
 leg('a','f2');leg('b','f1');
 const up=el('g',{class:'up'},bob);
 const arm=(side,fc)=>{const a=el('g',{class:'arm '+side},el('g',{transform:'translate(0 -146)'},up));
  P('M-6 0C-7 12-7 24-6 34L6 34C7 24 7 12 6 0Z','k '+fc,a);
  const f=el('g',{class:'fore '+side},el('g',{transform:'translate(0 34)'},a));
  P('M-5.5 0C-6 10-6 20-5 28L5 28C6 20 6 10 5.5 0Z','k '+fc,f);el('circle',{class:'k f0',cx:0,cy:32,r:5.5},f)};
 arm('a','f1');
 if(acc==='pack')el('rect',{class:'k f1',x:-29,y:-146,width:17,height:48,rx:7},up);
 if(acc==='umbrella'){P('M-1-210V-150','k',up);P('M-46-206Q0-244 46-206Q30-214 15-208Q0-216-15-208Q-30-214-46-206Z','k f2',up)}
 const long=top==='coat';
 P(long?'M-16-150C-24-126-24-96-30-52L30-52C24-96 22-126 15-150C8-157-8-157-16-150Z':'M-17-150C-24-128-23-100-20-78L20-78C23-100 24-128 17-150C9-157-9-157-17-150Z','k '+tone,up);
 if(top==='puffer')P('M-22-130H22M-22-112H22M-21-94H21','k',up,{'stroke-width':1.8,fill:'none'});
 else P(long?'M3-150V-54M-20-84H-6':'M3-150V-80','k',up,{'stroke-width':1.8,fill:'none'});
 if(top==='scarf'||top==='hoodie'){P('M-14-158H14V-146H-14Z','k f2',up);if(top==='scarf')P('M-8-148L-10-120L0-122L2-148','k f2',up)}
 if(acc==='tote'){P('M-8-150L18-92','k',up,{fill:'none','stroke-width':1.8});el('rect',{class:'k f0',x:5,y:-104,width:26,height:22,rx:3},up)}
 arm('b',tone);
 el('rect',{class:'k f0',x:-4,y:-162,width:8,height:12},up);
 const hd=el('g',{class:'hd'},up);
 if(hair==='hood')P('M-26-174C-30-214 30-214 26-174L20-160L-20-160Z','k '+tone,hd);
 el('circle',{class:'k f0',cx:0,cy:-178,r:22},hd);
 const HC={short:'M-22-178C-24-206 18-208 22-184C12-192-8-190-22-178Z',long:'M-22-178C-27-210 23-210 22-180L-2-144C-18-152-24-166-22-178Z',bun:'M-22-178C-24-206 18-208 22-184C12-192-8-190-22-178Z',curly:'M-22-180C-26-196-12-204-4-200C4-208 20-202 20-190C24-182 22-178 20-176C10-186-10-184-22-180Z'};
 if(hair==='beanie'){P('M-23-184C-23-212 23-212 23-184Z','k '+tone,hd);P('M-24-185H24','k',hd);el('circle',{class:'k f0',cx:0,cy:-212,r:6},hd)}
 else if(hair==='cap'){P('M-23-186C-22-210 22-210 23-186Z','k '+tone,hd);P('M12-187H34L31-182H12Z','k '+tone,hd)}
 else if(HC[hair]){P(HC[hair],'k fi',hd);if(hair==='bun')el('circle',{class:'k fi',cx:-15,cy:-204,r:8},hd)}
 // caricature face: big nose, expressive brows
 P('M20-182C31-178 30-171 21-170','k f0',hd);
 el('circle',{class:'fi',cx:9,cy:-181,r:2.8},hd);el('circle',{class:'fi',cx:-5,cy:-181,r:2.8},hd);
 P(['M3-188L13-186M-9-186L-1-188','M3-187L13-189M-9-189L-1-187','M3-186L13-186M-9-186L-1-186'][mood],'k',hd,{fill:'none','stroke-width':2});
 if(gl){el('circle',{class:'k',cx:9,cy:-181,r:7.5,fill:'none','stroke-width':1.8},hd);el('circle',{class:'k',cx:-5,cy:-181,r:7.5,fill:'none','stroke-width':1.8},hd)}
 if(beard)P('M-17-172C-15-156 15-156 19-172C9-165-8-165-17-172Z','k fi',hd);
 P(mood===1?'M6-166Q12-163 17-167':mood===2?'M6-165Q12-169 17-165':'M6-166H17','k',hd,{fill:'none','stroke-width':2,stroke:beard?'var(--f0)':null})}
const total=Math.max(8,Math.round(W/115)),nb=Math.ceil(total/2),nf=Math.floor(total/2);
for(let k=0;k<nb;k++)walker(k*2,0,(k+((k*37)%10)/25)/nb,rows[0]);
// main character: your photo, standing perfectly still between the two rows
const w=ME.h*ME.ar;
el('image',{class:'me',href:ME.src,x:cx-w/2,y:by-ME.h,width:w,height:ME.h,preserveAspectRatio:'xMidYMax meet'},svg);
rows.push(el('g',{class:'row',filter:lite?null:'url(#bl1)'},svg));
for(let k=0;k<nf;k++)walker(k*2+1,1,(k+.5+((k*53)%10)/30)/nf,rows[1])}
build();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(Math.abs(svg.clientWidth-lastW)>8)build()},200)});
const sec=svg.closest('.crowd');new IntersectionObserver(es=>es.forEach(e=>sec.classList.toggle('off',!e.isIntersecting))).observe(sec);
})();
