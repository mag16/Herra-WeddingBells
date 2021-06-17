require("dotenv").config();

const Registry = require("../models/registry");

const express = require("express");

const router = require("express").Router({ mergeParams: true });
router.use(express.json());
const { findRegistryById } = require("../middleware");

// GET Registry table
router.get("/", async (req, res) => {
	const { weddingId } = req.params;
	try {
		const registries = await Registry.findBy({ wedding_id: weddingId });
		res.json(registries);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//POST to Registry table
router.post("/", async (req, res) => {
	const registry = req.body;
	const { weddingId } = req.params;
	try {
		if (registry) {
			const newRegistry = await Registry.add({
				wedding_id: weddingId,
				...registry,
			});
			if (newRegistry) {
				res.status(201).json(newRegistry);
			} else {
				res.status(404).json({ message: "Registry could not be added" });
			}
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET Registry table with ID
router.get("/:id", findRegistryById, (req, res) => {
	const { registry } = req;

	if (registry) {
		res.status(200).json(registry);
	} else {
		res.status(404).json({ message: "could not find registry with given id" });
	}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await Registry.remove(id);

		if (deleted) {
			res.json({ removed: deleted });
		} else {
			res
				.status(404)
				.json({ message: "could not find registry with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to delete registry" });
	}
});

// EDIT Registry with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const registry = await Registry.findById(id);

		if (registry) {
			const updatedRegistry = await Registry.update(changes, id);

			res.json(updatedRegistry);
		} else {
			res
				.status(404)
				.json({ message: "could not find registry with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to update Registry" });
	}
});

module.exports = router;
