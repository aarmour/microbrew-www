const fs = require('fs');
const path = require('path');
const omit = require('lodash.omit');
const Client = require('elasticsearch').Client;

const client = new Client({
  host: '192.168.99.100:9200',
  log: 'trace'
});

const template = fs.readFileSync(path.join(__dirname, 'db.template.json'), 'utf8');
const seedData = require('./seed.json');

client.indices.putTemplate({
  body: template,
  name: 'db'
})
  .then(() => client.bulk({ body: formatIndexBulkRequest('db', 'breweries', seedData.breweries) }))
  .then(() => client.bulk({ body: formatIndexBulkRequest('db', 'beers', seedData.beers) }))
  .catch(err => {throw err});

function formatIndexBulkRequest(index, type, docs) {
  const body = docs.reduce((data, doc) => {
    const action = {
      index: {
        _index: index,
        _type: type,
        _id: doc._id
      }
    };

    doc = omit(doc, ['_id']);

    return [...data, action, doc];
  }, []);

  return body;
}
