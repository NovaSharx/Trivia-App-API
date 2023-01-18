// DEPENDENCIES
const express = require('express')
const { Sequelize } = require("sequelize-cockroachdb");

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const sequelize = new Sequelize(process.env.DATABASE_URL);
const app = express()

// MIDDLEWARE
app.use(express.json())

try {
  sequelize.authenticate()
  console.log(`Connection with Sequelize at ${process.env.DATABASE_URL}`)
} catch (err) {
  console.log(`Unable to connect to PG: ${err}`)
}

//ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to the Trivia App Database API')
})

// LISTENER
app.listen(PORT, () => {
  console.log(`Trivia App API is live! Listening on port: ${PORT}`)
})