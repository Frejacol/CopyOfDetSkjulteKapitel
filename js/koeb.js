"use strict";
let selected = null;

function selectPayment(val) {
  document.querySelectorAll(".radio-circle").forEach((el) => {
    el.classList.remove("filled");
  });
  document.querySelectorAll(".radio-option").forEach((el) => {
    el.style.border = "1px solid var(--primary-btn)";
  });

  if (selected === val) {
    selected = null;
  } else {
    document.getElementById("circle-" + val).classList.add("filled");
    document.getElementById("circle-" + val).closest(".radio-option").style.border = "2px solid #7c3db8";
    selected = val;
  }
}

const kurv = JSON.parse(localStorage.getItem("kurv")) || [];
const ordreProdukter = document.querySelector("#ordre-produkter");
const ordreTotal = document.querySelector("#ordre-total");
const fragtEl = document.querySelector("#ordre-fragt");
const fragt = 49;

function visOrdre() {
  ordreProdukter.innerHTML = "";

  if (kurv.length === 0) {
    ordreProdukter.innerHTML = "<p>Din kurv er tom.</p>";
    fragtEl.textContent = "0 kr.";
    ordreTotal.textContent = "0 kr.";
    return;
  }

  kurv.forEach((product) => {
    ordreProdukter.innerHTML += `
      <div class="product-short">
        <span>${product.produktnavn} x ${product.antal}</span>
        <span>${product.pris * product.antal} kr.</span>
      </div>`;
  });

  const subtotal = kurv.reduce((sum, p) => sum + p.pris * p.antal, 0);
  fragtEl.textContent = fragt + " kr.";
  ordreTotal.textContent = subtotal + fragt + " kr.";
}

visOrdre();
