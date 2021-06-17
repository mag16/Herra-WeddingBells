require("dotenv").config();
module.exports = {
	development: {
		client: "pg",
		connection: {
			connectionString: process.env.DB_CONNECTION_URI,
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
	production: {
		client: "pg",
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: true,
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
	testing: {
		client: "sqlite3",
		connection: {
			filename: "./database/test.db3",
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
};
