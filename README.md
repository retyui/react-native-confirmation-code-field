# react-native-confirmation-code-field

[![npm](https://img.shields.io/npm/v/react-native-confirmation-code-field.svg)](https://www.npmjs.com/package/react-native-confirmation-code-field)
[![Travis](https://img.shields.io/travis/retyui/react-native-confirmation-code-field.svg?label=unix)](https://travis-ci.org/retyui/react-native-confirmation-code-field)

A react-native confirmation code field compatible with IOS, Android and Web Platforms (based on [this](https://github.com/ttdung11t2/react-native-confirmation-code-input) project [Migration Guide](docs/migration.md))

### Component features:

- 🔮 Simple. Easy to use;
- 🍎 IOS "fast paste SMS-code" support (\* and custom code paste for Android);
- 🚮 Clearing part of the code by clicking on the cell;
- ⚡ `blur()` and `focus()` methods support;
- 🛠 Extendable and hackable;
- 🤓 Readable [changelog](CHANGELOG.md).

## Links

- [API documentation](docs/API.md)
- [Example](examples/rn57)
- Live demo [IOS / Android](https://snack.expo.io/@retyui/demo-for-react-native-confirmation-code-field), [react-native-web](https://retyui.github.io/react-native-confirmation-code-field/)

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

## How paste or clear code

Paste code can helpful for Android platform when you can read SMS.

```js
import React, { Component, createRef } from 'react';
import CodeInput from 'react-native-confirmation-code-field';

class App extends Component {
  handlerOnFulfill = code => {
    if (isValidCode(code)) {
      console.log(code);
    } else {
      this.clearCode();
    }
  };

  field = createRef();

  clearCode() {
    const { current } = this.field;

    if (current) {
      current.clear();
    }
  }

  pasteCode() {
    const { current } = this.field;

    if (current) {
      current.handlerOnTextChange(value);
    }
  }

  render() {
    return <CodeInput ref={this.field} onFulfill={this.handlerOnFulfill} />;
  }
}
```

## How it works?

This component consists of:

1. Container `<View {...containerProps}/>`;
2. Render the "Cells" for the text code inside the container ("Cells" is `<TextInput {...cellProps} />`);
3. And over this render invisible `<TextInput {...inputProps}/>`;
4. "Cursor" inside cell is [simulated component](src/components/Cursor.js)
