import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_travels', table => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id');
    table.integer('travel_id').notNullable();
    table.foreign('travel_id').references('travels.id');
    table.string('transaction_id').nullable();
    table.float('amount').notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_travels');
}
