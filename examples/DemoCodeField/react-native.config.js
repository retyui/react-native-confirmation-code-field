const project = (() => {
  try {
    const { configureProjects } = require("react-native-test-app");
    return configureProjects({
      android: {
        sourceDir: "android",
      },
      ios: {
        sourceDir: "ios",
      },
      windows: {
        sourceDir: "windows",
        solutionFile: "windows/DemoCodeField.sln",
      },
    });
  } catch (_) {
    return undefined;
  }
})();

module.exports = {
  ...(project ? { project } : undefined),
};
