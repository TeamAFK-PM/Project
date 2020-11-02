const bcrypt = require('bcrypt');
const { poolPromise } = require('../db')

module.exports.login = async (req, res) => {
    try{
        

        
        const pool = await poolPromise;
        var results = await pool.request()
            .query(`select * from USERS where USERNAME = '${req.body.username}'`);

        console.log(results.recordset[0].PASS);
        if (results.rowsAffected != 0){

            bcrypt.compare(req.body.password, results.recordset[0].PASS, function (err, result) {

                if(err){
                    return res.status(404).json({
                        msg: 'Auth failed!'
                    })
                }
                if (result == true) {
                    //set session
                    req.session.user = results.recordset[0];
                    
                    res.render('18120561.ejs',{student: results.recordset[0].USERNAME, mssv: "111", email: results.recordset[0].email})
                } else {
                    res.render('home.ejs')
                }
              });
        }
        else{
            res.render('home.ejs');
        }

         
    }catch(err){
        res.status(404);
        res.send(err.message);
    }

};

module.exports.logout = async (req, res) =>{
    console.log(12123);
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        
        res.redirect('/');
    });

}

module.exports.index = (req, res) => {
    
    res.send("haha");
};