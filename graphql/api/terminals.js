const axios = require("axios")

const host = process.env.TERMINALS_API_URL

module.exports = {

  getTerminals() {
    const url = [ host, "terminals" ].join("/")
    console.log(`GET ${url}`)
    return axios.get(url).then(res => res.data)
  }
}