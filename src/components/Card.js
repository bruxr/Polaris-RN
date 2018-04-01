import React, { Component } from 'react';
import { View } from 'react-native';

export default class Card extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          marginBottom: 15,
          marginLeft: 15,
          marginRight: 15,
          padding: 15,
        }}>
        {this.props.children}
      </View>
    );
  }
}
