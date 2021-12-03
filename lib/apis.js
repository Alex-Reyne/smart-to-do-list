const axios = require("axios");
const { RowDescriptionMessage } = require("pg-protocol/dist/messages");
require("dotenv").config();

const foodApi = async function(text) {
  const url = `https://api.yelp.com/v3/businesses/search?term=${text}`

  let bool = false;
  await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${process.env.FOODAPI_KEY}`
      },
      params: {
        location: 'saskatoon',
        categories: 'Food',
        limit: 3,

     }

    })
    .then(response => {
      let match = [];
      for (const obj of response.data.businesses) {
        match.push(obj.name);
      }
      return match;
    })
    .then((res) => {
      if (res.length === 0) {
        return;
      }
      for (const name of res) {
        if (name.toLowerCase().replace(/ /g, '') === text.replace(/ /g, '')) {
          bool = true;
        }
      }
    })
    .catch(error => {
      console.log(error);
    });

    return bool;
};

const moviesApi = async function(text) {
  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/auto-complete',
    params: {q: text},
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': `${process.env.IMDB_API}`
    }
  };

  let bool = false;

  await axios.request(options)
      .then((response) => {
        const desc = [];
        for (const obj of response.data.d) {
          if (obj.l.toLowerCase().replace(/ /g, '') === text.toLowerCase().replace(/ /g, '')) {
            for (const obj of response.data.d) {
              desc.push(obj.q);
            }
          }
        }
        return desc;
      })
      .then((res) => {
        for (const type of res) {
          if (type) {
            if (type.includes('TV') || type.includes('movie') || type.includes('feature')) {
              bool = true;
            }
          }
        }
      })
      .catch(function (error) {
      	console.error(error);
      });

    return bool;
};

const booksApis = async function(text) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${text}`
  let bool = false;
  await axios
    .get(url)
    .then(response => {
      if (text.toLowerCase().replace(/ /g, '') === response.data.items[0].volumeInfo.title.toLowerCase().replace(/ /g, '')) {
        bool = true;
      }
    })
    .catch(error => {
      console.log(error);
    });
    return bool;
}
module.exports = { booksApis, moviesApi, foodApi};
