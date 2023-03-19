const express = require('express')
require('dotenv').config()
const { listarLivros } = require('./controladores/livros')
const { listarUsuarioLogado, cadastrarUsuario } = require('./controladores/usuarios')
const login = require('./intermediarios/login')
const verificarLogin = require('./intermediarios/verificalogin')

const rotas = express()



//rotas de usuário

rotas.post('/usuarios', cadastrarUsuario)
rotas.post('/login', login)

//  verificar token
rotas.use(verificarLogin)

rotas.get('/usuarios', listarUsuarioLogado)

rotas.get('/livros', listarLivros)

module.exports = rotas