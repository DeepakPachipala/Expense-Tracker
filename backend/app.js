const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 5001

//middlewares
app.use(express.json())
app.use(cors())

const path = require('path');

readdirSync(path.join(__dirname, 'routes')).map((route) => {
  app.use('/api/v1', require(path.join(__dirname, 'routes', route)));
});

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
