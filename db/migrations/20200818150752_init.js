
exports.up = knex => knex.schema
  .createTable('images', t => {
    t.increments('id')

    // TODO actually sort through what parts of the images data we need and
    // don't need, then make proper columns for them. For early dev-only work,
    // just dumping everything into a json column is quick and easy.
    t.json('data')
  })
  .createTable('favorites_lists', t => {
    t.increments('id')
    t.string('name').notNullable()
    t.string('description').defaultTo('')
  })
  .createTable('favorites_enrollments', t => {
    t.integer('favorites_list_id').unsigned().notNullable()
    t.foreign('favorites_list_id').references('id').inTable('favorites_lists')

    t.integer('image_id').unsigned().notNullable()
    t.foreign('image_id').references('id').inTable('favorites_lists')
  })

exports.down = knex => knex.schema
  .dropTableIfExists('favorites_enrollments')
  .dropTableIfExists('favorites_lists')
  .dropTableIfExists('images')
