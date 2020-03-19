
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
      tbl.increments() // COMMENT OUT IF YOU USE COMPOSITE PK
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
      // MAKING A COMPOSITE PRIMARY KEY
      // tbl.primary(['zoo_id', 'animal_id']) // COMMENT OUT increments() IF YOU USE THIS
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('zoo_animals')
    .dropTableIfExists('animals')
    .dropTableIfExists('zoos')
    .dropTableIfExists('species')
};
