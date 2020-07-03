const express = require('express');//puxando o express
const cors = require('cors');
const routes = require('./routes');//puxando o routes

const app = express();//setando o express

app.use(cors());
app.use(express.json());//setando possibilidade de usar json
app.use(routes);//setando o arquivo que contém as rotas

app.listen(3333); //colocar o servidor no ar