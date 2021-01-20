import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('travels', table => {
    table.increments('id').primary();
    table.string('travel_id').notNullable();
    table.foreign('travel_id').references('travels.id').onDelete('CASCADE');
    table.string('image').nullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('travels');
}
