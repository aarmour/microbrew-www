import React, { Component } from 'react';
// import { createContainer } from 'react-relay';

export default class App extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

// export default createContainer(App, {
//   fragments: {}
// });
