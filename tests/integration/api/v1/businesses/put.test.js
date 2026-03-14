import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PUT api/v1/businesses/[id]", () => {
  test("Update business by id", async () => {
    const createdBusiness = await orchestrator.createBusiness();

    const updateBusinessResponse = await fetch(
      `http://localhost:3000/api/v1/businesses/${createdBusiness.id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: "Nome da empresa atualizado",
          owner_name: "NomeAtualizado",
          city: "CidadeAtualizada",
          sector: "SetorAtualizado",
          email: "emailatualizado@gmail.com",
        }),
      },
    );

    expect(updateBusinessResponse.status).toBe(200);

    const updatedBusinessResponseBody = await updateBusinessResponse.json();

    expect(uuidVersion(updatedBusinessResponseBody.id)).toBe(4);
    expect(Date.parse(updatedBusinessResponseBody.created_at)).not.toBeNaN();
    expect(Date.parse(updatedBusinessResponseBody.updated_at)).not.toBeNaN();

    expect(
      updatedBusinessResponseBody.updated_at >
        updatedBusinessResponseBody.created_at,
    ).toBe(true);

    expect(updatedBusinessResponseBody).toEqual({
      id: updatedBusinessResponseBody.id,
      name: "Nome da empresa atualizado",
      owner_name: "NomeAtualizado",
      city: "CidadeAtualizada",
      sector: "SetorAtualizado",
      email: "emailatualizado@gmail.com",
      status: true,
      created_at: updatedBusinessResponseBody.created_at,
      updated_at: updatedBusinessResponseBody.updated_at,
    });
  });
});
