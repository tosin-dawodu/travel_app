if(!self.define){let e,i={};const r=(r,t)=>(r=new URL(r+".js",t).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(t,o)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let n={};const c=e=>r(e,s),f={module:{uri:s},exports:n,require:c};i[s]=Promise.all(t.map((e=>f[e]||c(e)))).then((e=>(o(...e),n)))}}define(["./workbox-f683aea5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"./form.html",revision:"62e8192bf6e848edbd7cafb06c9525ce"},{url:"./index.html",revision:"82646faa980a3698b6c1d1d46e64e56c"},{url:"main.js",revision:"3a9b66f1b837a0aebb3b276a8f46c63c"}],{})}));