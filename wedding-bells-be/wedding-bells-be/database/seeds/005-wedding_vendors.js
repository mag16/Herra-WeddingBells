exports.seed = function(knex) {
  return knex("wedding_vendors").insert([
    {
      wedding_id: 1,
      vendor_id: 1
    },
    {
      wedding_id: 2,
      vendor_id: 2
    },
    {
      wedding_id: 3,
      vendor_id: 3
    }
  ]);
};
