module.exports = {
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './.babelrc' }],
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
