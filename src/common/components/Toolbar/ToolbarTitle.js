import React, { Component, PropTypes } from 'react';
import styles from './ToolbarTitle.css';

export default class ToolbarTitle extends Component {

  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const {
      text,
      ...other,
    } = this.props;

    return (
      <span {...other} className={styles.root}>
        {text}
      </span>
    );
  }

}
