import React, { Component } from 'react';
import Relay, { createContainer } from 'react-relay';
import { Link } from 'react-router';
import { Toolbar } from '../../components';

class BreweryListPage extends Component {

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
              slug,
              name,
              address
            } = edge.node;

            return (
              <li key={id}>
                <div>
                  <Link to={`/breweries/${slug}`}>{name}</Link>
                </div>
                <div>{address.formatted}</div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

}

export default createContainer(BreweryListPage, {
  fragments: {
    breweries: () => Relay.QL`
      fragment on BreweriesConnection {
        edges {
          node {
            id,
            slug,
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
