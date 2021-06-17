const router = require("express").Router({ mergeParams: true });
const uuid = require("uuidv4").default;
const Guest = require("../models/guests");
const { findByWeddingId } = require("../models/users");
const { findGuestById } = require("../middleware");
const sendGuestInvite = require("../mailers/sendGuestInvite");

const generateInviteURL = (weddingId, guestId) => {
	const HOSTNAME =
		process.env.NODE_ENV === "production"
			? "https://www.h3rra.com"
			: "http://localhost:3000";
	return `${HOSTNAME}/weddings/${weddingId}/invite/${guestId}`;
};

router.get("/", async (req, res) => {
	const { weddingId } = req.params;
	try {
		const guests = await Guest.find(weddingId);
		res.status(200).json(guests);
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

router.get("/:id", findGuestById, async (req, res) => {
	const { guest } = req;
	res.status(200).json(guest);
});

router.post("/", async (req, res) => {
	const { weddingId } = req.params;
	const guest = req.body;
	if (Object.entries(guest).length === 0 || !guest.name || !guest.email) {
		return res.status(400).json({
			error: "Missing one or more required properties: name, email",
		});
	}
	try {
		const newGuest = await Guest.add({ id: uuid(), ...guest }, weddingId);
		const couple = await findByWeddingId(weddingId);
		const guestInviteURL = generateInviteURL(weddingId, newGuest.id);
		sendGuestInvite(newGuest, couple, guestInviteURL);
		res.status(201).json(newGuest);
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

router.put("/:id", findGuestById, async (req, res) => {
	const { id } = req.params;
	const updates = { ...req.body, has_responded: true };
	try {
		await Guest.update(id, updates);
		res.status(204).end();
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

router.delete("/:id", findGuestById, async (req, res) => {
	const { id } = req.params;
	try {
		await Guest.remove(id);
		res.status(204).end();
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = router;
