function showTab(id){

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));

document.getElementById(id).classList.add("active");

document.querySelectorAll("nav button").forEach(b=>b.classList.remove("active"));

event.target.classList.add("active");

}

function showMarket(id){

document.querySelectorAll(".marketPanel").forEach(p=>p.classList.remove("active"));

document.querySelectorAll(".mTab").forEach(b=>b.classList.remove("active"));

document.getElementById(id).classList.add("active");

event.target.classList.add("active");

}

/* NEWS */

async function loadNews(){

const feed="https://api.allorigins.win/raw?url="+
encodeURIComponent("https://feeds.bbci.co.uk/news/world/rss.xml");

const res=await fetch(feed);
const xml=await res.text();

const parser=new DOMParser();
const data=parser.parseFromString(xml,"text/xml");

const items=data.querySelectorAll("item");

let html="";

items.forEach((item,i)=>{

if(i>10)return;

const title=item.querySelector("title").textContent;
const link=item.querySelector("link").textContent;

html+=`<p><a href="${link}" target="_blank">${title}</a></p>`;

});

document.getElementById("newsFeed").innerHTML=html;

}

loadNews();

/* TICKER */

async function loadTicker(){

const feed="https://api.allorigins.win/raw?url="+
encodeURIComponent("https://feeds.bbci.co.uk/news/rss.xml");

const res=await fetch(feed);
const xml=await res.text();

const parser=new DOMParser();
const data=parser.parseFromString(xml,"text/xml");

const items=data.querySelectorAll("item");

let text="";

items.forEach((item,i)=>{
if(i<8) text+=item.querySelector("title").textContent+" ◆ ";
});

document.getElementById("breakingNews").textContent=text;

}

loadTicker();

/* CURRENCY */

const currencies=["USD","GBP","EUR","NGN","KES","GHS"];

const from=document.getElementById("from");
const to=document.getElementById("to");

currencies.forEach(c=>{
from.innerHTML+=`<option>${c}</option>`;
to.innerHTML+=`<option>${c}</option>`;
});

async function convert(){

const amount=document.getElementById("amount").value;

const base=from.value;
const target=to.value;

const res=await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
const data=await res.json();

const rate=data.rates[target];

document.getElementById("result").innerText=
`${amount} ${base} = ${(amount*rate).toFixed(2)} ${target}`;

}

