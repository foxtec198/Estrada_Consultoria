// Simples filtro de serviços com select
document.getElementById('serviceSelect').addEventListener('change', function (e) {
    const val = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(c => {
    const title = c.querySelector('h5').innerText.toLowerCase();
    if (!val || title.includes(val)) c.parentElement.style.display = 'block'; else c.parentElement.style.display = 'none';
    });
});

// Envio de form fictício
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Obrigado! Sua mensagem foi enviada (simulação).');
    this.reset();
});

window.onload = function () {
    var recaptcha = document.forms["contactForm"]["g-recaptcha-response"];
    recaptcha.required = true;
    // Opcional: Adicionar mensagem de erro personalizada (oninvalid)
    recaptcha.oninvalid = function (e) {
    alert("Por favor, complete o reCAPTCHA para prosseguir.");
    }
}