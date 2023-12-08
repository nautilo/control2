"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3925],{3925:(E,R,y)=>{y.r(R),y.d(R,{startInputShims:()=>q});var b=y(5861),T=y(8360),m=y(839),N=y(7484),h=y(6225);y(4874);const P=new WeakMap,M=(e,t,o,s=0,r=!1)=>{P.has(e)!==o&&(o?Z(e,t,s,r):G(e,t))},Z=(e,t,o,s=!1)=>{const r=t.parentNode,n=t.cloneNode(!1);n.classList.add("cloned-input"),n.tabIndex=-1,s&&(n.disabled=!0),r.appendChild(n),P.set(e,n);const i="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${i}px,${o}px,0) scale(0)`},G=(e,t)=>{const o=P.get(e);o&&(P.delete(e),o.remove()),e.style.pointerEvents="",t.style.transform=""},C="input, textarea, [no-blur], [contenteditable]",F="$ionPaddingTimer",B=(e,t,o)=>{const s=e[F];s&&clearTimeout(s),t>0?e.style.setProperty("--keyboard-offset",`${t}px`):e[F]=setTimeout(()=>{e.style.setProperty("--keyboard-offset","0px"),o&&o()},120)},W=(e,t,o)=>{e.addEventListener("focusout",()=>{t&&B(t,0,o)},{once:!0})};let g=0;const x="data-ionic-skip-scroll-assist",V=(e,t,o,s,r,n,a,i=!1)=>{const l=n&&(void 0===a||a.mode===N.a.None);let L=!1;const u=void 0!==h.w?h.w.innerHeight:0,v=_=>{!1!==L?j(e,t,o,s,_.detail.keyboardHeight,l,i,u,!1):L=!0},c=()=>{L=!1,null==h.w||h.w.removeEventListener("ionKeyboardDidShow",v),e.removeEventListener("focusout",c,!0)},f=function(){var _=(0,b.Z)(function*(){t.hasAttribute(x)?t.removeAttribute(x):(j(e,t,o,s,r,l,i,u),null==h.w||h.w.addEventListener("ionKeyboardDidShow",v),e.addEventListener("focusout",c,!0))});return function(){return _.apply(this,arguments)}}();return e.addEventListener("focusin",f,!0),()=>{e.removeEventListener("focusin",f,!0),null==h.w||h.w.removeEventListener("ionKeyboardDidShow",v),e.removeEventListener("focusout",c,!0)}},K=e=>{document.activeElement!==e&&(e.setAttribute(x,"true"),e.focus())},j=function(){var e=(0,b.Z)(function*(t,o,s,r,n,a,i=!1,l=0,L=!0){if(!s&&!r)return;const u=((e,t,o,s)=>{var r;return((e,t,o,s)=>{const r=e.top,n=e.bottom,a=t.top,l=a+15,u=Math.min(t.bottom,s-o)-50-n,v=l-r,c=Math.round(u<0?-u:v>0?-v:0),f=Math.min(c,r-a),w=Math.abs(f)/.3;return{scrollAmount:f,scrollDuration:Math.min(400,Math.max(150,w)),scrollPadding:o,inputSafeY:4-(r-l)}})((null!==(r=e.closest("ion-item,[ion-item]"))&&void 0!==r?r:e).getBoundingClientRect(),t.getBoundingClientRect(),o,s)})(t,s||r,n,l);if(s&&Math.abs(u.scrollAmount)<4)return K(o),void(a&&null!==s&&(B(s,g),W(o,s,()=>g=0)));if(M(t,o,!0,u.inputSafeY,i),K(o),(0,m.r)(()=>t.click()),a&&s&&(g=u.scrollPadding,B(s,g)),typeof window<"u"){let v;const c=function(){var _=(0,b.Z)(function*(){void 0!==v&&clearTimeout(v),window.removeEventListener("ionKeyboardDidShow",f),window.removeEventListener("ionKeyboardDidShow",c),s&&(yield(0,T.c)(s,0,u.scrollAmount,u.scrollDuration)),M(t,o,!1,u.inputSafeY),K(o),a&&W(o,s,()=>g=0)});return function(){return _.apply(this,arguments)}}(),f=()=>{window.removeEventListener("ionKeyboardDidShow",f),window.addEventListener("ionKeyboardDidShow",c)};if(s){const _=yield(0,T.g)(s);if(L&&u.scrollAmount>_.scrollHeight-_.clientHeight-_.scrollTop)return"password"===o.type?(u.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",f)):window.addEventListener("ionKeyboardDidShow",c),void(v=setTimeout(c,1e3))}c()}});return function(o,s,r,n,a,i){return e.apply(this,arguments)}}(),q=function(){var e=(0,b.Z)(function*(t,o){const s=document,r="ios"===o,n="android"===o,a=t.getNumber("keyboardHeight",290),i=t.getBoolean("scrollAssist",!0),l=t.getBoolean("hideCaretOnScroll",r),L=t.getBoolean("inputBlurring",r),u=t.getBoolean("scrollPadding",!0),v=Array.from(s.querySelectorAll("ion-input, ion-textarea")),c=new WeakMap,f=new WeakMap,_=yield N.K.getResizeMode(),w=function(){var S=(0,b.Z)(function*(d){yield new Promise(I=>(0,m.c)(d,I));const p=d.shadowRoot||d,D=p.querySelector("input")||p.querySelector("textarea"),A=(0,T.f)(d),H=A?null:d.closest("ion-footer");if(D){if(A&&l&&!c.has(d)){const I=((e,t,o)=>{if(!o||!t)return()=>{};const s=i=>{(e=>e===e.getRootNode().activeElement)(t)&&M(e,t,i)},r=()=>M(e,t,!1),n=()=>s(!0),a=()=>s(!1);return(0,m.a)(o,"ionScrollStart",n),(0,m.a)(o,"ionScrollEnd",a),t.addEventListener("blur",r),()=>{(0,m.b)(o,"ionScrollStart",n),(0,m.b)(o,"ionScrollEnd",a),t.removeEventListener("blur",r)}})(d,D,A);c.set(d,I)}if("date"!==D.type&&"datetime-local"!==D.type&&(A||H)&&i&&!f.has(d)){const I=V(d,D,A,H,a,u,_,n);f.set(d,I)}}});return function(p){return S.apply(this,arguments)}}();L&&(()=>{let e=!0,t=!1;const o=document;(0,m.a)(o,"ionScrollStart",()=>{t=!0}),o.addEventListener("focusin",()=>{e=!0},!0),o.addEventListener("touchend",a=>{if(t)return void(t=!1);const i=o.activeElement;if(!i||i.matches(C))return;const l=a.target;l!==i&&(l.matches(C)||l.closest(C)||(e=!1,setTimeout(()=>{e||i.blur()},50)))},!1)})();for(const S of v)w(S);s.addEventListener("ionInputDidLoad",S=>{w(S.detail)}),s.addEventListener("ionInputDidUnload",S=>{(S=>{if(l){const d=c.get(S);d&&d(),c.delete(S)}if(i){const d=f.get(S);d&&d(),f.delete(S)}})(S.detail)})});return function(o,s){return e.apply(this,arguments)}}()}}]);