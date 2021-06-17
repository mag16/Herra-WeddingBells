exports.up = function(knex) {
	return knex.schema.table("couples", table => {
		table.string("role").defaultTo("user");
	});
};

exports.down = function(knex) {
	return knex.schema.table("couples", table => {
		table.dropColumn;
	});
};
