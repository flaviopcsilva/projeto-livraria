const btn = document.querySelector('#salvar')

btn.addEventListener('click', () => {
    // capturar os dados do formulário
    const curso = getDadosForm()
    // enviar os dados para api
    enviarDadosParaAPI(curso)
})

function getDadosForm() {
    const inputNome = document.querySelector('#nome')
    const inputEmail = document.querySelector('#email')
    const inputDataNasc = document.querySelector('#data_nasc')
    const inputSenha = document.querySelector('#senha')

    if (inputNome.value === "" || inputEmail.value === "" ||
        inputDataNasc === "" || inputSenha === "") {
        window.alert('Todos os campos devem ser preenchidos.')
        console.log('campos vazios')

        return
    }

    const curso = {
        nome: inputNome.value,
        email: inputEmail.value,
        data_nascimento: inputDataNasc.value,
        senha: inputSenha.value
    }
    return curso
}

async function enviarDadosParaAPI(curso) {
    try {
        const resposta = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(curso)
        })
        if (resposta.status === 404) {
            const msg = await resposta.json()
            console.log('Erro ao adicionar curso', msg)
            window.alert('Email já foi cadastrado para outro usuário.')
        }
        if (resposta.status === 201) {
            limparCampos()
            window.alert('Cadastro efetuado com sucesso.')
            window.location.href = '../index.html'
        } else {
            const msg = await resposta.json()
            console.log('Erro ao adicionar curso', msg)
        }
    } catch (erro) {
        console.error(erro)
    }
}

function limparCampos() {
    document.querySelector('#nome').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#data_nasc').value = ''
    document.querySelector('#senha').value = ''
}