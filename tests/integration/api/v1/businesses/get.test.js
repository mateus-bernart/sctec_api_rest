import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET api/v1/businesses/[id]", () => {
  test("Get business by id", async () => {
    const createdBusiness = await orchestrator.createBusiness();

    const response = await fetch(
      `http://localhost:3000/api/v1/businesses/${createdBusiness.id}`,
    );

    expect(response.status).toBe(200);

    const businessReponseBody = await response.json();

    expect(uuidVersion(businessReponseBody.id)).toBe(4);
    expect(Date.parse(businessReponseBody.created_at)).not.toBeNaN();
    expect(Date.parse(businessReponseBody.updated_at)).not.toBeNaN();

    expect(businessReponseBody).toEqual({
      id: businessReponseBody.id,
      name: createdBusiness.name,
      owner_name: createdBusiness.owner_name,
      city: createdBusiness.city,
      sector: createdBusiness.sector,
      email: createdBusiness.email,
      status: true,
      created_at: businessReponseBody.created_at,
      updated_at: businessReponseBody.updated_at,
    });
  });

  test("Get all businesses", async () => {
    await orchestrator.deleteAllBusinesses();
    await orchestrator.createBusiness();
    await orchestrator.createBusiness();

    const response = await fetch("http://localhost:3000/api/v1/businesses");
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).not.toBeNaN();

    if (responseBody.length > 0) {
      expect(responseBody).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            owner_name: expect.any(String),
            city: expect.any(String),
            sector: expect.any(String),
            email: expect.any(String),
            status: expect.any(Boolean),
            created_at: expect.any(String),
            updated_at: expect.any(String),
          }),
        ]),
      );
    } else {
      expect(responseBody).toEqual([]);
    }
  });
});
