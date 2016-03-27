import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

export default class HomePage extends Component {

  render() {
    return (
      <div className={styles.page}>
        <ul>
          <li><Link to="breweries">Breweries</Link></li>
          <li><Link to="beers">Beers</Link></li>
        </ul>
      </div>
    );
  }

}
