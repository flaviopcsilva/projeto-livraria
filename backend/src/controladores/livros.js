const knex = require('../conexao')

const listarLivros = async (req, res) => {
    try {
        const livros = await knex('livros').orderBy('id')
        return res.json(livros)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }

}

module.exports = {
    listarLivros
}