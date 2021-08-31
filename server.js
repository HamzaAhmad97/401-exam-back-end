const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
const app= express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
mongoose.connect('mongodb://localhost:27017/crypto', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', () => console.log('connection to crypto db is established'));

const {getUsers, addUser} = require('./controllers/handlers.controllers');
const { userModel } = require('./models/schemas.models');
//default route
app.get('/', (req, res) => {
  res.send('up and running ...')
})

//adding the user
app.put('/user/:email', (req, res) => {
  let {email} = req.params;
  let data = req.body.watching;
  console.log(req.params);
  userModel.updateOne({email}, {$addToSet : {watching: [...data]}}, (err, result) => {
    if (err) {
      res.send(err);
    } 
    else {
      res.send(result)
    }
  })
})
app.post('/user', addUser)

app.get('/user', getUsers);
//sending the crypto data
app.get('/crypto', (req, res) => {
  
  axios.get('https://crypto-explorer.herokuapp.com/crypto-list')
  .then(val => {
    res.send(val.data);
  })
  .catch(err => res.status(404).send(err));
})


app.put('/crypto/:id', (req, res) => {

})

app.delete('/crypto/:id', (req, res) => {

})

app.listen(3001, () => console.log(`server is listening on port ${PORT}`));
//(v.salvatore7.gs@gmail.com