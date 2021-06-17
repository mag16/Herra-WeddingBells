
exports.seed = function(knex) {
  return knex("couples").insert([
    {
      spouse_one_name: 'Brey',
      spouse_two_name: 'Abby',
      email: 'bbat104@gmail.com',
      password: 'password123'
    },
    {
      spouse_one_name: 'Kim',
      spouse_two_name: 'John',
      email: 'kim@gmail.com',
      password: 'password123'
    },
    {
      spouse_one_name: 'Sarah',
      spouse_two_name: 'Mike',
      email: 'sarah4@gmail.com',
      password: 'password123'
    },
  ]);
};
