import React from 'react';
import {ScrollView} from 'react-native';

import AnimatedExample from './AnimatedExample';
import BasicExample from './BasicExample';
import MaskExample from './MaskExample';
import UnderlineExample from './UnderlineExample';

const style = {flex: 1, backgroundColor: '#fff'};

const App = () => (
  <ScrollView style={style}>
    <AnimatedExample />
    <BasicExample />
    <UnderlineExample />
    <MaskExample />
  </ScrollView>
);

export default App;
