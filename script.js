const URL_PLANILHA = "https://script.google.com/macros/s/AKfycbwHNd3YVKkgADO67uRAuyo0t6SVyYT_gimTX1jlpeIJIFNNhkXGyNKDCQQ9jzaiGTBR/exec"; // <-- TROCA AQUI

function enviarDados(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const setor = document.getElementById('setor').value;
    const material = document.getElementById('material').value;
    const quantidade = document.getElementById('quantidade').value;

    const dados = { data: new Date().toLocaleDateString('pt-BR'), nome, setor, material, quantidade };

    const btn = document.querySelector('button[type="submit"]');
    btn.disabled = true; btn.innerText = "Enviando...";

    fetch(URL_PLANILHA, { method: 'POST', body: JSON.stringify(dados) })
    .then(res => res.json())
    .then(() => {
        alert("✅ Lançado com sucesso!");
        document.getElementById('form-retirada').reset();
        document.getElementById('quantidade').value = 1;
        btn.disabled = false; btn.innerText = "Lançar Retirada";
    })
    .catch(() => {
        alert("❌ Erro. Verifique se a URL do Apps Script está certa e se publicou como 'Qualquer pessoa'");
        btn.disabled = false; btn.innerText = "Lançar Retirada";
    });
}