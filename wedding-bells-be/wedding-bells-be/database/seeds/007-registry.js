exports.seed = function(knex) {
	return knex("registry").insert([
		{
			company_name: "Amazon",
			url: "https://www.amazon.com",
			company_image_dropdown: "Amazon",
			wedding_id: 1,
		},
		{
			company_name: "Sears",
			url: "https://www.sears.com",
			company_image_dropdown: "Sears",
			wedding_id: 1,
		},
		{
			company_name: "Target",
			url: "https://www.target.com",
			company_image_dropdown: "Target",
			wedding_id: 1,
		},
		{
			company_name: "Best Buy",
			url: "https://www.bestbuy.com",
			company_image_dropdown: "Best Buy",
			wedding_id: 2,
		},
	]);
};
