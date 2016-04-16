import React, { Component } from 'react';
import Relay, { createContainer } from 'react-relay';
import { Toolbar } from '../../components';

class BreweriesPage extends Component {

  render() {
    const {
      edges
    } = this.props.breweries;

    return (
      <div>
        <Toolbar />
        <ul>
          {edges.map((edge) => {
            const {
              id,
              name,
              address
            } = edge.node;

            return (
              <li key={id}>
                <div>{name}</div>
                <div>{address.formatted}</div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

}

export default createContainer(BreweriesPage, {
  fragments: {
    breweries: () => Relay.QL`
      fragment on BreweriesConnection {
        edges {
          node {
            id,
            name,
            address {
              formatted
            }
          }
        }
      }
    `
  }
});
