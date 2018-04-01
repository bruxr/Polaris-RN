import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, PickerIOS, TextInput, Text, View } from 'react-native';

import Card from './Card.js';

export default class CreateWallet extends Component {
  
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      balance: '',
      type: 'S',
    };
  }

  save = () => {
    console.info('saving wallet...');
  }

  render() {
    return (
      <View style={{ marginTop: 64 }}>
        <Text>Name</Text>
        <TextInput
          placeholder="Name"
          style={{
            backgroundColor: '#ffffff',
            borderBottomWidth: 1,
            paddingBottom: 5,
            paddingTop: 5,
          }}
          autoFocus
        />
        <Text>Balance</Text>
        <TextInput
          placeholder="Balance"
          keyboardType="decimal-pad"
          style={{
            backgroundColor: '#ffffff',
            borderBottomWidth: 1,
            paddingBottom: 5,
            paddingTop: 5,
          }}
        />
        <Text>Type</Text>
        <PickerIOS
          selectedValue={this.state.type}
          onValueChange={type => this.setState({ type })}
        >
          <PickerIOS.Item label="Savings" value="S" />
          <PickerIOS.Item label="Credit" value="C" />
        </PickerIOS>
        <Button
          title="Create"
          onPress={this.save}
        />
      </View>
    );
  }

}
