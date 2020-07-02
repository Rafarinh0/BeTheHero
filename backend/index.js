const express = require('express');//puxando o express

const app = express();//setando o express
app.use(express.json());//setando possibilidade de usar json

/**
 * 
 */

app.get('/users', (req,res)=>{//rota
    return res.json({
        evento: 'festa do chá',
        realizador: 'marocas'
    })

});

app.listen(3333); //colocar o servidor no ar