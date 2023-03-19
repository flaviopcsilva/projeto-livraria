const express = require('express')
require('dotenv').config()
const { listarLivros } = require('./controladores/livros')

const rotas = express()

rotas.get('/livros', listarLivros)

module.exports = rotas