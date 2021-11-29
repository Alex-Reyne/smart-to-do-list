const axios = require("axios");

const wolfRam = async function(text) {
  const url = `http://api.wolframalpha.com/v2/query?appid=R74566-Q8PXXJHTYT&input=${text}&output=json`
  let res = await axios
    .get(url)
    .then(response => {
      console.log(response.data)
    })
    return res

}

module.exports = { wolfRam };
