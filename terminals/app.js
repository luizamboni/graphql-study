const app = require("express")()
const YAML = require("yamljs")


const PORT = process.env.PORT || 3000

 
const { terminals } = YAML.load("data.yml");

app.get("/terminals/:id", (req, res) => {
  const { id } = req.params

  const terminal = terminals.find(terminal => terminal.id === parseInt(terminal))
  if (terminal)
    res.json(terminal)
  else
    res.status(404).json({ message: "terminal not found" })
})

app.get("/terminals", (req, res) => {
  res.json(terminals)
})


app.listen(PORT)