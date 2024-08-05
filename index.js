const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')
const { where } = require('sequelize')

// Config
    // Template Engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//Rotas
    app.get('/', async (req,res) => {
        try {
        const posts = await Post.findAll({order: [['id', 'DESC']]});
        const plainPosts = posts.map(post => post.toJSON())
        res.render('home', { posts:plainPosts })
        } catch (error) {
        res.status(500).send(error.mensagem)
        }
    })

    app.get('/cad', function(req,res) {
        res.render('formulario')
    })

    app.post('/add', function(req,res) {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function() {
            res.redirect('/')
        }).catch(function(erro) {
            res.send('Houve um erro ' + erro)
        })
    })

//Rota para deletar
    app.get('/deletar/:id', function(req,res) {
        Post.destroy({where: {id: req.params.id} }).then(function(){
            res.send('Postagem deletada com sucesso!')
        }).catch(function(erro) {
            res.send('Esta postagem não existe!')
        })
    })

app.listen(8081, function() {
    console.log('Servidor rodando na url http://localhost:8081')
})