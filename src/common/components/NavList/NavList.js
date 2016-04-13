import React, { Component, PropTypes } from 'react';
import styles from './NavList.css';

export default class NavList extends Component {

  static propTypes = {
    children: PropTypes.node
  }

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
