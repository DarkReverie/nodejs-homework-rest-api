const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const morgan = require('morgan');

const logPath = path.join(__dirname, 'server.log');

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });


app.use(cors())
app.use(express.json())
app.use(morgan('short', { stream: accessLogStream }));



app.use('/api/contacts', contactsRouter)


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(500).json({ message: err.message })
})

module.exports = app
