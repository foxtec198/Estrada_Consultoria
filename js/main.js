// Variaveis
var spinner = '<span id="spin_ldg" class="spinner-border spinner-border-sm text-light" role="status"></span>'
const mail = "foxtec198@gmail.com"

// Simples filtro de serviços com select
document.getElementById('serviceSelect').addEventListener('change', function (e) {
    const val = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(c => {
    const title = c.querySelector('h5').innerText.toLowerCase();
    if (!val || title.includes(val)) c.parentElement.style.display = 'block'; else c.parentElement.style.display = 'none';
    });
});

// Criação do Recaptcha
window.onload = function () {
    var recaptcha = document.forms["contactForm"]["g-recaptcha-response"];
    recaptcha.required = true;
    // Opcional: Adicionar mensagem de erro personalizada (oninvalid)
    recaptcha.oninvalid = function (e) {
    alert("Por favor, complete o reCAPTCHA para prosseguir.");
    }
}

// Envio do Formulário
document.getElementById('contactForm').addEventListener('submit', async function (e){
    e.preventDefault()

    const nome = this.nome.value
    const email = this.email.value
    const tel = this.telefone.value
    const msg = this.msg.value 
    if(msg === ''){"Entre em contato comigo"}
    const btn = this.btnSub

    if(nome && tel && email ){
        const html = `
            <h1>Você tem um novo lead!</h1>
            <p>Entre em contato para mais detalhes!</p>
            <hr>
            <br>
            <p><strong>Nome: </strong>${nome}</p>
            <p><strong>Telefone: </strong>${tel}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Mensagem: </strong>${msg}</p>
            <a style="background: #5E8B60; color: #fff; padding: 8px; border-radius: 8px; width: 100%;" href="https://wa.me/${tel}">Enviar mensagem no WhatsApp!</a>
            <br>
            <br>
            <hr>
            <a style="color: #5E8B60; text-decoration: none;" href="https://tecnobreve.onrender.com">© Desenvolvido por Tecnobreve, 2025</a>
        `
    
        btn.innerHTML = spinner
        const req = await fetch(
            `https://api.hubbix.com.br/send_mail/${mail}`, 
            {
                method: 'POST', 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({
                    "title": `Não Responder - Novo Lead - ${nome}`,
                    "html": html
                })
            }
        )
        const res = await req.json()
        if(req.ok){btn.innerHTML = res}
        else{alert("Erro na requisição.")}
    }else{alert('Dados não informados corretamente!')}
})