import { faker } from "@faker-js/faker/.";
import retry from "async-retry";
import database from "infra/database/database";
import business from "models/business";
import migrator from "models/migrator";

async function waitForAllServices() {
  await waitForWebServer();
  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      await response.json();
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

async function createBusiness(businessObject = {}) {
  return await business.create({
    name: businessObject.name || faker.company.name().replace(/[_.-]/g, ""),
    owner_name:
      businessObject.owner_name ||
      faker.internet.username().replace(/[_.-]/g, ""),
    city: businessObject.city || faker.location.city(),
    sector: businessObject.sector || faker.commerce.department(),
    email: businessObject.email || faker.internet.email(),
  });
}

async function deleteAllBusinesses() {
  await business.deleteAll();
}

const orchestrator = {
  runPendingMigrations,
  createBusiness,
  clearDatabase,
  waitForAllServices,
  deleteAllBusinesses,
};

export default orchestrator;
