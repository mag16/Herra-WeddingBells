require("dotenv").config();

const Wedding = require("../models/weddings");
const guestsRouter = require("./guestsRouter");
const vendorRouter = require("./vendorRouter");

const announcementsRouter = require("./announcementRouter");
const registryRouter = require("./registryRouter");

const express = require("express");

const router = express.Router();

router.use("/:weddingId/guests", guestsRouter);
router.use("/:weddingId/vendors", vendorRouter);

router.use("/:weddingId/announcements", announcementsRouter);
router.use("/:weddingId/registries", registryRouter);

// GET VENDOR table
router.get("/", async (req, res) => {
	if (role === "admin") {
		try {
			const weddings = await Wedding.find();
			const tryMe = res.json(weddings);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	} else {
		Wedding.findById(subject)
			.then(wedding => {
				res.json(wedding);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	}
});

// User.findById(subject)
// 	.then(user => {
// 		res.json(user);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err);
// 	});

//POST to WEDDING table
router.post("/", async (req, res) => {
	const wedding = req.body;
	try {
		if (wedding) {
			const newWedding = await Wedding.add(wedding);
			if (newWedding) {
				res.status(201).json(newWedding);
			} else {
				res.status(404).json({ message: "wedding could not be added" });
			}
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET VENDOR table with ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {

		// try finding by slug if id is not valid number
		const wedding = parseInt(id) ? await Wedding.findById(id) : await Wedding.findBy({slug: id});

		if (wedding) {
			res.json(wedding);
		} else {
			res.status(404).json({ message: "could not find wedding" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to get wedding" });
	}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await Wedding.remove(id);

		if (deleted) {
			res.json({ removed: deleted });
		} else {
			res.status(404).json({ message: "could not find wedding with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to delete wedding" });
	}
});

// EDIT VENDOR with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const wedding = await Wedding.findById(id);

		if (wedding) {
			await Wedding.update(
				{
					location: changes.location || wedding.location,
					date: changes.date || wedding.date,
				},
				id
			);
			const updatedInfo = await Wedding.findById(id);
			res.json(updatedInfo);
		} else {
			res.status(404).json({ message: "could not find wedding with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to update wedding" });
	}
});

module.exports = router;
