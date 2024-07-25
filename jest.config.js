module.exports = {
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './.babelrc' }],
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jest-environment-jsdom',
};
