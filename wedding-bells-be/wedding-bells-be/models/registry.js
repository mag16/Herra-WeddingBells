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
	return db("registry").select(
		"id",
		"company_name",
		"url",
		"company_image_dropdown"
	);
}

function findBy(filter) {
	return db("registry").where(filter);
}

async function add(registry) {
	const [id] = await db("registry")
		.insert(registry)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("registry")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedRegistry = await findById(id);
		const getRegistry = await db("registry")
			.where({ id })
			.del();
		return getRegistry ? getRegistry : null;
	} catch {
		throw new Error(err);
	}
}

async function update(registry, id) {
	try {
		const updateRegistry = await db("registry")
			.where({ id })
			.update(registry);
		return updateRegistry;
	} catch (err) {
		throw new Error(err);
	}
}
