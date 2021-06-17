exports.seed = function(knex) {
	return knex("announcements").insert([
		{
			title: "Menu change",
			announcement:
				"We have decided to change our menu slightly. Instead of baked beans, we will have green beans.",
			wedding_id: 1,
		},
		{
			title: "Location",
			announcement:
				"The weather looks bad this weekend. We will be moving the ceremony inside.",
			wedding_id: 2,
		},
		{
			title: "DJ Needed",
			announcement:
				"Our DJ had something come up on our wedding day. Does anyone know a DJ we can book?",
			wedding_id: 3,
		},
	]);
};
