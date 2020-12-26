const { poolPromise, sql } = require('../config/db')

module.exports.getPlayers =  async(req, res) =>{
    var nameq = req.query.name;
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    try{

        const pool = await poolPromise;
        const pool1 = await poolPromise;
        
        var results = await pool.request()
            .query(`select * from NguoiDung`);

        var search_name = await pool.request()
            .query(`select * from NguoiDung where HoTen LIKE N'%${nameq}%'`);
        }catch(err){
        res.status(404);
        res.send(err.message);
    }
    res.render('Players.ejs', {results: results, start: start, end: end, search_name: search_name});
}