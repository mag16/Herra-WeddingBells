exports.seed = function(knex) {
	return knex("vendors").insert([
		{
			company_name: "Photos n' stuff",
			category: "Photographer",
			wedding_id: 1,
		},
		{
			company_name: "Lucy's Hair Styling",
			category: "Hair Stylist",
			wedding_id: 2,
		},
		{
			company_name: "Suger Butter Flour",
			category: "Bakery",
			wedding_id: 3,
		},
	]);
};
