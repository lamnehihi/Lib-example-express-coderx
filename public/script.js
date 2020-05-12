// For the default version
const algoliasearch = require('algoliasearch');

const instantsearch = require('instantsearch.js').default;

const index = searchClient.initIndex('books');

console.log("asd")
// Replace with your own values
const searchClient = algoliasearch(
  'OOPVHL2VVS',
  'aa2850302d706fa5d843388f73e422b5' // search only API key, not admin API key
);

const search = instantsearch({
  indexName: index,
  searchClient,
  routing: true,
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 6,
  })
]);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for contacts',
  })
]);

search.addWidgets([
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: document.getElementById('hit-template').innerHTML,
      empty: `We didn't find any results for the search <em>"{{query}}"</em>`,
    },
  })
]);

search.start();
