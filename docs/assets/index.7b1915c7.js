import{r as u,c as f,a as p,o as _,b as m,d as h,e as c,f as v}from"./vendor.9d77f614.js";const y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}};y();var g=(i,t)=>{const s=i.__vccOpts||i;for(const[r,e]of t)s[r]=e;return s};const b={name:"App"},w={class:"App"};function L(i,t,s,r,e,n){const o=u("router-view");return _(),f("div",w,[p(o)])}var $=g(b,[["render",L],["__scopeId","data-v-60ed420e"]]);const E="modulepreload",a={},A="./",O=function(t,s){return!s||s.length===0?t():Promise.all(s.map(r=>{if(r=`${A}${r}`,r in a)return;a[r]=!0;const e=r.endsWith(".css"),n=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${n}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":E,e||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),e)return new Promise((l,d)=>{o.addEventListener("load",l),o.addEventListener("error",d)})})).then(()=>t())};var k=m({history:h(),routes:[{path:"/:pathMatch(.*)*",redirect:"/"},{path:"/",component:()=>O(()=>import("./Home.d0421be4.js"),["assets/Home.d0421be4.js","assets/Home.be07da33.css","assets/vendor.9d77f614.js"])}]});const x={install(i,t){const s=c(0),r=c(t&&t.base?t.base:0),e=()=>{s.value=window.innerWidth};i.mixin({data(){return{css__rem:s,css__rem__base:r}}}),t&&t.plug&&e(),window.addEventListener("load",e),window.addEventListener("resize",e)}};const P=v($);P.use(x,{base:1920}).use(k).mount("#app");export{g as _};