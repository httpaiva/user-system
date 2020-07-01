const knex = require('knex');

exports.up = function(knex) {
    // CRIA TABELA
    return knex.schema.createTable('users', function (table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
    });
  };
  
  exports.down = function(knex) {
    // DELETA TABELA
    return knex.schema.dropTable('users');
  };