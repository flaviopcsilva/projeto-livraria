const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../conexao')

const login = async (req, res, next) => {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios')
            .where('email', email)
            .first()

        if (!usuario) {
            return res.status(401).json({ Mensagem: 'Email ou Senha Inválidos.' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(401).json({ Mensagem: 'Email ou Senha Inválidos.' })
        }


        const token = jwt.sign({ id: usuario.id }, process.env.MASTER_SENHA, { expiresIn: '1h' })

        const { senha: _, ...usuarioLogado } = usuario

        return res.json({ usuario: usuarioLogado, token })


    } catch (error) {
        console.log(error.messenge)
        return res.status(500).json({ Mensagem: 'Erro interno do servidor' })
    }

}

module.exports = login