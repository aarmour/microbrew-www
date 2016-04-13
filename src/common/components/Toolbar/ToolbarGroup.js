import React, { Component, PropTypes } from 'react';
import styles from './ToolbarGroup.css';

export default class ToolbarGroup extends Component {

  static propTypes = {
    children: PropTypes.node,
    region: PropTypes.oneOf(['left', 'center', 'right'])
  };

  render() {
    const {
      children,
      region,
      ...other
    } = this.props;

    return (
      <div {...other} className={styles.root}>
        {children}
      </div>
    );
  }

}
