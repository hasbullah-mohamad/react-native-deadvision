import React, { Component } from 'react';
import { YellowBox } from 'react-native';

import Screen from './src/screens';

YellowBox.ignoreWarnings(['Remote debugger']);

class App extends Component {
  render() {
    return (
      <Screen />
    );
  }
}

export default App;
