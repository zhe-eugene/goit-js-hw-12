/* empty css                      */import{a as L,i as v,S as w}from"./assets/vendor-B0OsYOCc.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const M=L.create({baseURL:"https://pixabay.com/api/",params:{key:"49094425-ee2da42b6a4a3e6a1c3a9f546",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}});async function m(e,r){const a=await M.get("",{params:{q:e,page:r}});if(a.data.hits.length===0)throw new Error("No images found");return a.data}function S(e){const{webformatURL:r,largeImageURL:a,tags:n,likes:t,views:s,comments:l,downloads:b}=e;return`<li class="gallery-item">
        <div>
        <a class="gallery-link" href="${a}">
          <img class="gallery-image" src="${r}" alt="${n}" />
        </a>
        </div>
        <ul class="gallery-sublist">
          <li class="gallery-subitem"><p class="sub-text">Likes</p><p class="sub-value">${t}</p></li>
          <li class="gallery-subitem"><p class="sub-text">Views</p><p class="sub-value">${s}</p></li>
          <li class="gallery-subitem"><p class="sub-text">Comments</p><p class="sub-value">${l}</p></li>
          <li class="gallery-subitem"><p class="sub-text">Downloads</p><p class="sub-value">${b}</p></li>
        </ul>
      </li>`}function p(e){return e.map(S).join("")}const o={form:document.querySelector("form"),loader:document.querySelector(".loader"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c,i=1,u="";d();g();o.form.addEventListener("submit",x);o.loadMoreBtn.addEventListener("click",P);function x(e){if(e.preventDefault(),o.gallery.innerHTML="",g(),y(),u=e.target.elements.search.value.trim(),i=1,!u){f("Please enter a search term!"),d();return}m(u,i).then(r=>{o.gallery.innerHTML=p(r.hits),h(r.totalHits),q()}).catch(r=>{f("Sorry, there are no images matching <br> your search query. Please try again!")}).finally(()=>{d()}),e.target.reset()}function P(){y(),i++,m(u,i).then(e=>{o.gallery.insertAdjacentHTML("beforeend",p(e.hits)),h(e.totalHits),c.refresh(),H()}).catch(e=>{f("We're sorry, but you've reached the end of search results."),g()}).finally(()=>{d()})}function y(){o.loader.style.display="block"}function d(){o.loader.style.display="none"}function g(){o.loadMoreBtn.style.display="none"}function h(e){const r=Math.ceil(e/40);i<r?o.loadMoreBtn.style.display="block":(g(),f("We're sorry, but you've reached the end of search results."))}function f(e){v.warning({message:e,titleColor:"#fff",titleSize:"16px",titleLineHeight:"1.5",messageColor:"#fff",messageSize:"16px",messageLineHeight:"1.5",backgroundColor:"#ef4040",iconUrl:"./img/octagon.svg",position:"topRight"})}function q(){c?c.refresh():c=new w(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250})}function H(){const{height:e}=o.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
