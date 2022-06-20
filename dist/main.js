(()=>{"use strict";const e=e=>{const t=[];return{getName:()=>e,setName:t=>e=t,getTasks:()=>t,addTask:e=>t.push(e)}},t=(()=>{const t=[];return t.push(e("All")),t.push(e("Today")),t.push(e("This Week")),{getProjects:()=>t,getProject:e=>t.find((t=>t.getName()===e)),addProject:e=>t.push(e),removeProject:e=>{const n=t.find((t=>t.getName()===e));t.splice(t.indexOf(n),1)}}})();function n(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function a(e){n(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(e){n(1,arguments);var t=a(e);return t.setHours(0,0,0,0),t}function s(e,t){n(2,arguments);var a=r(e),s=r(t);return a.getTime()===s.getTime()}Math.pow(10,8);var i=36e5;function o(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function c(e,t){n(1,arguments);var a=t||{},r=null==a.additionalDigits?2:o(a.additionalDigits);if(2!==r&&1!==r&&0!==r)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var s,i=g(e);if(i.date){var c=v(i.date,r);s=f(c.restDateString,c.year)}if(!s||isNaN(s.getTime()))return new Date(NaN);var d,u=s.getTime(),l=0;if(i.time&&(l=N(i.time),isNaN(l)))return new Date(NaN);if(!i.timezone){var m=new Date(u+l),p=new Date(0);return p.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),p.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),p}return d=T(i.timezone),isNaN(d)?new Date(NaN):new Date(u+l+d)}var d={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},u=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,l=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,m=/^([+-])(\d{2})(?::?(\d{2}))?$/;function g(e){var t,n={},a=e.split(d.dateTimeDelimiter);if(a.length>2)return n;if(/:/.test(a[0])?t=a[0]:(n.date=a[0],t=a[1],d.timeZoneDelimiter.test(n.date)&&(n.date=e.split(d.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var r=d.timezone.exec(t);r?(n.time=t.replace(r[1],""),n.timezone=r[1]):n.time=t}return n}function v(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),a=e.match(n);if(!a)return{year:NaN,restDateString:""};var r=a[1]?parseInt(a[1]):null,s=a[2]?parseInt(a[2]):null;return{year:null===s?r:100*s,restDateString:e.slice((a[1]||a[2]).length)}}function f(e,t){if(null===t)return new Date(NaN);var n=e.match(u);if(!n)return new Date(NaN);var a=!!n[4],r=p(n[1]),s=p(n[2])-1,i=p(n[3]),o=p(n[4]),c=p(n[5])-1;if(a)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,o,c)?function(e,t,n){var a=new Date(0);a.setUTCFullYear(e,0,4);var r=7*(t-1)+n+1-(a.getUTCDay()||7);return a.setUTCDate(a.getUTCDate()+r),a}(t,o,c):new Date(NaN);var d=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(h[t]||(y(e)?29:28))}(t,s,i)&&function(e,t){return t>=1&&t<=(y(e)?366:365)}(t,r)?(d.setUTCFullYear(t,s,Math.max(r,i)),d):new Date(NaN)}function p(e){return e?parseInt(e):1}function N(e){var t=e.match(l);if(!t)return NaN;var n=D(t[1]),a=D(t[2]),r=D(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,a,r)?n*i+6e4*a+1e3*r:NaN}function D(e){return e&&parseFloat(e.replace(",","."))||0}function T(e){if("Z"===e)return 0;var t=e.match(m);if(!t)return 0;var n="+"===t[1]?-1:1,a=parseInt(t[2]),r=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,r)?n*(a*i+6e4*r):NaN}var h=[31,null,31,30,31,30,31,31,30,31,30,31];function y(e){return e%400==0||e%4==0&&e%100!=0}function w(e,t){n(1,arguments);var r=t||{},s=r.locale,i=s&&s.options&&s.options.weekStartsOn,c=null==i?0:o(i),d=null==r.weekStartsOn?c:o(r.weekStartsOn);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var u=a(e),l=u.getDay(),m=(l<d?7:0)+l-d;return u.setDate(u.getDate()-m),u.setHours(0,0,0,0),u}function L(e,t,a){n(2,arguments);var r=w(e,a),s=w(t,a);return r.getTime()===s.getTime()}(()=>{const a=document.getElementById("toggle-menu-btn"),r=document.querySelectorAll("#menu nav button.project"),i=document.getElementById("add-project-btn"),o=document.getElementById("add-project-form"),d=document.getElementById("add-task-btn"),u=document.getElementById("add-task-form");let l="All";const m=e=>{const t=document.createElement("button");return t.classList.add("project"),t.innerHTML=`\n            <span class="material-symbols-outlined">checklist</span>\n            <p>${e}</p>`,t},g=e=>{const t=document.createElement("div");return t.classList.add("task"),t.innerHTML+=`\n            <div>\n                <p>${e.getProject()}</p>\n                <h2>${e.getName()}</h2>\n                <p>${e.getDueDate()}</p>\n            </div>\n            <button class="material-symbols-outlined">check_box_outline_blank</button>`,t},v=e=>{const n=document.getElementById("tasks-grid"),a=t.getProject(e),r=document.querySelector("#content h2");l=e,r.textContent=e,n.innerHTML="";for(const e of a.getTasks()){const t=g(e);n.appendChild(t)}};v(l),a.addEventListener("click",(()=>{document.getElementById("menu").classList.toggle("active")})),r.forEach((e=>{e.addEventListener("click",(()=>{const t=e.lastElementChild.textContent;"Today"===t||"This Week"===t?(d.classList.remove("active"),u.classList.remove("active")):d.classList.add("active"),r.forEach((e=>{e.classList.remove("active")})),e.classList.add("active"),v(t)}))})),i.addEventListener("click",(()=>{o.classList.add("active"),i.classList.remove("active")})),document.getElementById("cancel-add-project-btn").addEventListener("click",(()=>{o.reset(),o.classList.remove("active"),i.classList.add("active")})),o.addEventListener("submit",(n=>{n.preventDefault();const a=document.getElementById("project-name-input").value,r=e(a);t.addProject(r),(()=>{const e=document.querySelector("nav.custom-projects");e.innerHTML="";for(const n of t.getProjects()){const t=n.getName();if("All"!==t&&"Today"!==t&&"This Week"!==t){const n=m(t);e.appendChild(n)}}})(),o.reset(),o.classList.remove("active"),i.classList.add("active")})),d.addEventListener("click",(()=>{u.classList.add("active"),d.classList.remove("active")})),document.getElementById("cancel-add-task-btn").addEventListener("click",(()=>{u.reset(),u.classList.remove("active"),d.classList.add("active")})),u.addEventListener("submit",(e=>{const a=document.getElementById("name-input").value,r=document.getElementById("due-date-input").value;e.preventDefault();const i=t.getProject(l);let o=i.getName();"All"!==o&&"Today"!==o&&"This Week"!==o||(o="No Project");const m=((e,t,n)=>({getName:()=>e,setName:t=>e=t,getDueDate:()=>t,setDueDate:e=>t=e,getProject:()=>n,setProject:e=>n=e}))(a,r,o);i.addTask(m),function(e){return n(1,arguments),s(e,Date.now())}(c(r))&&t.getProject("Today").addTask(m),function(e,t){return n(1,arguments),L(e,Date.now(),t)}(c(r))&&t.getProject("This Week").addTask(m),v(l),u.reset(),u.classList.remove("active"),d.classList.add("active")}))})()})();