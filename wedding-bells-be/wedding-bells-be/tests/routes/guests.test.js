const request = require("supertest");
const server = require("../../api/server");
const db = require("../../database/config");

describe("Guests Router", () => {
	describe("GET /api/weddings/:weddingId/guests", () => {
		test("should return HTTP status code 200", async () => {
			const response = await request(server).get("/api/weddings/1/guests");
			expect(response.status).toBe(200);
		});
		test("should return an array of guests", async () => {
			const response = await request(server).get("/api/weddings/1/guests");
			expect(response.body).toBeInstanceOf(Array);
		});
	});

	describe("GET /api/weddings/:weddingId/guests/:id", () => {
		test("should return HTTP status code 200 if found", async () => {
			const response = await request(server).get(
				"/api/weddings/1/guests/40e6215d-b5c6-4896-987c-f30f3678f608"
			);
			expect(response.status).toBe(200);
		});
		test("should return a guest object if found", async () => {
			const response = await request(server).get(
				"/api/weddings/1/guests/40e6215d-b5c6-4896-987c-f30f3678f608"
			);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty(
				"id",
				"40e6215d-b5c6-4896-987c-f30f3678f608"
			);
			expect(response.body).toHaveProperty("name");
			expect(response.body).toHaveProperty("email");
			expect(response.body).toHaveProperty("is_going");
			expect(response.body).toHaveProperty("has_responded");
			expect(response.body).toHaveProperty("plus_one");
			expect(response.body).toHaveProperty("wedding_id");
		});
		test("should return HTTP status code 404 if not found", async () => {
			const nonexistentUUID = "78929338-50db-4cd9-907e-df7c82217a4c";
			const response = await request(server).get(
				`/api/weddings/1/guests/${nonexistentUUID}`
			);
			expect(response.status).toBe(404);
		});
	});

	describe("POST /api/weddings/:weddingId/guests", () => {
		beforeAll(async () => {
			await db("guests").truncate();
			await db.seed.run();
		});

		test("should return HTTP status code 201 if all data present", async () => {
			const mockGuest = {
				name: "Ced",
				email: "ced@gmail.com",
			};

			const response = await request(server)
				.post("/api/weddings/1/guests")
				.send(mockGuest);

			expect(response.status).toBe(201);
		});
		/**
		 * Commenting out the below test because it fails when ran using the SQLite
		 * environment. Will want to uncomment once we move to a Postgres testing
		 * environment.
		 */
		// test("should create a new guest if all data present", async () => {
		// 	const mockGuest = {
		// 		name: "Ced",
		// 		email: "ced@gmail.com",
		// 	};
		// 	const response = await request(server)
		// 		.post("/api/weddings/1/guests")
		// 		.send(mockGuest)l
		// 	expect(response.body).toBeInstanceOf(Object);
		// 	expect(response.body).toHaveProperty("id");
		// 	expect(response.body).toHaveProperty("name");
		// 	expect(response.body).toHaveProperty("email");
		// 	expect(response.body).toHaveProperty("is_going");
		// 	expect(response.body).toHaveProperty("has_responded");
		// 	expect(response.body).toHaveProperty("plus_one");
		// 	expect(response.body).toHaveProperty("wedding_id");
		// });
		// test("should return HTTP status code 400 if missing data", async () => {
		// 	const invalidMockGuest = {
		// 		// missing email
		// 		name: "Ced",
		// 	};

		// 	const response = await request(server)
		// 		.post("/api/weddings/1/guests")
		// 		.send(invalidMockGuest);

		// 	expect(response.status).toBe(400);
		// });
		test("should return HTTP status code 400 if given no data", async () => {
			const emptyMockGuest = {};

			const response = await request(server)
				.post("/api/weddings/4/guests")
				.send(emptyMockGuest);

			expect(response.status).toBe(400);
		});
	});

	describe("PUT /api/weddings/:weddingId/guests/:id", () => {
		test("should return HTTP status code 204 if update was successful", async () => {
			// below UUID is for the first seeded guest
			const existingUserId = "40e6215d-b5c6-4896-987c-f30f3678f608";
			const mockGuestInfo = {
				is_going: false,
				has_responded: true,
				plus_one: false,
			};
			const response = await request(server)
				.put(`/api/weddings/1/guests/${existingUserId}`)
				.send(mockGuestInfo);
			expect(response.status).toBe(204);
		});
		test("should return HTTP status code 404 if guest not found", async () => {
			const nonexistentUUID = "78929338-50db-4cd9-907e-df7c82217a4c";
			const mockGuestInfo = {
				is_going: true,
				plus_one: true,
			};
			const response = await request(server)
				.put(`/api/weddings/1/guests/${nonexistentUUID}`)
				.send(mockGuestInfo);
			expect(response.status).toBe(404);
		});
	});

	describe("DELETE /api/weddings/:weddingId/guests/:id", () => {
		/**
		 * The `beforeEach()` method runs, well, before each of the `test()` methods
		 * inside this specific `describe()` block. The `beforeEach()` is used to
		 * delete then reseed the Guests table since we are making changes directly
		 * to it. Without it, other tests ran subsequently after these DELETE tests will
		 * fail because the specific guest they are operating on would no longer exist.
		 *
		 * `beforeEach()` references:
		 *  - https://jestjs.io/docs/en/api#beforeeachfn-timeout
		 */
		beforeEach(async () => {
			await db("guests").truncate();
			await db.seed.run();
		});
		test("should return HTTP status code 204 if deletion was successful", async () => {
			// below UUID is for the first seeded guest
			const existingUserId = "40e6215d-b5c6-4896-987c-f30f3678f608";
			const response = await request(server).delete(
				`/api/weddings/1/guests/${existingUserId}`
			);
			expect(response.status).toBe(204);
		});
		test("should return HTTP status code 404 if guest not found", async () => {
			const nonexistentUUID = "78929338-50db-4cd9-907e-df7c82217a4c";
			const mockGuestInfo = {
				is_going: true,
				plus_one: true,
			};
			const response = await request(server)
				.delete(`/api/weddings/1/guests/${nonexistentUUID}`)
				.send(mockGuestInfo);
			expect(response.status).toBe(404);
		});
	});
});
