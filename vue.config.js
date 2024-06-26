const AutoImport = require('unplugin-auto-import/webpack').default;
const Components = require('unplugin-vue-components/webpack').default;
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

// import AutoImport from 'unplugin-auto-import/webpack';
// import Components from 'unplugin-vue-components/webpack';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  pluginOptions: {
    electronBuilder: {
      externals: ["electron-log"],
      nodeIntegration: false,
      preload: "src/preload.js",
      builderOptions: {
        // afterPack: "./scripts/postbuild.js",
        appId: "com.megasanjay.electronvueflask",
        afterSign: "./scripts/notarize.js",
        asar: true,
        generateUpdatesFilesForAllChannels: true,
        files: ["**/*", "!pyflask/", "!build/", "!api.spec"],
        win: {
          target: "nsis",
          icon: "./src/assets/app-icons/windowsAppIcon.ico",
          extraResources: [{ from: "./src/pyflaskdist/api.exe" }],
        },
        mac: {
          target: ["dmg", "zip"],
          // arch: ["x64", "arm64"],
          icon: "./src/assets/app-icons/macAppIcon.png",
          extraResources: [{ from: "./src/pyflaskdist/api" }],
          darkModeSupport: false,
          hardenedRuntime: true,
          gatekeeperAssess: false,
          entitlements: "./entitlements.mac.inherit.plist",
          entitlementsInherit: "./entitlements.mac.inherit.plist",
        },
        linux: {
          target: "AppImage",
          icon: "./src/assets/app-icons/linuxAppIcon.png",
          extraResources: [{ from: "./src/pyflaskdist/api" }],
        },
        nsis: {
          createDesktopShortcut: "always",
          oneClick: true,
          deleteAppDataOnUninstall: true,
          installerIcon: "./src/assets/app-icons/windowsAppIcon.ico",
        },
        publish: {
          provider: "github",
          repository: "https://github.com/megasanjay/electron-vue3-flask.git",
        },
      },
    },
  },
};
