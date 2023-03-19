const knex = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const listarUsuarioLogado = async (req, res) => {
    const listar = await knex('usuarios')
    return res.status(200).json(listar)
}


const cadastrarUsuario = async (req, res) => {
    const { nome, email, data_nascimento, senha } = req.body

    if (!nome || !email || !data_nascimento || !senha) {
        return res.status(400).json({ Mensagem: "Todos os campos obrigatórios devem ser informados!" })
    }

    try {

        let emailExiste = await knex('usuarios')
            .where('email', email)
            .first()


        if (emailExiste) {
            return res.status(404).json({ Mensagem: 'Email já foi cadastrado para outro usuário' })
        }



        //  cadastrando usuário
        const senhaCripto = await bcrypt.hash(senha, 10)

        const usuario = {
            nome,
            email,
            data_nascimento,
            senha: senhaCripto
        }

        const cadastro = await knex('usuarios')
            .insert([usuario])
            .returning('*')





        return res.status(201).json(cadastro[0])


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ Mensagem: 'Erro interno do servidor.' })
    }


}

module.exports = {
    listarUsuarioLogado,
    cadastrarUsuario
}