const db = require("../database/config");

const find = async weddingId => {
	try {
		return await db("announcements").where({ wedding_id: weddingId });
	} catch (err) {
		console.error(err);
		throw err;
	}
};

function findBy(filter) {
	return db("announcements").where(filter);
}

async function add(announcement) {
	const [id] = await db("announcements")
		.insert(announcement)
		.returning("id");

	return findById(id);
}

const findById = async id => {
	try {
		return (await db("announcements").where({ id }))[0];
	} catch (err) {
		console.error(err);
		throw err;
	}
};

async function remove(id) {
	try {
		deletedAnnouncement = await findById(id);
		const getAnnouncement = await db("announcements")
			.where({ id })
			.del();
		return getAnnouncement ? getAnnouncement : null;
	} catch {
		throw new Error(err);
	}
}

async function update(announcement, id) {
	try {
		const updateAnnouncement = await db("announcements")
			.where({ id })
			.update(announcement);
		return updateAnnouncement;
	} catch (err) {
		throw new Error(err);
	}
}

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update,
};
