const express = require('express');//puxando o express
const crypto = require('crypto');

const connection = require('./database/connection');

const routes = express.Router();//setando o express

routes.get('/ongs', async (req, res) => {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
});

routes.post('/ongs', async (req, res) => {//rota

    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return res.json({ id });
});
module.exports = routes;