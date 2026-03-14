const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});

const createJestConfig = nextJest({
  dir: ".",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
};

// Exporta função async para garantir que sobrescrevemos DEPOIS do Next aplicar as dele
async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)();

  return {
    ...nextJestConfig,
    transformIgnorePatterns: [
      // Mantém o que o Next.js adicionou (geralmente ignora node_modules)
      // e abre exceção para node-pg-migrate
      "/node_modules/(?!(node-pg-migrate|uuid)/)",
    ],
  };
}

module.exports = jestConfig;
