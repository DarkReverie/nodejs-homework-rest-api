const app = require('./app')
const mongoose = require('mongoose');

const {DB_HOST, PORT = 3000} = process.env;
mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
  .then(() => 
  { app.listen(PORT, () => {
    console.log("Server running. Backend is successfuly deployed!");
    })
  })
  .catch(error => {
    console.log(error.message);
    console.log("Server not running. Backend is not deployed!");
    process.exit(1);
  })



 