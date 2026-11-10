import React from 'react';
import {ScrollView} from 'react-native';

import AlphanumericExample from './AlphanumericExample';
import AnimatedExample from './AnimatedExample';
import BasicExample from './BasicExample';
import MaskExample from './MaskExample';
import UnmaskExample from './UnmaskExample';
import UnderlineExample from './UnderlineExample';
import FormattingExample from './FormattingExample';

const style = {flex: 1, backgroundColor: '#fff'};

const App = () => (
  <ScrollView style={style}>
    <AnimatedExample />
    <FormattingExample />
    <UnmaskExample />
    <MaskExample />
    <UnderlineExample />
    <BasicExample />
    <AlphanumericExample />
  </ScrollView>
);

export default App;
