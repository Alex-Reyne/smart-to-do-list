const axios = require("axios");
require("dotenv").config();


const wolfRam = async function(text) {
  const url = `http://api.wolframalpha.com/v2/query?appid=${process.env.WOLFRAM_API}&input=${text}&output=json`
  let res = await axios
    .get(url)
    .then(response => {
      console.log("wolfram api response", response.data)
    })
    .catch(err => {
      err
        .status(500)
        .json({ error: err.message });
    });
    return res

}

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
        if (name.toLowerCase().includes(text)) {
          bool = true;
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
    console.log('bool after query: ', bool);

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
          desc.push(obj.q);
        }
        return desc;
      })
      .then((res) => {
        for (const type of res) {
          if (type) {
            if (type.includes('TV') || type.includes('Movie') || type.includes('Feature') || type.includes('Video')) {
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
  // const urlduck = `https://api.duckduckgo.com/?q=${text}&format=json`
  const url = `https://www.googleapis.com/books/v1/volumes?q=${text}`
  let res = await axios
    .get(url)
    .then(response => {
      console.log("books api response", response.data.items[0].volumeInfo)
      // console.log("error response", response.data.error)
    })
    .catch(error => {
      console.log(error);
    });
    return res
}
module.exports = { wolfRam, booksApis, moviesApi, foodApi};
