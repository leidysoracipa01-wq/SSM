const topics=[
["Decimal a Binario","paginas/binario.html"],["Binario a Decimal","paginas/binario.html"],
["Subnetting","paginas/subnetting.html"],["Número de subredes","paginas/formulas.html"],
["Hosts utilizables","paginas/hosts.html"],["Dirección de red","paginas/direcciones.html"],
["Broadcast","paginas/direcciones.html"],["Máscara de subred","paginas/formulas.html"],
["Direcciones IPv4","paginas/direcciones.html"],["Ejercicios","paginas/ejercicios.html"],
["Retos","paginas/retos.html"],["Calculadoras","paginas/calculadoras.html"]];
function toggleMenu(){document.getElementById("nav").classList.toggle("open")}
function searchTopics(){const q=document.getElementById("siteSearch").value.toLowerCase().trim();const box=document.getElementById("searchResults");if(!q){box.innerHTML="";return}const found=topics.filter(x=>x[0].toLowerCase().includes(q));box.innerHTML=found.length?found.map(x=>`<a class="result-link" href="${x[1]}">${x[0]} →</a>`).join(""):`<span>No encontramos ese tema. Prueba con “binario”, “hosts” o “subnetting”.</span>`}

function decimalToBinary(){const n=Number(document.getElementById("decimalInput").value),o=document.getElementById("binaryResult");if(!Number.isInteger(n)||n<0||n>255){o.textContent="Resultado: ingresa un número entre 0 y 255.";return}o.textContent="Resultado: "+n.toString(2).padStart(8,"0")}
function binaryToDecimal(){const b=document.getElementById("binaryInput").value.trim(),o=document.getElementById("decimalResult");if(!/^[01]{8}$/.test(b)){o.textContent="Resultado: usa exactamente 8 bits.";return}o.textContent="Resultado: "+parseInt(b,2)}
function ipToInt(ip){const a=ip.split(".").map(Number);if(a.length!==4||a.some(x=>!Number.isInteger(x)||x<0||x>255))return null;return ((a[0]<<24)>>>0)+(a[1]<<16)+(a[2]<<8)+a[3]}
function intToIp(n){return[(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join(".")}
function maskFromPrefix(p){return p===0?0:(0xffffffff<<(32-p))>>>0}
const ps=document.getElementById("prefixInput");if(ps){for(let p=1;p<=30;p++){let o=document.createElement("option");o.value=p;o.textContent="/"+p;if(p===24)o.selected=true;ps.appendChild(o)}}
function calculateSubnet(){const ip=document.getElementById("ipInput").value.trim(),p=Number(document.getElementById("prefixInput").value),o=document.getElementById("subnetResult"),x=ipToInt(ip);if(x===null){o.innerHTML='<p class="bad">IPv4 no válida.</p>';return}const m=maskFromPrefix(p),r=(x&m)>>>0,b=(r|(~m>>>0))>>>0,h=32-p,hosts=Math.max(0,2**h-2);o.innerHTML=`<p><b>Máscara:</b> ${intToIp(m)}</p><p><b>Dirección de red:</b> ${intToIp(r)}</p><p><b>Broadcast:</b> ${intToIp(b)}</p><p><b>Bits de host:</b> ${h}</p><p><b>Hosts utilizables:</b> ${hosts.toLocaleString("es-CO")}</p>`}
function calcHosts(){const p=Number(document.getElementById("hostPrefix").value),o=document.getElementById("hostResult");if(p<1||p>30){o.textContent="Usa un prefijo entre /1 y /30.";return}const h=32-p;o.innerHTML=`Bits de host: <b>${h}</b> · Hosts utilizables: <b>${(2**h-2).toLocaleString("es-CO")}</b>`}
function checkAnswer(btn){const input=btn.parentElement.querySelector(".answer-input"),f=btn.parentElement.querySelector(".feedback"),ok=input.value.trim().toLowerCase()===input.dataset.answer.toLowerCase();f.textContent=ok?"✓ ¡Correcto!":"✗ Revisa el procedimiento e inténtalo otra vez.";f.className="feedback "+(ok?"ok":"bad")}
