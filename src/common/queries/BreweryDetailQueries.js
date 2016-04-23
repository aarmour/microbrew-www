import Relay from 'react-relay';

export default {
  brewery: (Component) => Relay.QL`
    query {
      brewery(slug: $slug) {
        ${Component.getFragment('brewery')}
      }
    }
  `
};
