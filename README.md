# react-native-confirmation-code-field

[![npm](https://img.shields.io/npm/v/react-native-confirmation-code-field.svg)](https://www.npmjs.com/package/react-native-confirmation-code-field)
[![Travis](https://img.shields.io/travis/retyui/react-native-confirmation-code-field.svg?label=unix)](https://travis-ci.org/retyui/react-native-confirmation-code-field)

A react-native confirmation code field for both IOS and Android (base on [this](https://github.com/ttdung11t2/react-native-confirmation-code-input) project [Migration Guide](migration.md))

## Links

- [API](docs/API.md)
- [Real Example](examples/rn56)
- [Live demo IOS\Android](https://snack.expo.io/@retyui/demo-for-react-native-confirmation-code-field)
- [Live demo `react-native-web`](https://retyui.github.io/react-native-confirmation-code-field/)

## Screenshots

<img width="250" height="312" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/redDemo.jpg"/><img width="250" height="312" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/darkDemo.jpg"/>

## Install

```sh
yarn add react-native-confirmation-code-field
# or
npm install react-native-confirmation-code-field
```

## Usage

```js
import React, { Component } from 'react';
import CodeInput from 'react-native-confirmation-code-field';

class App extends Component {
  handlerOnFulfill = code => console.log(code);

  render() {
    return <CodeInput onFulfill={this.handlerOnFulfill} />;
  }
}
```
