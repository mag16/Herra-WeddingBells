const db = require("../database/config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update,
};

function find() {
	return [
		db("weddings").select("id", "slug", "date", "location", "couple_id"),
		db("couples").select("jwt"),
	];
}

function findBy(filter) {
	return db("weddings").where(filter).first();
}

async function add(wedding) {
	const [id] = await db("weddings")
		.insert(wedding)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("weddings")
		.select("id", "slug", "date", "location", "couple_id")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedWedding = await findById(id);
		const getWedding = await db("weddings")
			.where({ id })
			.del();
		return getWedding ? getWedding : null;
	} catch {
		throw new Error(err);
	}
}

async function update(wedding, id) {
	try {
		const updateWedding = await db("weddings")
			.where({ id })
			.update(wedding);
		return updateWedding;
	} catch (err) {
		throw new Error(err);
	}
}
