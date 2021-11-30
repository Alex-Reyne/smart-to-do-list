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
  let res = await axios
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
      console.log("food api response", response.data)
      // console.log("error response", response.data.error)
    })
    .catch(error => {
      console.log(error);
    });
    return res
};

const moviesApi = async function(text) {
  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/auto-complete',
    params: {q: text},
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': 'f8ffd05181msh8a94f9b2e8ae776p1c69e3jsn1fe611400441'
    }
  };

  axios.request(options)
      .then(function (response) {
    	console.log(response.data);
    })
    .catch(function (error) {
    	console.error(error);
    });
};

const booksApis = async function(text) {
  // const urlduck = `https://api.duckduckgo.com/?q=${text}&format=json`
  const url = `https://www.googleapis.com/books/v1/volumes?q=${text}`
  let res = await axios
    .get(url)
    .then(response => {
      console.log("books api response", response.data)
      // console.log("error response", response.data.error)
    })
    .catch(error => {
      console.log(error);
    });
    return res
}
module.exports = { wolfRam, booksApis, moviesApi, foodApi};
