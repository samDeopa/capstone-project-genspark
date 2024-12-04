module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^react-router-dom$": "./node_modules/react-router-dom",
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
