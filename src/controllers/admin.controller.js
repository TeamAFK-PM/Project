const randomstring = require("randomstring");

const {hash} = require("../middleware/auth")
const { poolPromise, sql } = require('../config/db')
const {sendEmail} = require("../config/nodemailer")


module.exports.getManage = async (req, res) =>{

    
    try{
        
        const pool = await poolPromise;
        
        var listViewer = await pool.request()
            .query(`SELECT * FROM PhieuDangKy`);
        

        res.render("AdminPage", {
            ath: listViewer.recordset
        });
    }catch(err){
        res.status(404).send(err);
    }
}


module.exports.postAccept = async (req, res) =>{


    try{
        const email = req.params.id;

        const pool = await poolPromise;
        const pool1 = await poolPromise;
        const pool2 = await poolPromise;
        var athlete = await pool.request()
            .query(`SELECT * FROM PhieuDangKy WHERE email = '${email}'`);
        
        var newAthlete = athlete.recordset[0];

        let passNewAth = await randomstring.generate({
            length: 6
          });

        let passReset = passNewAth;
        let passAth = passNewAth;
        passNewAth = await hash(passNewAth);
          
        
              
        var newath = await pool1.request()
            .query(`INSERT INTO NguoiDung VALUES ('${email}', '${passNewAth}', N'${newAthlete.HoTen}', 2, '7-4-2000', N'${newAthlete.DiaChi}', '${newAthlete.Email}', '${newAthlete.SoDienThoai}', ${newAthlete.Gioitinh = newAthlete.Gioitinh  == true? 1: 0}, '${newAthlete.CMND}', 1, '${passReset}')` )
        
        var deleteAuth = await pool2.request()
            .query(`DELETE FROM PhieuDangKy WHERE Email = '${email}'`);
        
        
        sendEmail(req, email, {email: email, passNewAth: passAth} , 'SendAccount');
        
        res.redirect("/admin/manage");

    }catch(err){
        res.status(404)
        .send(err);
    }
}

module.exports.postConfuse = async (req, res) =>{

    try{
        const email = req.params.id;

        const pool = await poolPromise;
        var deleteAuth = await pool.request()
            .query(`DELETE FROM PhieuDangKy WHERE Email = '${email}'`);
        
        res.redirect("/admin/manage");
    }catch(err){
    
        res.status(404)
            .send(err);
    }

}

module.exports.getMatch = async (req, res, next) =>{

    res.render("tree");
}

module.exports.postMatch = async (req, res, next) =>{

    const {nameOfTour, dateTour, des} = req.body;

   try{
        const pool = await poolPromise;
        //var tour = await pool.request()
        //.query(`SELECT * FROM GiaiDau WHERE `)

        
   }catch(err){
    res.status(404)
    .send(err);
   }

}

module.exports.getAlternative = async (req, res) =>{
    var vongDau = parseInt(req.query.vongdau) || 1;
    var muaGiai = 2020;

    try{
        const pool = await poolPromise;
        const pool1 = await poolPromise;
        
        var results = await pool.request()
            .query(`select ND1.HoTen as HT1, ND2.HoTen as HT2, ND3.HoTen as HT3 from TranDau TD join NguoiDung ND1 on TD.CauThu1 = ND1.TenDangNhap
            join NguoiDung ND2 on TD.CauThu2 = ND2.TenDangNhap
            join NguoiDung ND3 on TD.KetQua = ND3.TenDangNhap
            where TD.MuaGiai = '${muaGiai}' and TD.VongDau = '${vongDau}'`);


        }catch(err){
        res.status(404);
        res.send(err.message);
    }

    res.render('alternative.ejs', {results: results});
}