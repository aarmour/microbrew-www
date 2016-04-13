import React, { Component, PropTypes } from 'react';
import styles from './NavList.css';

export default class NavListItem extends Component {

  static propTypes = {
    icon: PropTypes.element,
    navIcon: PropTypes.element,
    text: PropTypes.string
  }

  render() {
    const {
      icon,
      navIcon,
      text,
      ...other
    } = this.props;

    return (
      <div {...other}>
        <div>{icon}</div>
        <div>{text}</div>
        <div>{navIcon}</div>
      </div>
    );
  }

}
