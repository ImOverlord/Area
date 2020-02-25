module.exports = {
    rootDir: "../",
    roots: [
        "<rootDir>/tests/"
    ],
    modulePathIgnorePatterns: [
        "<rootDir>/tests/env.ts"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/tests/.*|(\\.|/)(jest|spec))\\.tsx?$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    collectCoverage: false,
};
