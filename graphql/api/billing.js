const axios = require("axios")

const host = process.env.BILLING_API_URL

module.exports = {

  getInvoices() {
    const url = [ host, "invoices" ].join("/")
    console.log(`GET ${url}`)
    return axios.get(url).then(res => res.data)
  }
}