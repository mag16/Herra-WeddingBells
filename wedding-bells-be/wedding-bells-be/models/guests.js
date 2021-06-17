const db = require("../database/config");

const find = async weddingId => {
	try {
		return await db("guests").where({ wedding_id: weddingId });
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const findById = async id => {
	try {
		return (await db("guests").where({ id }))[0];
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const findByFilter = async filter => {
	try {
		return await db("guests").where(filter);
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const add = async (guest, weddingId) => {
	try {
		const [id] = await db("guests")
			.insert({ ...guest, wedding_id: weddingId })
			.returning("id");
		return await findById(id);
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const update = async (id, updates) => {
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
		await db("guests")
			.where({ id })
			.update(updates);
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const remove = async id => {
	try {
		await db("guests")
			.where({ id })
			.del();
	} catch (err) {
		console.error(err);
		throw err;
	}
};

module.exports = {
	find,
	findById,
	findByFilter,
	add,
	update,
	remove,
};
