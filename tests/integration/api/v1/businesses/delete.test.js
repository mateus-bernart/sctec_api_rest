import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("DELETE api/v1/businesses/[id]", () => {
  test("Delete business by id", async () => {
    const createdBusiness = await orchestrator.createBusiness();

    const response = await fetch(
      `http://localhost:3000/api/v1/businesses/${createdBusiness.id}`,
      { method: "DELETE" },
    );

    expect(response.status).toBe(200);

    const businessReponseBody = await response.json();

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

    const response2 = await fetch(
      `http://localhost:3000/api/v1/businesses/${businessReponseBody.id}`,
    );

    expect(response2.status).toBe(404);

    const businessReponseBody2 = await response2.json();

    expect(Date.parse(businessReponseBody2.created_at)).toBeNaN();
    expect(Date.parse(businessReponseBody2.updated_at)).toBeNaN();

    expect(businessReponseBody2).toEqual({
      action: "Verifique se os parâmetros enviados na consulta estão certos.",
      message: "Não foi possível encontrar empresa no sistema",
      name: "NotFoundError",
      status_code: 404,
    });
  });
});
