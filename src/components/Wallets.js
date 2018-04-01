import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import Card from './Card.js';
import CreateWallet from './CreateWallet.js';
import { getAccounts } from '../api/accounts.js';

export default class Wallets extends Component {
  
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      wallets: [],
    };
  }

  componentDidMount() {
    getAccounts().then(accounts => {
      const wallets = accounts.map(account => Object.assign({}, account));
      this.setState({ wallets });
    });
  }

  createWallet() {
    this.props.navigator.push({
      title: 'Create Wallet',
      component: CreateWallet,
    });
  }

  render() {
    return (
      <ScrollView>
        {this.state.wallets.map(wallet => {
          return (
            <Card
              key={wallet.id}
              style={{
                marginBottom: 15,
              }}
            >
              <Text>{wallet.name}</Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                }}
              >
                ₱ {wallet.balance / 100}
              </Text>
            </Card>
          );
        })}
      </ScrollView>
    );
  }

}
