import Relay from 'react-relay';

export default {
  breweries: (Component) => Relay.QL`
    query {
      breweries {
        ${Component.getFragment('breweries')}
      }
    }
  `
}
