const express = require('express')
const rotas = require('./rotas')
require('dotenv').config()
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use(rotas)

app.listen(process.env.PORT_SERV, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT_SERV}`)
})