const request = require("supertest");
const server = require("../../api/server");

/* ---------------------- User Endpoints ---------------*/

describe("GET /", () => {
	it('has process.env.DB_ENV as "testing"', () => {
		expect(process.env.DB_ENV).toBe("testing");
	});
});

describe("/api/users CRUD", function() {
	it("should create a user", async function(done) {
		request(server)
			.post("/api/users")
			.send({
				spouse_one_name: "Gaston",
				spouse_two_name: "Linda",
				email: "gastonandlinda@gmail.com",
				password: "donfftgetmarriedagainguyspleaseeee",
			})
			.set("Accept", "application/json")
			.expect(201);
		done();
	});

	it("should return 500 if missing spouse names,email,password fields of user", async function(done) {
		request(server)
			.post("/api/users")
			.send({
				spouse_one_name: "",
				spouse_two_name: null,
				email: "",
				password: "",
			})
			.expect(500);
		done();
	});

	it("it should update a user", async function(done) {
		request(server)
			.put("/api/users/1")
			.send({
				spouse_one_name: "Robert",
				spouse_two_name: "Jane",
				email: "robertandjane@gmail.com",
				password: "partytime123",
			})
			.expect(200);
		done();
	});

	it("should return the user associated with the given ID", async function(done) {
		request(server)
			.get("/api/users/1")
			.expect(200);
		done();
	});

	it("should delete a user", async function(done) {
		request(server)
			.del("/api/users/2")
			.expect(200)
		done();
	});

	it("should respond with 404 when no user is found to delete", async function(done) {
		request(server)
			.del("/api/users/")
			.expect(404);
		done();
	});
});

jest.setTimeout(30000);

/* ---------------------- Authentication ---------------*/
