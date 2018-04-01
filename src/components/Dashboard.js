import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, Text, TouchableHighlight } from 'react-native';

import Card from './Card.js';
import Wallets from './Wallets.js';
import { getAccounts } from '../api/accounts';

class Dashboard extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      netWorth: 0,
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);

    getAccounts().then((accounts) => {
      let netWorth = 0;
      accounts.forEach(a => netWorth += a.balance);
      this.setState({ netWorth });
    });
  }

  manageWallets = () => {
    this.props.navigator.push({
      title: 'Wallets',
      component: Wallets,
      rightButtonTitle: 'Create',
      passProps: {
        ref: (wallets) => { this._walletsView = wallets; }
      },
      onRightButtonPress: () => {
        this._walletsView && this._walletsView.createWallet();
      }
    });
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <Text>Net Worth</Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            ₱ {this.state.netWorth / 100}
          </Text>
          <TouchableHighlight
            onPress={this.manageWallets}
          >
            <Text
              style={{
                color: '#268bd2',
              }}
            >
              Manage Wallets
            </Text>
          </TouchableHighlight>
        </Card>
      </ScrollView>
    );
  }
}

export default Dashboard;
