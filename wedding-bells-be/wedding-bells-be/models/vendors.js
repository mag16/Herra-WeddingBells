const db = require("../database/config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update,
};

function find(weddingId) {
	return db("vendors").where({ wedding_id: weddingId });
}

function findBy(filter) {
	return db("vendors").where(filter);
}

async function add(vendor, weddingId) {
	const [id] = await db("vendors")
		.insert({ ...vendor, wedding_id: weddingId })
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("vendors").where({ id });
}

async function remove(id) {
	try {
		deletedVendor = await findById(id);
		const getVendor = await db("vendors")
			.where({ id })
			.del();
		return getVendor ? getVendor : null;
	} catch {
		throw new Error(err);
	}
}

async function update(id, updates) {
	/**
	 * Simple error handling below:
	 *
	 * To protect clients (users of this API) from changing the `id` or
	 * `wedding_id` of any given guest, we can delete those properties from the
	 * `updates` object that is passed in from the router before submitting said
	 * changes to the database. This check is necessary because never do we want
	 * a guest's `id` or `wedding_id` to be changed (since changing the
	 * `wedding_id` would effectively put the guest in a different couple's wedding.)
	 *
	 * `delete` keyword reference:
	 * 	- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
	 */
	delete updates.id;
	delete updates.wedding_id;
	try {
		const updateVendor = await db("vendors")
			.where({ id })
			.update(updates);
		return updateVendor;
	} catch (err) {
		throw new Error(err);
	}
}
