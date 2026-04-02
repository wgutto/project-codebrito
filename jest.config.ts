export default {
    // Transforma arquivos .ts com ts-jest
    preset: "ts-jest",

    // Ambiente onde rodar testes (node ou jsdom)
    testEnvironment: "node",

    // Extensões que devem ser tratadas como ESM
    extensionsToTreatAsEsm: [".ts"],

    // Onde procurar pelos arquivos de teste
    testMatch: ["**/src/test/**/*.test.ts", "**/src/__tests__/**/*.test.ts", "**/*.test.ts"],

    // Extensões de arquivo que Jest aceita
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

    // Arquivos para coletar cobertura de testes
    collectCoverageFrom: ["src/**/*.ts", "!src/**/*.test.ts", "!src/**/*.d.ts"],

    // Configurar ts-jest para ESM
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },

    // Mapear imports com .js para arquivos sem extensão
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
        '^lib/(.*)$': '<rootDir>/src/lib/$1',
        '^services/(.*)$': '<rootDir>/src/services/$1',
    },

    // Mostrar saída mais detalhada
    verbose: true,
}
