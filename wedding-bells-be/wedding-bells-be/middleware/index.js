const jwt = require("jsonwebtoken");
const Guest = require("../models/guests");
const Announcement = require("../models/announcement");
const Registry = require("../models/registry");
const Vendor = require("../models/vendors");
const db = require("../database/config");
const secrets = require("../config/secrets");

async function restricted(req, res, next) {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(400).json({
			error: "Missing token from `Authorization` header!",
		});
	}
	try {
		const [user] = await db("couples").where({ jwt: token });

		if (!user && token) {
			return res.status(401).json({
				error: "Invalid token, please try again after re-logging in.",
			});
		} else {
			jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
				if (error) {
					switch (error.name) {
						case "TokenExpiredError":
						case "JsonWebTokenError":
							return res.status(401).json({ ...error });
						default:
							return res.status(401).json({
								error: "Could not verify JWT token. Re-login and try again.",
							});
					}
				} else {
					//The token is a good token!
					req.decodedJwt = decodedToken;
					next();
				}
			});
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
}

const findGuestById = async (req, res, next) => {
	const { id, weddingId } = req.params;
	try {
		const [guest] = await Guest.findByFilter({
			id,
			wedding_id: weddingId,
		});
		if (!guest) {
			return res.status(404).json({
				error: `No guest exists with id ${id}!`,
			});
		} else {
			req.guest = guest;
			next();
		}
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
		throw err;
	}
};

const findAnnouncementById = async (req, res, next) => {
	const { id, weddingId } = req.params;
	try {
		const [announcement] = await Announcement.findBy({
			id,
			wedding_id: weddingId,
		});
		if (!announcement) {
			return res.status(404).json({
				error: `No announcement exists with id ${id}!`,
			});
		} else {
			req.announcement = announcement;
			next();
		}
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
		throw err;
	}
};

const findRegistryById = async (req, res, next) => {
	const { id, weddingId } = req.params;
	try {
		const [registry] = await Registry.findBy({
			id,
			wedding_id: weddingId,
		});
		if (!registry) {
			return res.status(404).json({
				error: `No registry exists with id ${id}!`,
			});
		} else {
			req.registry = registry;
			next();
		}
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
		throw err;
	}
};

const findVendorById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const vendor = await Vendor.findById(id);
		if (!vendor) {
			return res.status(404).json({
				error: `No vendor exists with id ${id}!`,
			});
		} else {
			req.vendor = vendor;
			next();
		}
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
		throw err;
	}
};

module.exports = {
	restricted,
	findGuestById,
	findVendorById,
	findAnnouncementById,
	findRegistryById,
};
