const axios = require("axios");
require("dotenv").config();


const wolfRam = async function(text) {
  const url = `http://api.wolframalpha.com/v2/query?appid=${process.env.WOLFRAM_API}&input=${text}&output=json`
  let res = await axios
    .get(url)
    .then(response => {
      console.log("api response", response.data)
    })
    return res

}

module.exports = { wolfRam };
