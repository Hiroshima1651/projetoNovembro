// Script totalmente inofensivo — impede qualquer ação real.
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("payBtn");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("foi brutalmente roubado e vazei teus dados");
    console.warn("Página paródica: nenhum dado é coletado, enviado ou armazenado.");
  });

  // Impede digitação mesmo se alguém habilitar inputs no inspetor
  document.querySelectorAll("input").forEach(i => {
    i.addEventListener("keydown", e => e.preventDefault());
    i.addEventListener("paste", e => e.preventDefault());
  });

});
