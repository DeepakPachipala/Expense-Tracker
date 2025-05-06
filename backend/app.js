const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const transactionsRouter = require('./routes/transactions'); 
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 5001

//middlewares
app.use(express.json())
app.use(cors());

const path = require('path');

app.use('/api/v1', transactionsRouter);

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
