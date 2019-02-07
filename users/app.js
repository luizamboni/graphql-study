const app = require("express")()
const YAML = require("yamljs")


const PORT = process.env.PORT || 3000

 
const { users } = YAML.load("data.yml");

app.get("/users/:id", (req, res) => {
  const { id } = req.params

  const user = users.find(user => user.id === parseInt(id))
  if (user)
    res.json(user)
  else
    res.status(404).json({ message: "user not found" })
})

app.get("/users", (req, res) => {
  res.json(users)
})

app.listen(PORT)