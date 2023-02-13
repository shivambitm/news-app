const express = require('express')
const path = require('path')
const axios = require('axios')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname) } )
})

app.get('/api', async(req, res) => {
  console.log(req._parsedUrl.query)
  let url = "https://newsapi.org/v2/everything?"+req._parsedUrl.query //requests yahan se jayega, I'm sending requests
  // from the server not from the client
  let r = await axios(url)
  let a = r.data 
  res.json(a)
})

app.listen(port, () => {
  console.log(`News-API App is listening on port ${port}`)
})