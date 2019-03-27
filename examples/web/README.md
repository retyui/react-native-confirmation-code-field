# this repository was initiated with create-react-native-web-app

[![NPM](https://nodei.co/npm/create-react-native-web-app.png)](https://npmjs.org/package/create-react-native-web-app)

![GitHub issues](https://img.shields.io/github/issues/VISI-ONE/create-react-native-web-app.svg)
![license](https://img.shields.io/github/license/VISI-ONE/create-react-native-web-app.svg)
![GitHub top language](https://img.shields.io/github/languages/top/VISI-ONE/create-react-native-web-app.svg)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/create-react-native-web-app.svg)
![npm](https://img.shields.io/npm/v/create-react-native-web-app.svg)

### A simple CLI tool to start your React Native Web project to develop same app for IOS Android and Web. Constructed from create-react-app and create-react-native-app

<p align="center" >
<img width="300"  src="https://raw.githubusercontent.com/VISI-ONE/create-react-native-web-app/master/template/src/logo.png">
</p>

## Installation

- Android - Install [adb (Android Debug Bridge)](https://developer.android.com/studio/releases/platform-tools.html)
- IOS - Xcode and an apple device required


- Install the package globally and run it with your name of choice

```sh
# Install package
$ npm install -g create-react-native-web-app

# Run create-react-native-web-app <project-directory>
$ create-react-native-web-app myApp

# cd into your <project-directory>
$ cd myApp

# Run Web/Ios/Android development
# Web
$ npm run web

# IOS (simulator)
$ npm run ios

# Android (connected device)
$ npm run android

```

- Optional - Install Xcode and Android studio and follow the react native instructions [under the "Building Projects with Native Code" tab](http://facebook.github.io/react-native/docs/getting-started.html)

<p align="center" >
<img width="1000"  src="https://raw.githubusercontent.com/VISI-ONE/create-react-native-web-app/master/cli_preview.png">
</p>

## Folder structure
```
myApp
├── node_modules
├── package.json
├── index.js
├── .watchmanconfig
├── .flowconfig
├── app.json
├── .gitignore
├── android (When opening with Android studio, open this folder)
│   └── android project files
├── config
│   ├── jest
│   │    │── initTest.js
│   │    │── native.jest.config.js
│   │    │── web.jest.config.js
│   │    └── jest transform files
│   ├── env.js
│   ├── paths.js
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.prod.js
│   └── webpackDevServer.config.js
├── ios (When opening with Xcode, open this folder)
│   └── ios project files
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── scripts
│   ├── build.js
│   ├── start.js
│   ├── switchSnapshots.js
│   └── test.js
└── src
    ├── App.js
    ├── App.test.js
    ├── index.css # global
    ├── index.js
    ├── logo.png
    └── registerServiceWorker.js
```

[Example app built with this CLI](https://github.com/VISI-ONE/create-react-native-web-example)

## Testing

```sh
# Web and Native
$ npm run test

# Web
$ npm run test:web

# Web watch mode
$ npm run test:web-watch


# Native
$ npm run test:native

# Native watch mode
$ npm run test:native-watch


# Coverage - web
$ npm run coverage

# Coverage - native
$ npm run coverage:native
```

## Debugging

Open dev menu:
1. CMD+D (IOS) / CMD+M (Android)
2. Press "Enable Live-Reload"

[React native docs - debugging real devices guide](http://facebook.github.io/react-native/releases/0.49/docs/running-on-device.html)

[React native docs - debugging guide](http://facebook.github.io/react-native/docs/debugging.html)

[Network calls in the devtools](http://www.preslav.me/2017/03/26/debugging-network-calls-in-react-native-using-the-chrome-debugger/)

## Build
```sh
# Web
$ npm run build

# Android - upgrade the current build version in `android/app/build.gradle` file (both the `versionCode` and the `versionName`)
Example:
versionCode 2
versionName "1.1"

# And then run the build
$ cd android && ./gradlew assembleRelease

# Open apk folder to find the release apk
$ open ./android/app/build/outputs/apk
```

[React native docs - Android signed apk](http://facebook.github.io/react-native/releases/0.49/docs/signed-apk-android.html)

[React native docs for IOS](http://facebook.github.io/react-native/releases/0.49/docs/running-on-device.html#building-your-app-for-production)

## Troubleshooting
Issues with Xcode 10 (newest version) - https://github.com/facebook/react-native/issues/19573

If you got `Execution failed for task ':app:compileDebugAidl'` when running `yarn android`, try to update Android Gradle plugin to version 3.1.1 and Gradle to version 4.4.

Here is how to do that:
1. Open **Android Studio**
1. Open the `android` project
<br /><img src="https://cdn-images-1.medium.com/max/800/1*jyLo3Jk-nudieT3aaEzUBQ.png" />
1. Click `Update` on this prompt
<br /><img src="https://cdn-images-1.medium.com/max/800/1*7I2tqGZ9C63aUGOtae-XHg.png">
1. Wait for Android Studio syncing the project.

If you got `FAILURE: Build failed with an exception.`, examine the warnings:

1. WARNING: `The specified Android SDK Build Tools version (23.0.1) is ignored, as it is below the minimum supported version (27.0.3) for Android Gradle Plugin 3.1.1.`
<br />Solution: Update Build Tools
<br /><img src="https://cdn-images-1.medium.com/max/1000/1*GUlICoUm4cU4KzUfps3W0Q.png" />

1. WARNING: `Configuration 'compile' is obsolete and has been replaced with 'implementation' and 'api'.`
<br />Solution: Change `compile` to `implementation` by open `app/build.gradle` file, change `dependencies` section (line 139) to use `implementation` instead of `compile` .

```java
dependencies {
  implementation fileTree(dir: "libs", include: ["*.jar"])
  implementation "com.android.support:appcompat-v7:23.0.1"
  implementation "com.facebook.react:react-native:+"
}
```

Sync it again and now you can close Android Studio. See issue [#7](https://github.com/VISI-ONE/create-react-native-web-app/issues/7#issuecomment-432263368) for your references.

## Contributors
||:octocat:|
|-|-|
|Or Yoffe|https://github.com/orYoffe|
|Havit C. Rovik|https://github.com/haruelrovix|

## Resources
- [React Native for Web (react-native-web)](https://github.com/necolas/react-native-web)
- [React](https://reactjs.org/)
- [React Native](http://facebook.github.io/react-native/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Create React Native App](https://github.com/react-community/create-react-native-app)
