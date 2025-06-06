const ReactCompilerConfig = {
  target: '18',
  compilationMode: 'annotation',
  panicThreshold: 'all_errors',
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
};
