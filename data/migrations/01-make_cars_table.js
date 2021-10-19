exports.up = function (knex) {
  return knex.schema.createTable("cars", table=>{
    table.increments()
    table.string("vin",20).unique().notNullable()
    table.string("make",50).notNullable()
    table.string("model",50).notNullable()
    table.integer("mileage").notNullable()
    table.string("title",7)
    table.string("transmission",9)
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars")
};
