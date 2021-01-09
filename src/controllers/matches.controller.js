const { poolPromise, sql } = require('../config/db')

module.exports.getMatches = async(req, res) => {
    var VongDau = parseInt(req.query.vongdau) || 1;
    var MuaGiai = req.query.MuaGiai;
    var TenCauThu = req.query.name || '';
    try{

        const pool = await poolPromise;
        // nd1.HoTen as HoTen1, nd2.HoTen as HoTen2
        var results = await pool.request()
            .query(`select nd1.HoTen as HoTen1, nd2.HoTen as HoTen2, td.KetQua as KQ, td.CauThu1 as CT1, td.CauThu2 as CT2
            from TranDau td join NguoiDung nd1 on td.CauThu1 = nd1.TenDangNhap join NguoiDung nd2 on nd2.TenDangNhap = td.CauThu2
            where td.VongDau = ${VongDau} and td.MuaGiai = ${MuaGiai}
            and (nd1.HoTen LIKE N'%${TenCauThu}%' OR nd2.HoTen LIKE N'%${TenCauThu}%')`);
        var results_name = await pool.request()
        .query(`select nd1.HoTen as HoTen1, nd2.HoTen as HoTen2
        from TranDau td join NguoiDung nd1 on td.CauThu1 = nd1.TenDangNhap join NguoiDung nd2 on nd2.TenDangNhap = td.CauThu2
        where td.MuaGiai = ${MuaGiai} AND(nd1.HoTen LIKE N'%${TenCauThu}%' OR nd2.HoTen LIKE N'%${TenCauThu}%')`); 
        }catch(err){
        res.status(404);
        res.send(err.message);
    }
    res.render('Matches.ejs',{results: results, results_name: results_name, name: TenCauThu, MuaGiai:MuaGiai});
}