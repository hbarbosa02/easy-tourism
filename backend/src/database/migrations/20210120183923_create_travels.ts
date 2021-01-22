import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('travels', table => {
    table.increments('id').primary();
    table.string('origin').nullable();
    table.string('destiny').nullable();
    table.integer('price').notNullable();
    table.dateTime('travel_date').nullable();
    table.string('quantity').nullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('travels');
}
