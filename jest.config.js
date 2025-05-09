/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
 testEnvironment: "jest-environment-jsdom", 
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", 
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/mocks/styleMock.js", 
  },
  globals: {
    "ts-jest": {
      isolatedModules: true, 
    },
  },
};
