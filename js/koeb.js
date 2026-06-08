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

if (kurv.length === 0) {
  window.location.href = "kurv.html?tom=true";
}

document.querySelector("#kobBtn").addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.querySelector("#kobform");
  const terms = document.querySelector("#terms");
  let harFejl = false;

  const inputs = form.querySelectorAll("input[required]");
  inputs.forEach((input) => {
    const errorMsg = input.nextElementSibling;
    if (!input.value.trim()) {
      errorMsg.style.display = "block";
      harFejl = true;
    } else {
      errorMsg.style.display = "none";
    }
  });

  if (!selected) {
    document.querySelector(".radio-group").style.border = "2px solid red";
    document.querySelector(".radio-group").style.borderRadius = "8px";
    document.querySelector(".radio-group").style.padding = "8px";
    harFejl = true;
  } else {
    document.querySelector(".radio-group").style.border = "none";
  }

  if (!terms.checked) {
    terms.closest(".checkbox-group").style.color = "red";
    harFejl = true;
  } else {
    terms.closest(".checkbox-group").style.color = "";
  }

  if (!harFejl) {
    localStorage.removeItem("kurv");
    window.location.href = "afsluttet.html";
  }
});

document.querySelector("#handelsbetingelser-link").addEventListener("click", () => {
  document.querySelector("#handelsbetingelser-popover").classList.add("aktiv");
});

document.querySelector("#luk-popover").addEventListener("click", () => {
  document.querySelector("#handelsbetingelser-popover").classList.remove("aktiv");
});

document.querySelector("#handelsbetingelser-popover").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove("aktiv");
  }
});
