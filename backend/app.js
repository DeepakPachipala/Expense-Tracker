const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const path = './routes';

require('dotenv').config()

const PORT = process.env.PORT || 5001
const frontendUrl = process.env.FRONTEND_URL

//middlewares
app.use(express.json())
app.use(cors({ origin: frontendUrl }))

//routes
if (fs.existsSync(path)) {
  console.log("Routes directory exists!");
  readdirSync(path).map((route) =>
    app.use("/api/v1", require(`./routes/${route}`))
  );
} else {
  console.error(`${path} does not exist.`);
}
const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
