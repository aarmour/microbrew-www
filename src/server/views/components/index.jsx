import React, { Component } from 'react';

export default class Index extends Component {

  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          <div id="react-mount"
            dangerouslySetInnerHTML={{ __html: this.props.html }}>
          </div>
        </body>
      </html>
    );
  }

}
