import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('destinations', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('state').notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('destinations');
}
