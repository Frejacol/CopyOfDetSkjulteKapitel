"use strict";

function opdaterKurvBadge() {
  const kurv = JSON.parse(localStorage.getItem("kurv")) || [];
  const antal = kurv.reduce((sum, p) => sum + p.antal, 0);
  document.querySelectorAll(".kurv-badge").forEach((badge) => {
    badge.textContent = antal;
    badge.style.display = antal > 0 ? "flex" : "none";
  });
}

window.addEventListener("storage", opdaterKurvBadge);
document.addEventListener("DOMContentLoaded", opdaterKurvBadge);
