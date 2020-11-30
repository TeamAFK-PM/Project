const createError = require("http-errors");


const bcrypt = require('bcrypt');

const { poolPromise } = require('../config/db')



module.exports.hash = async (password) =>{
  try {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  } catch (e) {
    console.log("Error hashing password with bcrypt", e);
  }
}


module.exports.auth = async (req, res, next) =>{

    if (!req.session.user || !req.cookies.user_id) {
        
        res.redirect('/');
        
        return;
      }
    next();
};
