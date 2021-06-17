const router = require("express").Router({ mergeParams: true });
const Vendor = require("../models/vendors");
const { findVendorById } = require("../middleware");

// GET VENDOR table
router.get("/", async (req, res) => {
	const { weddingId } = req.params;
	try {
		const vendors = await Vendor.find(weddingId);
		res.status(200).json(vendors);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET VENDOR table with ID
router.get("/:id", findVendorById, async (req, res) => {
	const { vendor } = req;
	res.status(200).json(vendor);
});

//POST to VENDOR table
router.post("/", async (req, res) => {
	const { weddingId } = req.params;
	const vendor = req.body;
	if (Object.entries(vendor).length === 0 || !vendor.company_name) {
		return res.status(400).json({ error: "Missing company name" });
	}
	try {
		const newVendor = await Vendor.add(vendor, weddingId);
		res.status(201).json(newVendor);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// EDIT VENDOR with ID
router.put("/:id", findVendorById, async (req, res) => {
	const { id } = req.params;
	const updates = req.body;
	try {
		await Vendor.update(id, updates);
		res
			.status(200)
			.json(updates)
			.end();
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

// DEL request to with ID
router.delete("/:id", findVendorById, async (req, res) => {
	const { id } = req.params;
	try {
		await Vendor.remove(id);
		res
			.status(200)
			.json({ message: "Successfully Deleted" })
			.end();
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = router;
