const express = require('express')
const app = express()

app.get('/', function(req,res) {
    res.send('Bem vindo ao meu app !!!')
})

app.get('/sobre', function(req,res) {
    res.send('Sou dev back-end Node.JS')
})

app.get('/contatos', function(req,res) {
    res.send('Contacte-me pelo whattsapp')
})

app.listen(8081, function() {
    console.log('Servidor rodando na url http://localhost:8081')
})