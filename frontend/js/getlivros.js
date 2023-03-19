const divLivros = document.querySelector('#livros')

async function consultaLivros() {
    const retorno = await fetch('http://localhost:3000/livros')
    const livros = await retorno.json()
    preencheTela(livros)
}

function preencheTela(livros) {
    livros.forEach(livro => {
        const novoLivroHTML = `
    <div  align="center" class="livro">
    <h3>${livro.nome}</h3>
    <p>ID: ${livro.id}</p>
    <p>Descrição: ${livro.descricao}</p>
  </div>
    `
        divLivros.innerHTML = divLivros.innerHTML + novoLivroHTML
    })
}

consultaLivros()