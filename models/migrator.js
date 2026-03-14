import database from "infra/database";
import { ServiceError } from "infra/errors";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";

const defaultMigationOptions = {
  dryRun: false,
  dir: resolve("infra", "migrations"),
  direction: "up",
  log: () => {}, //enviar logs para nenhum lugar.
  migrationsTable: "pgmigrations",
};

async function getMigrationRunner() {
  const module = await import("node-pg-migrate");
  return module.runner;
}

async function listPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const migrationRunner = await getMigrationRunner();
    const pendingMigrations = await migrationRunner({
      ...defaultMigationOptions,
      dbClient,
    });

    return pendingMigrations;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro ao rodar as migrations",
      cause: error,
    });
    throw serviceErrorObject;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const migrationRunner = await getMigrationRunner();

    const migratedMigrations = await migrationRunner({
      ...defaultMigationOptions,
      dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro ao rodar as migrations",
      cause: error,
    });
    throw serviceErrorObject;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
