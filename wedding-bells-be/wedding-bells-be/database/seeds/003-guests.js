exports.seed = function(knex) {
  return knex("guests").insert([
    {
      id: "40e6215d-b5c6-4896-987c-f30f3678f608",
      name: "Ray",
      email: "ray@email.com",
      is_going: true,
      has_responded: true,
      plus_one: false,
      wedding_id: 1
    },
    {
      id: "6ecd8c99-4036-403d-bf84-cf8400f67836",
      name: "Linda",
      email: "linda@email.com",
      is_going: false,
      has_responded: true,
      plus_one: false,
      wedding_id: 2
    },
    {
      id: "3f333df6-90a4-4fda-8dd3-9485d27cee36",
      name: "Mary",
      email: "mary@email.com",
      is_going: true,
      has_responded: false,
      plus_one: false,
      wedding_id: 3
    }
  ]);
};
