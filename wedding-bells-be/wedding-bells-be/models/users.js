const db = require("../database/config");


module.exports = {
	add,
	find,
	findBy,
	findById,
	findByWeddingId,
	remove,
	update,
};

function find() {
	return db("couples").select(
		"id",
		"spouse_one_name",
		"spouse_two_name",
		"email",
		"role"
	);
}

function findBy(filter) {
	return db("couples").where(filter);
}

async function add(user) {
	const [id] = await db("couples")
		.insert(user)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("couples")
		.select("id", "spouse_one_name", "spouse_two_name", "email", "role", "password")
		.where({ id })
		.first();
}

async function findByWeddingId(weddingId) {
	const user = await db
		.select(["spouse_one_name", "spouse_two_name", "email"])
		.from("couples")
		.leftJoin("weddings", "couples.id", "weddings.couple_id")
		.where("weddings.id", "=", weddingId)
		.first();
	return user;
}

async function remove(id) {
	try {
		deletedUser = await findById(id);
		const getUser = await db("couples")
			.where({ id })
			.del();
		return getUser ? getUser : null;
	} catch {
		throw new Error(err);
	}
}

async function update(user, id) {
	try {
		const updateUser = await db("couples")
			.where({ id })
			.update(user);
		return updateUser;
	} catch (err) {
		throw new Error(err);
	}
}
