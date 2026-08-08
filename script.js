function mostrarAba(aba) {
    // Tira 'ativo' de todas as abas e botões
    document.querySelectorAll('.conteudo-aba').forEach(a => a.classList.remove('ativo'));
    document.querySelectorAll('.btn-aba').forEach(b => b.classList.remove('ativo'));
    
    // Adiciona 'ativo' na aba e botão clicado
    document.getElementById(aba).classList.add('ativo');
    event.target.classList.add('ativo');
}

function enviarDados(event) {
    event.preventDefault();
    
    const mensagem = document.getElementById('mensagem');
    mensagem.innerHTML = 'Enviando...';
    
    const dados = {
        data: document.getElementById('data').value,
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        produto: document.getElementById('produto').value
    };

    // COLE SUA URL DO APPS SCRIPT AQUI
    const url = 'https://script.google.com/macros/s/AKfycbwHNd3YVKkgADO67uRAuyo0t6SVyYT_gimTX1jlpeIJIFNNhkXGyNKDCQQ9jzaiGTBR/exec';

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(data => {
        if(data.resultado === 'sucesso'){
            mensagem.innerHTML = '✅ Lançado com sucesso!';
            document.getElementById('form-retirada').reset();
        } else {
            mensagem.innerHTML = '❌ Erro: ' + data.erro;
        }
    })
    .catch(erro => {
        mensagem.innerHTML = '❌ Erro de conexão';
        console.error(erro);
    });
}

document.getElementById('form-retirada').addEventListener('submit', enviarDados);
