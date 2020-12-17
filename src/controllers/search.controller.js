const { poolPromise } = require('../config/db')

module.exports.getSearch =  async(req, res) =>{
    try{
        
        console.log(req.body)
        const pool = await poolPromise;
       
        var results = await pool.request()
            .query('select * from NguoiDung');
        var name = [];
        var brthday = [];
        for(var i = 0; i < results.rowsAffected; i++){
            name.push(results.recordset[i].HoTen);
            brthday.push(results.recordset[i].NgaySinh);
        }
        console.log(brthday[0]);
        
         
    }catch(err){
        res.status(404);
        res.send(err.message);
    }
    res.render('Search.ejs', {name: name, brthday: brthday});
}