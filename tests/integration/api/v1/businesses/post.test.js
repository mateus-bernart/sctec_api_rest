import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/businesses", () => {
  test("Create business", async () => {
    const createdBusinessResponse = await fetch(
      "http://localhost:3000/api/v1/businesses",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: "Empresa teste",
          owner_name: "Mateus Bernart",
          city: "Concórdia",
          sector: "Tecnologia",
          email: "mateusbernart14@gmail.com",
        }),
      },
    );

    expect(createdBusinessResponse.status).toBe(201);

    const responseBody = await createdBusinessResponse.json();

    expect(uuidVersion(responseBody.id)).toBe(4);
    expect(Date.parse(responseBody.created_at)).not.toBeNaN();
    expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

    expect(responseBody).toEqual({
      id: responseBody.id,
      name: "Empresa teste",
      owner_name: "Mateus Bernart",
      city: "Concórdia",
      sector: "Tecnologia",
      email: "mateusbernart14@gmail.com",
      created_at: responseBody.created_at,
      updated_at: responseBody.created_at,
      status: responseBody.status,
    });
  });
});
