const ReactCompilerConfig = {
  target: '19',
  compilationMode: 'annotation',
  panicThreshold: 'all_errors',
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
};
