var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var i=o("iQIUW"),a=o("dSs1Y");const r=document.querySelector(".cards__list"),d=document.querySelector(".filter-watched__btn"),c=document.querySelector(".filter-queue__btn");let s="";function l(e){const t=e.map((e=>`<li class="cards__item" data-id="${e.id}">\n\n     \n          <button type="submit" class="cards__remove-item" data-id="${e.id}">-</button>\n      <img\n            class="cards__photo"\n            alt="movie"\n            src="https://image.tmdb.org/t/p/w500${e.poster_path}"\n            \n            loading="lazy"\n          />\n          <h3 class="cards__title">${e.title}</h3>\n          <p class="cards__info">${function(e){const t=e.map((e=>e.name));return t.length>2?t.slice(0,2):t}(e.genres).join(", ")} | ${e.release_date.split("-")[0]} <span class="cards__vote"> ${e.vote_average.toFixed(1)}</span></p>\n        </li>`)).join("");r.insertAdjacentHTML("beforeend",t);document.querySelectorAll(".cards__remove-item").forEach((e=>{e.addEventListener("click",u)}))}function u(e){const t=Number(e.target.dataset.id);switch(console.log(t),s){case"watched":r.innerHTML="";const e=JSON.parse(localStorage.getItem("watched")).filter((({id:e})=>e!==t));if(console.log(e),localStorage.setItem("watched",JSON.stringify(e)),!e.length)return i.Notify.info("No added movies!");l(e);break;case"queue":r.innerHTML="";const n=JSON.parse(localStorage.getItem("queue")).filter((({id:e})=>e!==t));if(localStorage.setItem("queue",JSON.stringify(n)),!n.length)return i.Notify.info("No added movies!");l(n)}}d.addEventListener("click",(function(){s="watched",a.Loading.standard(),a.Loading.remove(800),r.innerHTML="";const e=JSON.parse(localStorage.getItem("watched"))||[];if(!e.length)return i.Notify.info("No added movies!");l(e)})),c.addEventListener("click",(function(){s="queue",a.Loading.standard(),a.Loading.remove(800),r.innerHTML="";const e=JSON.parse(localStorage.getItem("queue"))||[];if(!e.length)return i.Notify.info("No added movies!");l(e)})),window.location.pathname,d.focus(),d.click(),o("bTcpz"),o("bO1YF"),o("37v9V"),o("7bbyT");
//# sourceMappingURL=library.e5d2550a.js.map