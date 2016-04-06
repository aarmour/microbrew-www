import React, { Component } from 'react';
import styles from './Toolbar.css';

export default class Toolbar extends Component {

  render() {
    const {
      children,
      ...other
    } = this.props;

    return (
      <div {...other} className={styles.root}>
        {children}
      </div>
    );
  }

}
