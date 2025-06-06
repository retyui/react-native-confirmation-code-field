const path = require('node:path');
const {makeMetroConfig} = require('@rnx-kit/metro-config');
module.exports = makeMetroConfig({
  watchFolders: [path.resolve(__dirname, '../..')],
  resolver: {
    nodeModulesPaths: [path.resolve(__dirname, './node_modules')],
    unstable_enableSymlinks: true,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
