//Instantiate Express, Cors, helmet, express-session, connect-session-knex,express for nodeJS
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const server = express();

//Import routes from the router file here
const usersRouter = require("../routes/userRouter");
const weddingsRouter = require("../routes/weddingRouter");
const authRouter = require("../routes/authRouter");

//Import the secrets file for jsonwebtoken here
const secrets = require("../config/secrets.js");

//Import middleware to be used on routes for authentication here
const { restricted } = require("../middleware");

//Insert Session options here
const sessionOptions = {
	name: "weddingBells",
	secret: secrets.jwtSecret,
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false,
		httpOnly: true,
	},
	resave: false,
	saveUninitialized: false,

	store: new knexSessionStore({
		knex: require("../database/config"),
		tablename: "sessions",
		sidfieldname: "sid",
		createtable: true,
		clearInterval: 1000 * 60 * 60,
	}),
};

//All routes will use the following express packages
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionOptions));

// Routes

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/weddings", weddingsRouter);

//This is what is shown from the backend when you go to the localhost:5000/
server.get("/", (req, res) => {
	res.send("Welcome to the Wedding Bells Back End Repo");
});

module.exports = server;
