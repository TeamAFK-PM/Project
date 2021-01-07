const randomstring = require("randomstring");

const {hash} = require("../middleware/auth")
const { poolPromise, sql } = require('../config/db')
const {sendEmail} = require("../config/nodemailer");
const {getRandomMatch} = require("./sort.controller")

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

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }

module.exports.getTournament = async (req, res, next) =>{

    const {tour} = req.query;
    var messErr = req.session.messages;
    console.log(messErr);
    delete req.session.messages;

    try{
        if (tour === 'create'){

            res.render("tree", {
                method : "create",
                messErr: messErr,
            })
        }
        else{
            const pool = await poolPromise;

            var checktour = await pool.request()
            .query(`SELECT * FROM GiaiDau WHERE MaMuaGiai = '${tour}'`);

            

            if (checktour.rowsAffected  != 0){
               
                var match = await pool.request()
                        .query(`SELECT * FROM TranDau WHERE MuaGiai = '${tour}' ORDER BY VongDau`);


                var vong1 = [],vong2 = [], vong3 = [], vong4 = [], vong5 = [];

                if (match.rowsAffected != 0){
                    
                    for (let i = 0; i < match.recordset.length; i++){
                        
                        var user1 = await pool.request()
                            .query(`SELECT * FROM NguoiDung WHERE TenDangNhap = '${match.recordset[i].CauThu1}' `);
                        
                        var user2 = await pool.request()
                            .query(`SELECT * FROM NguoiDung WHERE TenDangNhap = '${match.recordset[i].CauThu2}' `);
                            var user3 = await pool.request()
                            .query(`SELECT * FROM NguoiDung WHERE TenDangNhap = '${match.recordset[i].KetQua}' `);
                        
                     
                        match.recordset[i].CauThu1 = user1.recordset[0].HoTen;
                        match.recordset[i].CauThu2 = user2.recordset[0].HoTen;
                        match.recordset[i].KetQua = user3.recordset[0].HoTen;
                

                        if (match.recordset[i].VongDau == 1){
                            vong1.push(match.recordset[i]);
                        }
                        else if (match.recordset[i].VongDau == 2){
                            vong2.push(null);
                            
                            for (let j = 0; j < vong1.length; j++){
                                if (vong1[j].KetQua == match.recordset[i].KetQua)
                                    vong2[vong2.length - 1] = match.recordset[i];
                            }   
                        }
                        else if (match.recordset[i].VongDau == 3){
                            vong3.push(null);
                            
                            for (let j = 0; j < vong2.length; j++){
                                if (vong2[j].KetQua == match.recordset[i].KetQua)
                                    vong3[vong3.length - 1] = match.recordset[i];
                            }   
                        }
                        else if (match.recordset[i].VongDau == 4){
                            vong4.push(null);
                            
                            for (let j = 0; j < vong3.length; j++){
                                if (vong3[j].KetQua == match.recordset[i].KetQua)
                                    vong4[vong4.length - 1] = match.recordset[i];
                            }   
                        }
                        else if (match.recordset[i].VongDau == 5){
                            vong5.push(match.recordset[i]);
                        }
                    }

                    
                }
              
                res.render("tree", {
                    method : tour,
                    messErr: messErr,
                    nameOfTour : checktour.recordset[0].TenGiai,
                    dateTour : getFormattedDate(checktour.recordset[0].NgayKhoiTranh),
                    address : checktour.recordset[0].DiaDiem,
                    des : checktour.recordset[0].Mota,
                    vong1 :vong1,
                    vong2 :vong2,
                    vong3 :vong3,
                    vong4 :vong4,
                    vong5 :vong5,
                })
            }
            
        }
       
    }catch(err){

        res.status(404)
        .send(err);
    }
}

module.exports.arrangeTour = async (req, res, next) =>{

    try{

        let place = getRandomMatch()

    }
    catch(err){

        res.status(404)
        .send(err);
    }
}

module.exports.postTour = async (req, res, next) =>{

    const {tour} = req.query;
    const {dateTour, address, des, nameOfTour} = req.body;

    try{
        if (tour === 'create'){
            
            var a  = dateTour.toString();
            var date = a.split("/");

            var IdTour = date[0] + '/' + date[2];
            
            const pool = await poolPromise;

            var checktour = await pool.request()
            .query(`SELECT * FROM GiaiDau WHERE MaMuaGiai = '${IdTour}'`);

            if (checktour.rowsAffected == 0){

                var newtour = await pool.request()
                .query(`INSERT INTO GiaiDau VALUES ('${IdTour}', '${address}', '${nameOfTour}', '${dateTour}', '${des}')`);
                req.session.messages = "This tournament already exists.";
                res.redirect("/admin/tournament?tour=create")
            }
            else{
                req.session.messages = "This tournament already exists.";
                res.redirect("/admin/tournament?tour=create")
                

            }
            
        }
        else{
            const pool = await poolPromise;

            var checktour = await pool.request()
            .query(`SELECT * FROM GiaiDau WHERE NgayKhoiTranh = '${dateTour}'`);

            if (checktour.rowsAffected >= 2){

                req.session.messages = "This date of a tournament already exists.",
                res.redirect("/admin/tournament?tour=" + tourTmp);
                
            }else{

                var updateTour = pool.request()
                .query(`UPDATE GiaiDau SET NgayKhoiTranh = '${dateTour}', DiaDiem = N'${address}', Mota = N'${des}', TenGiai = N'${nameOfTour}' WHERE MaMuaGiai = '${tour}'`)

            
                
                req.session.messages = "SUCCESS. This tournament has been changed"
                res.redirect("/admin/tournament?tour=" + tour);
                /*return res.render("tree", {
                    method :  tour,
                    messages: "SUCCESS. This tournament has been changed",
                    nameOfTour : updateTour.recordset[0].TenGiai,
                    dateTour : getFormattedDate(updateTour.recordset[0].NgayKhoiTranh),
                    address : updateTour.recordset[0].DiaDiem,
                    des : updateTour.recordset[0].Mota,
                })*/
            }

        }
       
    }catch(err){

        return res.status(404)
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