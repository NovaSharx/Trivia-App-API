// DEPENDENCIES
const express = require('express')
const cors = require('cors')
const { Sequelize } = require("sequelize-cockroachdb")

// CONFIGURATION
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const sequelize = new Sequelize(process.env.DATABASE_URL)

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Defining the Highscores model for the "highscores" table.
const Highscores = sequelize.define("highscores", {
  player_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  player_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  player_score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  question_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  difficulty: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Highscore',
  tableName: 'highscores',
  timestamps: false
})

/*
// Create the "highscores" table if it doesn't exist.
Highscores.sync({
  force: true,
})
*/

/**************** ROUTES ****************/

// ROOT
app.get('/', (req, res) => {
  res.send('Welcome to the Trivia App Database API')
})

// GET Highscores
app.get('/api/highscores', (req, res) => {
  Highscores.findAll()
    .then(results => {
      res.send(results)
    })
    .catch(err => {
      console.error("error executing query:", err);
    })
})

// POST Highscore
app.post('/api/posthighscore', (req, res) => {
  const playerName = req.body.player_name
  const playerScore = req.body.player_score
  const questionCount = req.body.question_count

  Highscores.create({
    player_name: playerName,
    player_score: playerScore,
    question_count: questionCount
  })
    .then(results => {
      console.log(results)
      res.send(`Inserted a highscore!`)
    })
    .catch(err => {
      console.error("error executing query:", err);
    })
})

// LISTENER
app.listen(PORT, () => {
  console.log(`Trivia App API is live! Listening on port: ${PORT}`)
})