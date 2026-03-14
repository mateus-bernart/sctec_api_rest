import database from "infra/database/database";
import { NotFoundError, ValidationError } from "infra/errors/errors";

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

async function findOneById(id) {
  const results = await database.query({
    text: `
      SELECT 
        * 
      FROM  
        businesses 
      WHERE id = $1
      LIMIT 1
      ;`,
    values: [id],
  });

  return results.rows[0];
}

async function findOrFail(id) {
  const businessFound = await business.findOneById(id);

  if (!businessFound) {
    throw new NotFoundError({
      message: "Não foi possível encontrar empresa no sistema",
    });
  }

  return businessFound;
}

async function deleteRecord(id) {
  const results = await database.query({
    text: `
      DELETE 
      FROM  
        businesses 
      WHERE id = $1
      RETURNING *
      ;`,
    values: [id],
  });

  return results.rows[0];
}

async function update(values, id) {
  const results = await database.query({
    text: `
      UPDATE 
        businesses 
      SET 
        name = $1,
        owner_name = $2,
        city = $3,
        sector = $4,
        email = $5,
        updated_at = timezone('utc', now())
      WHERE id = $6
      RETURNING *
      ;`,
    values: [
      values.name,
      values.owner_name,
      values.city,
      values.sector,
      values.email,
      id,
    ],
  });

  return results.rows[0];
}

async function getAll() {
  const results = await database.query({
    text: `
      SELECT 
        *
      FROM 
        businesses
      ;`,
    values: [],
  });

  return results.rows;
}

async function deleteAll() {
  const results = await database.query({
    text: `
      DELETE 
      FROM 
        businesses
      ;`,
    values: [],
  });

  return results.rows;
}

const business = {
  create,
  findOneById,
  deleteRecord,
  update,
  getAll,
  deleteAll,
  findOrFail,
};

export default business;
