/* One reusable, compact offer; the underlying timeline tools are untouched. */
(()=>{function place(){if(document.getElementById("mct-first-free-offer"))return;
const anchor=document.querySelector(".mct-brand-slogan");if(!anchor)return;
const card=document.createElement("section");card.className="mct-first-free-banner";card.id="mct-first-free-offer";card.setAttribute("aria-label","First PRO Closing invitation");
card.innerHTML='<div><span class="mct-offer-kicker">FIRST TIME HERE?</span><h2>Your First PRO Closing Could Be FREE.</h2><p>Request a personal invitation for one complimentary PRO Closing Credit — a planned $29.90 value. Subject to eligibility and approval. No credit card required.</p></div><div class="mct-offer-actions"><a class="mct-offer-primary" href="/first-closing-free.html">Request My FREE Code</a><a class="mct-offer-secondary" href="/pro-get-started.html#gift-panel">Already invited? Redeem your code</a></div>';
anchor.insertAdjacentElement("afterend",card);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",place);else place()})();