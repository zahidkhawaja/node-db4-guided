
exports.up = function (knex) {
  return knex.schema
    .createTable('species', tbl => {
      tbl.increments() // id colum of unsigned ints, unique, incrementing, not null...
      tbl.string('species_name', 128).notNullable()
    })
    .createTable('zoos', tbl => {
      tbl.increments()
      tbl.string('zoo_name', 128).notNullable()
      tbl.string('address', 128).notNullable()
    })
    .createTable('animals', tbl => {
      tbl.increments()
      tbl.string('animal_name', 128).notNullable()
      tbl.integer('species_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('species')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
    .createTable('zoo_animals', tbl => {
      // composite pk or artificial pk ?
      tbl.increments()
      tbl.integer('animal_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('animals')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      tbl.integer('zoo_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('zoos')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists()
    .dropTableIfExists('animals')
    .dropTableIfExists('zoos')
    .dropTableIfExists('species')
};
