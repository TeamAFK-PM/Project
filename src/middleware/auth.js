const { poolPromise } = require('../db')

module.exports.auth = async (req, res, next) =>{

    if (!req.signedCookies.userId){
        res.redirect('/');
        return;
    }
    console.log(req.signedCookies.userId)
    const pool = await poolPromise;
    var result = await pool.request()
         .query(`select * from USERS where ID = '${req.signedCookies.userId}'`) 

    if (!result.rowsAffected){
        res.redirect('/');
        return;
    }
    next();
}
