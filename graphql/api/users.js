const axios = require("axios")

const host = process.env.USERS_API_URL

module.exports = {

  getUsers() {
    const url = [ host, "users" ].join("/")
    console.log(`GET ${url}`)
    return axios.get(url).then(res => {
      console.log(res.data)
      return res.data
    }).catch(err => {
      console.error(err)
    })
  }
}