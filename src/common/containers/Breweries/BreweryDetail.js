import React, { Component } from 'react';
import Relay, { createContainer } from 'react-relay';
import { Toolbar } from '../../components';

class BreweryDetailPage extends Component {

  render() {
    const {
      name,
      address
    } = this.props.brewery;

    return (
      <div>
        <Toolbar />
        <div>{name}</div>
        <div>{address.formatted}</div>
      </div>
    );
  }

}

export default createContainer(BreweryDetailPage, {
  fragments: {
    brewery: () => Relay.QL`
      fragment on Brewery {
        name,
        address {
          formatted
        }
      }
    `
  }
});
