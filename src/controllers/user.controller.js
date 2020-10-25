const { poolPromise } = require('../db')

module.exports.login = async (req, res) => {
    try{
    
        let pass = req.body.password;
        let name = req.body.username;
    
        console.log(name);
        console.log(pass); 
        const pool = await poolPromise;
        var result = await pool.request()
            .query(`select * from USERS where USERNAME = '${name}' and pass = '${pass}'`) 

        if (result.rowsAffected != 0){
           

            res.cookie("userId", result.recordset[0].ID, {
                signed: true
            })

            res.render('18120561.ejs',{student: result.recordset[0].USERNAME, mssv: "111", email: result.recordset[0].email})
        }
        else
            res.render('home.ejs')
            
    }catch(err){
        res.status(404);
        res.send(err.message);
    }

};

module.exports.index = (req, res) => {
    
    res.send("haha");
};