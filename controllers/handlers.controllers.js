let {userModel, cryptoModel} = require('../models/schemas.models');

const getUsers = (req, res) => {
  userModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
}

const addUser = (req, res) => {
  let userData = req.body;
  console.log(userData);
  let user = new userModel({...userData});
  user.save().then(val => {
    userModel.find({}, (err, result) => {
      if (err) {
        res.send(err);
      }
      else {
        res.send(result);
      }
    })
  })
}

module.exports = {getUsers, addUser};