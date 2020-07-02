const express = require('express');//puxando o express

const routes = express.Router();//setando o express
routes.use(express.json());//setando possibilidade de usar json

routes.get('/users', (req,res)=>{//rota
    return res.json({
        evento: 'festa do chá',
        realizador: 'marocas'
    })

});

module.exports = routes;