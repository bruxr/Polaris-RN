import React from 'react';
import { NavigatorIOS } from 'react-native';

import Dashboard from './src/components/Dashboard.js';

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Dashboard,
          title: 'Polaris',
        }}
        style={{
          flex: 1,
        }}
        itemWrapperStyle={{
          backgroundColor: '#eeeeee',
          paddingTop: 15,
        }}
        barStyle="black"
        barTintColor="black"
        translucent
      />
    );
  }
}
