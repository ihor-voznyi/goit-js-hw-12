import{a as h,S as L,i as l}from"./assets/vendor-cd34AgZ1.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const b="45522161-5a4b1fd5e13efcf8857e5e3e0";h.defaults.baseURL="https://pixabay.com/api/";const v=async(e,a=1)=>{try{return(await h.get("",{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:a,per_page:15}})).data}catch(r){throw console.error("Error fetching images:",r),r}},g=document.querySelector(".gallery"),w=new L(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.8}),S=e=>`<li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img
                class="gallery-image"
                src="${e.webformatURL}"
                data-source="${e.largeImageURL}"
                alt="${e.tags}"
                />
            </a>
            <div class="info">
                <p class="text-info">Likes: <span class="number-info">${e.likes}</span></p>
                <p class="text-info">Views: <span class="number-info">${e.views}</span></p>
                <p class="text-info">Comments: <span class="number-info">${e.comments}</span></p>
                <p class="text-info">Downloads: <span class="number-info">${e.downloads}</span></p>
            </div>
        </li>`,f=async(e,a=!1)=>{if(a&&(g.innerHTML=""),e.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const r=e.map(S).join("");g.insertAdjacentHTML("beforeend",r),w.refresh()},m=document.querySelector(".search-form"),p=document.querySelector(".loader"),o=document.querySelector(".load-more"),P=document.querySelector(".gallery");let n=1,i="",d=0;const q=()=>{p.classList.remove("hidden")},$=()=>{p.classList.add("hidden")},x=e=>{e.preventDefault(),i=m.elements.user_query.value.trim(),i&&(n=1,y(i,n))},y=async(e,a)=>{q();try{const r=await v(e,a);if(d=r.totalHits,d===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),o.classList.add("hidden"),P.innerHTML="";return}a===1?f(r.hits,!0):(f(r.hits,!1),smoothScroll()),m.reset(),M()}catch(r){console.error("Error fetching images:",r),l.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{$()}},M=()=>{const e=Math.ceil(d/15);n>=e?(o.classList.add("hidden"),l.info({message:"We’re sorry, but you’ve reached the end of search results.",position:"topRight"})):o.classList.remove("hidden")},R=()=>{n++,y(i,n)};m.addEventListener("submit",x);o.addEventListener("click",R);o.classList.add("hidden");
//# sourceMappingURL=index.js.map
