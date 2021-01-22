import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('travels', table => {
    table.increments('id').primary();
    table.string('place').notNullable();
    table.string('origin').notNullable();
    table.string('destiny').notNullable();
    table.text('bio').notNullable();
    table.string('whatsapp').notNullable();
    table.integer('price').notNullable();
    table.dateTime('leaving').notNullable();
    table.dateTime('arrival').notNullable();
    table.integer('quantity').notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('travels');
}
