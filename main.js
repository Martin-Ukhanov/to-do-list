(()=>{"use strict";const e=e=>{const t=[];return{getName:()=>e,setName:t=>e=t,getTasks:()=>t,getTask:e=>t.find((t=>t.getName()===e)),addTask:e=>t.push(e),removeTask:e=>{const n=t.find((t=>t.getName()===e));void 0!==n&&t.splice(t.indexOf(n),1)}}},t=(()=>{const t=[];return t.push(e("All")),t.push(e("Today")),t.push(e("This Week")),{getProjects:()=>t,getProject:e=>t.find((t=>t.getName()===e)),addProject:e=>t.push(e),removeProject:e=>{const n=t.find((t=>t.getName()===e));void 0!==n&&t.splice(t.indexOf(n),1)}}})();function n(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function a(e){n(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(e){n(1,arguments);var t=a(e);return t.setHours(0,0,0,0),t}function s(e,t){n(2,arguments);var a=r(e),s=r(t);return a.getTime()===s.getTime()}Math.pow(10,8);var i=36e5;function o(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function c(e,t){n(1,arguments);var a=t||{},r=null==a.additionalDigits?2:o(a.additionalDigits);if(2!==r&&1!==r&&0!==r)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var s,i=g(e);if(i.date){var c=v(i.date,r);s=f(c.restDateString,c.year)}if(!s||isNaN(s.getTime()))return new Date(NaN);var d,l=s.getTime(),u=0;if(i.time&&(u=p(i.time),isNaN(u)))return new Date(NaN);if(!i.timezone){var m=new Date(l+u),N=new Date(0);return N.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),N.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),N}return d=D(i.timezone),isNaN(d)?new Date(NaN):new Date(l+u+d)}var d={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},l=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,u=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,m=/^([+-])(\d{2})(?::?(\d{2}))?$/;function g(e){var t,n={},a=e.split(d.dateTimeDelimiter);if(a.length>2)return n;if(/:/.test(a[0])?t=a[0]:(n.date=a[0],t=a[1],d.timeZoneDelimiter.test(n.date)&&(n.date=e.split(d.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var r=d.timezone.exec(t);r?(n.time=t.replace(r[1],""),n.timezone=r[1]):n.time=t}return n}function v(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),a=e.match(n);if(!a)return{year:NaN,restDateString:""};var r=a[1]?parseInt(a[1]):null,s=a[2]?parseInt(a[2]):null;return{year:null===s?r:100*s,restDateString:e.slice((a[1]||a[2]).length)}}function f(e,t){if(null===t)return new Date(NaN);var n=e.match(l);if(!n)return new Date(NaN);var a=!!n[4],r=N(n[1]),s=N(n[2])-1,i=N(n[3]),o=N(n[4]),c=N(n[5])-1;if(a)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,o,c)?function(e,t,n){var a=new Date(0);a.setUTCFullYear(e,0,4);var r=7*(t-1)+n+1-(a.getUTCDay()||7);return a.setUTCDate(a.getUTCDate()+r),a}(t,o,c):new Date(NaN);var d=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(h[t]||(k(e)?29:28))}(t,s,i)&&function(e,t){return t>=1&&t<=(k(e)?366:365)}(t,r)?(d.setUTCFullYear(t,s,Math.max(r,i)),d):new Date(NaN)}function N(e){return e?parseInt(e):1}function p(e){var t=e.match(u);if(!t)return NaN;var n=T(t[1]),a=T(t[2]),r=T(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,a,r)?n*i+6e4*a+1e3*r:NaN}function T(e){return e&&parseFloat(e.replace(",","."))||0}function D(e){if("Z"===e)return 0;var t=e.match(m);if(!t)return 0;var n="+"===t[1]?-1:1,a=parseInt(t[2]),r=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,r)?n*(a*i+6e4*r):NaN}var h=[31,null,31,30,31,30,31,31,30,31,30,31];function k(e){return e%400==0||e%4==0&&e%100!=0}function y(e,t){n(1,arguments);var r=t||{},s=r.locale,i=s&&s.options&&s.options.weekStartsOn,c=null==i?0:o(i),d=null==r.weekStartsOn?c:o(r.weekStartsOn);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var l=a(e),u=l.getDay(),m=(u<d?7:0)+u-d;return l.setDate(l.getDate()-m),l.setHours(0,0,0,0),l}function w(e,t,a){n(2,arguments);var r=y(e,a),s=y(t,a);return r.getTime()===s.getTime()}(()=>{const a=document.getElementById("toggle-menu-btn"),r=document.getElementById("add-project-btn"),i=document.getElementById("cancel-add-project-btn"),o=document.getElementById("add-project-form"),d=document.getElementById("add-task-btn"),l=document.getElementById("cancel-add-task-btn"),u=document.getElementById("add-task-form"),m=t.getProject("All"),g=t.getProject("Today"),v=t.getProject("This Week");let f=m.getName();const N=e=>{const n=document.createElement("div");return n.classList.add("task"),n.innerHTML+=`\n        <div>\n            <p>${e.getProjectName()}</p>\n            <h2>${e.getName()}</h2>\n            <p>${e.getDueDate()}</p>\n        </div>\n        <button class="material-symbols-outlined">check_box_outline_blank</button>`,n.lastElementChild.addEventListener("click",(()=>{m.removeTask(e.getName()),g.removeTask(e.getName()),v.removeTask(e.getName()),"No Project"!==e.getProjectName()&&t.getProject(e.getProjectName()).removeTask(e.getName()),T(f)})),n},p=()=>{const e=document.querySelector("nav.default-projects"),n=document.querySelector("nav.custom-projects");e.innerHTML="",n.innerHTML="";for(const a of t.getProjects()){const t=a.getName(),r=document.createElement("button");let s;switch(r.classList.add("project"),t){case m.getName():s="calendar_month";break;case g.getName():s="today";break;case v.getName():s="date_range";break;default:s="checklist"}r.innerHTML=`\n            <span class="material-symbols-outlined">${s}</span>\n            <p>${t}</p>`,t===m.getName()||t===g.getName()||t===v.getName()?e.appendChild(r):n.appendChild(r),r.addEventListener("click",(()=>{"Today"===t||"This Week"===t?(d.classList.remove("active"),u.classList.remove("active")):d.classList.add("active"),document.querySelectorAll("#menu nav button.project").forEach((e=>{e.classList.remove("active")})),r.classList.add("active"),T(t)}))}},T=e=>{const n=document.getElementById("tasks-grid"),a=t.getProject(e),r=document.querySelector("#content h2");f=e,r.textContent=e,n.innerHTML="";for(const e of a.getTasks()){const t=N(e);n.appendChild(t)}};p(),T(f),a.addEventListener("click",(()=>{document.getElementById("menu").classList.toggle("active")})),r.addEventListener("click",(()=>{o.classList.add("active"),r.classList.remove("active")})),i.addEventListener("click",(()=>{o.reset(),o.classList.remove("active"),r.classList.add("active")})),o.addEventListener("submit",(n=>{n.preventDefault();const a=document.getElementById("project-name-input").value,s=e(a);t.addProject(s),p(),o.reset(),o.classList.remove("active"),r.classList.add("active")})),d.addEventListener("click",(()=>{u.classList.add("active"),d.classList.remove("active")})),l.addEventListener("click",(()=>{u.reset(),u.classList.remove("active"),d.classList.add("active")})),u.addEventListener("submit",(e=>{const a=document.getElementById("name-input").value,r=document.getElementById("due-date-input").value;e.preventDefault();const i=t.getProject(f);let o=i.getName();"All"!==o&&"Today"!==o&&"This Week"!==o||(o="No Project");const l=((e,t,n)=>({getName:()=>e,setName:t=>e=t,getDueDate:()=>t,setDueDate:e=>t=e,getProjectName:()=>n,setProjectName:e=>n=e}))(a,r,o);i.addTask(l),i.getName()!==m.getName()&&m.addTask(l),function(e){return n(1,arguments),s(e,Date.now())}(c(r))&&g.addTask(l),function(e,t){return n(1,arguments),w(e,Date.now(),t)}(c(r))&&v.addTask(l),T(f),u.reset(),u.classList.remove("active"),d.classList.add("active")}))})()})();