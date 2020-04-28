import React from 'react';
import {ScrollView} from 'react-native';

import AnimatedExample from './AnimatedExample';
import BasicExample from './BasicExample';
import MaskExample from './MaskExample';

const style = {flex: 1, backgroundColor: '#fff'};

const App = () => (
  <ScrollView style={style}>
    <BasicExample />
    <MaskExample />
    <AnimatedExample />
  </ScrollView>
);

export default App;
