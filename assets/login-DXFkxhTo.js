import{l as c,t as d,a as l}from"./toast-CCRlhVFf.js";/* empty css             */const e=document.getElementById("username"),t=document.getElementById("password"),n=document.getElementById("username-error"),o=document.getElementById("password-error"),r=document.getElementById("login-button"),m=()=>{n.innerText="",o.innerText="",e.classList.remove("input-error"),t.classList.remove("input-error")};r.addEventListener("click",async a=>{m(),a.preventDefault(),r.disabled=!0,r.innerText="Logging in...",e.value||(e.classList.add("input-error"),e.focus(),n.innerText="Username is required."),t.value||(t.classList.add("input-error"),e.value&&t.focus(),o.innerText="Password is required.");const s=await c(e.value,t.value);s.success?(d(s.message),e.value="",t.value="",setTimeout(()=>{const i=s.data.token,u=s.data.user;localStorage.setItem("token",i),localStorage.setItem("user",JSON.stringify(u)),window.location.href="/"},1e3)):l(s.message),r.disabled=!1,r.innerText="Log in"});
