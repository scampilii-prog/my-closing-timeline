/* One reusable, compact offer; the underlying timeline tools are untouched. */
(()=>{function place(){if(document.getElementById("mct-first-free-offer"))return;
const anchor=document.querySelector(".mct-brand-slogan");if(!anchor)return;
const card=document.createElement("section");card.className="mct-first-free-banner";card.id="mct-first-free-offer";card.setAttribute("aria-label","First PRO Closing invitation");
card.innerHTML='<div><span class="mct-offer-kicker">FIRST TIME HERE?</span><h2>Your First PRO Closing Could Be FREE.</h2><p>Request a personal invitation for one complimentary PRO Closing Credit — a planned $29.90 value. Subject to eligibility and approval. No credit card required.</p></div><div class="mct-offer-actions"><a class="mct-offer-primary" href="/first-closing-free.html">Request My FREE Code</a><a class="mct-offer-secondary" href="/pro-activate.html#mct-activation-gift">Already invited? Redeem your code</a></div>';
const homeSlot=document.getElementById("mct-home-offer-slot");
if(homeSlot){
 card.classList.add("mct-first-free-banner-home");
 card.querySelector("h2").textContent="Your First PRO Closing Could Be FREE.";
 card.querySelector("p").textContent="Request a personal invitation for one complimentary PRO Closing Credit. Subject to approval; no card required.";
 card.querySelector(".mct-offer-primary").textContent="Request FREE Code";
 card.querySelector(".mct-offer-secondary").textContent="Have a code? Redeem";
 homeSlot.append(card);
}else {
 // On PRO, the privacy seal lives inside a dedicated card. Never insert
 // the invitation INSIDE that card: doing so breaks the two-column layout.
 const proRow=document.querySelector(".mct-pro-category-privacy-row");
 if(proRow){card.classList.add("mct-first-free-banner-pro");proRow.insertAdjacentElement("afterend",card)}
 else anchor.insertAdjacentElement("afterend",card);
}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",place);else place()})();