export class Brewery {}

const breweries = [
  Object.assign(new Brewery(), {
    id: '0',
    slug: 'us/co/0',
    name: 'Foo Brewery',
    address: {
      street: '123 Main Street',
      city: 'Boulder',
      state: 'CO',
      postal_code: '80219'
    },
    coordinates: {
      x: 42.012345,
      y: -106.234567
    }
  }),
  Object.assign(new Brewery(), {
    id: '11',
    slug: 'us/co/1',
    name: 'Bar Brewery',
    address: {
      street: '9876 Anywhere Street',
      city: 'Denver',
      state: 'CO',
      postal_code: '80222'
    },
    coordinates: {
      x: 42.012345,
      y: -106.234567
    }
  })
];

export function getBrewery(id) {
  return breweries[id];
}

export function getBreweries() {
  return breweries;
}
