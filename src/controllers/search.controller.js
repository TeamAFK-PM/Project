const { poolPromise, sql } = require('../config/db')

module.exports.getSearch =  async(req, res) =>{
    var nameq = req.query.name;
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    try{

        const pool = await poolPromise;
       
        var results = await pool.request()
            .query('select * from NguoiDung');
        var name = [];
        var brthday = [];
        for(var i = 0; i < results.rowsAffected; i++){
            name.push(results.recordset[i].HoTen);
            brthday.push(results.recordset[i].NgaySinh);
        }
        var matchedName = await pool.request()
            .query(`select * from NguoiDung where TenDangNhap = '${req.body.name}'`);
        console.log(matchedName.recordset);
    }catch(err){
        res.status(404);
        res.send(err.message);
    }
    //res.send(name.slice(start,end));
    res.render('Search.ejs', {name: name.slice(start,end), brthday: brthday.slice(0,8), results: results});
}