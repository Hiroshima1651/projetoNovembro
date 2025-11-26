// Script totalmente inofensivo — impede qualquer ação real.
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("payBtn");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("PARÓDIA — Não existe pagamento aqui. É só zueira visual.");
    console.warn("Página paródica: nenhum dado é coletado, enviado ou armazenado.");
  });

  // Impede digitação mesmo se alguém habilitar inputs no inspetor
  document.querySelectorAll("input").forEach(i => {
    i.addEventListener("keydown", e => e.preventDefault());
    i.addEventListener("paste", e => e.preventDefault());
  });

});
