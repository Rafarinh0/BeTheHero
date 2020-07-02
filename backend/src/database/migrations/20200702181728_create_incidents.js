exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');
        //a coluna ong_id da tabela incidents referencia a coluna id da
        //tabela ongs
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents');
};
