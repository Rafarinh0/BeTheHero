const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//trazer dados da tabela de ongs, e apenas dados onde o id da ongs seja igual ao id do incidents
            .limit(5)//limite de paginação
            .offset((page - 1) * 5)//config da amostra de paginação
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);//quero todos os dados de incidente, mas da ong só alguns

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id })
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')//na tabela incidents
            .where('id', id)//buscar um incidente onde o id for igual a essa variavel id
            .select('ong_id')//quero apenas a coluna ong_id
            .first();//como só vai retornar um registro...

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' })
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
};