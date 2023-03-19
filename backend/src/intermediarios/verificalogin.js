const jwt = require('jsonwebtoken')
const knex = require('../conexao')

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.MASTER_SENHA)

        const usuario = await knex('usuarios')
            .where('id', id)
            .first()

        const { senha: _, ...usuarioLogado } = usuario
        req.usuario = usuarioLogado
        next()

    } catch (error) {
        console.log(error.messenge)
        return res.status(500).json({ Mensagem: 'Erro interno do servidor' })
    }

}

module.exports = verificarLogin