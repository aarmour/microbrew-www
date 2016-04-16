import React, { Component } from 'react';
import { Link } from 'react-router';
import { Toolbar, NavList, NavListItem } from '../../components';

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <Toolbar />
        <NavList>
          <NavListItem text={<Link to="/breweries">Breweries</Link>} />
        </NavList>
      </div>
    );
  }

}
