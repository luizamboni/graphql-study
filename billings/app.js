const app = require("express")()
const YAML = require("yamljs")


const PORT = process.env.PORT || 3000

 
const { invoices } = YAML.load("data.yml");

app.get("/invoices/:id", (req, res) => {
  const { id } = req.params

  const invoice = invoices.find(invoice => invoice.id === parseInt(id))
  if (invoice)
    res.json(invoice)
  else
    res.status(404).json({ message: "invoice not found" })
})

app.get("/invoices", (req, res) => {
  res.json(invoices)
})

app.listen(PORT)