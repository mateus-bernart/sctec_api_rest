import orchestrator from "tests/integration/orchestrator";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/businesses", () => {
  test("Return valid response", async () => {
    const createdUserResponse = await fetch(
      "http://localhost:3000/api/v1/businesses",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: "Mateus Empresa",
          owner_name: "Mateus",
          city: "Concordia",
          sector: "Tecnologia",
          email: "mateusbernart14@gmail.com",
        }),
      },
    );

    expect(createdUserResponse.status).toBe(201);

    const responseBody = await createdUserResponse.json();

    // expect(uuidVersion(responseBody.id)).toBe(4);
    // expect(Date.parse(responseBody.created_at)).not.toBeNaN();
    // expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

    expect(responseBody).toEqual({
      id: responseBody.id,
      name: "Mateus Empresa",
      owner_name: "Mateus",
      city: "Concordia",
      sector: "Tecnologia",
      email: "mateusbernart14@gmail.com",
      created_at: responseBody.created_at,
      updated_at: responseBody.created_at,
      status: responseBody.status,
    });
  });
});
