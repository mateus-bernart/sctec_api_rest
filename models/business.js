import database from "infra/database";
import { ValidationError } from "infra/errors";

async function create(businessInputValues) {
  await validateUniqueName(businessInputValues.name);
  await validateUniqueEmail(businessInputValues.email);

  const newUser = await runInsertQuery(businessInputValues);
  return newUser;

  async function runInsertQuery(businessInputValues) {
    const results = await database.query({
      text: `
      INSERT INTO 
        businesses (
          name,
          owner_name,
          city,
          sector,
          email
      ) 
      VALUES 
        ($1, $2, $3, $4, $5)
      RETURNING 
        *
      ;`,
      values: [
        businessInputValues.name,
        businessInputValues.owner_name,
        businessInputValues.city,
        businessInputValues.sector,
        businessInputValues.email,
      ],
    });

    return results.rows[0];
  }
}

async function validateUniqueName(name) {
  const results = await database.query({
    text: `
        SELECT 
          name
        FROM 
          businesses
        WHERE 
          LOWER(name) = LOWER($1)
        LIMIT 1;
      `,
    values: [name],
  });

  if (results.rowCount > 0) {
    throw new ValidationError({
      message: "O nome de usuário já está sendo utilizado.",
      action: "Utilize outro nome de usuário para realizar esta operação.",
    });
  }
}

async function validateUniqueEmail(email) {
  const results = await database.query({
    text: `
      SELECT 
        email 
      FROM 
        businesses
      WHERE 
        LOWER(email) = LOWER($1)
      LIMIT 1
      ;`,
    values: [email],
  });

  if (results.rowCount > 0) {
    throw new ValidationError({
      message: "O email informado já está sendo utilizado.",
      action: "Utilize outro email para realizar esta operação.",
    });
  }
}

const business = {
  create,
};

export default business;
