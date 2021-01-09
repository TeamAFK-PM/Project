const randomstring = require("randomstring");

const {hash} = require("../middleware/auth")
const { poolPromise, sql } = require('../config/db')
const {sendEmail} = require("../config/nodemailer");
const {getRandomMatch} = require("./sort.controller")

module.exports.getManage = async (req, res) =>{

    
    try{
        var messErr = req.session.messages;
  
        delete req.session.messages;
        const pool = await poolPromise;
        
        var listViewer = await pool.request()
            .query(`SELECT * FROM PhieuDangKy`);
        

        res.render("AdminPage", {
            ath: listViewer.recordset,
            messErr
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

        var lastTour = await pool.request()
                .query(`SELECT *
                FROM dbo.GiaiDau nv WHERE DATEDIFF(DAY,nv.NgayKhoiTranh , GETDATE()) <= ALL (SELECT DATEDIFF(DAY,nv1.NgayKhoiTranh, GETDATE()) FROM dbo.GiaiDau nv1)`)
               
        var last2Tour = await pool.request()
               .query(`SELECT *
                FROM dbo.GiaiDau nv WHERE nv.NgayKhoiTranh != '${new Date((lastTour.recordset[0].NgayKhoiTranh)).toLocaleString("en-US").split(',')[0]}' AND DATEDIFF(DAY,nv.NgayKhoiTranh ,'${new Date((lastTour.recordset[0].NgayKhoiTranh)).toLocaleString("en-US").split(',')[0]}') <= ALL (SELECT DATEDIFF(DAY,nv1.NgayKhoiTranh, '${new Date((lastTour.recordset[0].NgayKhoiTranh)).toLocaleString("en-US").split(',')[0]}') FROM dbo.GiaiDau nv1 WHERE nv1.NgayKhoiTranh != '1-1-2021')`)
           
                var xh = await pool.request()
                .query(`SELECT * FROM XepHang WHERE MuaGiai =  ${last2Tour.recordset[0].MaMuaGiai} and ThamGia = 1`);
        if (xh.rowsAffected >=32 ){
            req.session.messages = "The tournament had enough athletes."
            return res.redirect("/admin/manage");
        }
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
            .query(`INSERT INTO NguoiDung VALUES ('${email}', '${passNewAth}', N'${newAthlete.HoTen}', 2, '${new Date((athlete.recordset[0].NgaySinh)).toLocaleString("en-US").split(',')[0]}', N'${newAthlete.DiaChi}', '${newAthlete.Email}', '${newAthlete.SoDienThoai}', ${newAthlete.Gioitinh = newAthlete.Gioitinh  == true? 1: 0}, '${newAthlete.CMND}', 1, '${passReset}')` )
        
        var deleteAuth = await pool2.request()
            .query(`DELETE FROM PhieuDangKy WHERE Email = '${email}'`);
    
            var xh = await pool.request()
            .query(`INSERT INTO XepHang VALUES ('${email}', ${last2Tour.recordset[0].MaMuaGiai}, -1, 1)`);
          
        sendEmail(req, email, {email: email, passNewAth: passAth} , 'SendAccount');
        
        res.redirect("/admin/manage");

    }catch(err){
        return res.status(404)
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

    const {tour} = (req.query);
    var messErr = req.session.messages;
  
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
            .query(`SELECT * FROM GiaiDau WHERE MaMuaGiai = ${tour}`);

           
            if (checktour.rowsAffected  != 0){
                
                var match = await pool.request()
                        .query(`SELECT * FROM TranDau WHERE MuaGiai = ${tour} ORDER BY VongDau`);

              
                
                var vong1 = [],vong2 = [], vong3 = [], vong4 = [], vong5 = [];

                if (match.rowsAffected != 0){
                
                    for (let i = 0; i < match.recordset.length; i++){
                        
                        var user1 = await pool.request()
                            .query(`SELECT * FROM NguoiDung WHERE TenDangNhap = '${match.recordset[i].CauThu1}' `);
                        
                        var user2 = await pool.request()
                            .query(`SELECT * FROM NguoiDung WHERE TenDangNhap = '${match.recordset[i].CauThu2}' `);

                        if (match.recordset[i].KetQua != null){
                            var user3 = await pool.request()
                            .query(`SELECT * FROM NguoiDung WHERE TenDangNhap = '${match.recordset[i].KetQua}' `);
                            match.recordset[i].KetQua = user3.recordset[0].HoTen 
                        
                        }else{

                        }
                        match.recordset[i].CauThu1 = user1.recordset[0].HoTen;
                        match.recordset[i].CauThu2 = user2.recordset[0].HoTen;
                      
                        

                        if (match.recordset[i].VongDau == 1){
                            vong1.push(match.recordset[i]);
                            if (vong1[vong1.length - 1].CauThu1 === vong1[vong1.length - 1].CauThu2)
                                vong1[vong1.length - 1].CauThu2 = '';
                        }
                        else if (match.recordset[i].VongDau == 2){
                            vong2.push(null);
                            
                            for (let j = 0; j < vong1.length; j++){
                                if (vong1[j].KetQua == match.recordset[i].KetQua)
                                    vong2[vong2.length - 1] = match.recordset[i];
                                   
                            }    
                            if(vong2[vong2.length - 1].CauThu1 != null){
                                if (vong2[vong2.length - 1].CauThu1 === vong2[vong2.length - 1].CauThu2)
                                     vong2[vong2.length - 1].CauThu2 = '';
                            }  
                        }
                        else if (match.recordset[i].VongDau == 3){
                            vong3.push(null);
                            
                            for (let j = 0; j < vong2.length; j++){
                                if (vong2[j].KetQua == match.recordset[i].KetQua)
                                    vong3[vong3.length - 1] = match.recordset[i];

                                
                            }   
                            if (vong3[vong3.length - 1] != null ){
                                if (vong3[vong3.length - 1].CauThu1 === vong3[vong3.length - 1].CauThu2)
                                 vong3[vong3.length - 1].CauThu2 = '';

                             }
                        }
                        else if (match.recordset[i].VongDau == 4){
                            vong4.push(null);
                            
                            for (let j = 0; j < vong3.length; j++){
                                if (vong3[j].KetQua == match.recordset[i].KetQua)
                                    vong4[vong4.length - 1] = match.recordset[i];
                                    
                            }
                            if (vong4[vong4.length - 1]!= null){
                                if (vong4[vong4.length - 1].CauThu1 === vong4[vong4.length - 1].CauThu2)
                                vong4[vong4.length - 1].CauThu2 = '';  
                            } 
                        }
                        else if (match.recordset[i].VongDau == 5){
                            vong5.push(match.recordset[i]);
                            
                            if (vong5[vong5.length - 1].CauThu1 === vong5[vong5.length - 1].CauThu2)
                            vong5[vong5.length - 1].CauThu2 = '';
                            
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

    const id = req.params.id;
    try{

        const pool = await poolPromise;
        var newtour = await pool.request()
            .query(`SELECT * FROM GiaiDau WHERE MaMuaGiai = ${id}`);
        
        if (newtour.rowsAffected != 0){

            var curTour = await pool.request()
            .query(`SELECT * FROM TranDau WHERE MuaGiai = ${id}`);
        
            if (curTour.rowsAffected != 0){

                req.session.messages = "The tournament was arrange, so it was not scheduled any more."
           
                return res.redirect("/admin/tournament?tour=" + id);
            }

            var lastTour = await pool.request()
                .query(`SELECT *
                FROM dbo.GiaiDau nv WHERE DATEDIFF(DAY,nv.NgayKhoiTranh , GETDATE()) <= ALL (SELECT DATEDIFF(DAY,nv1.NgayKhoiTranh, GETDATE()) FROM dbo.GiaiDau nv1)`)
                var lastTour = await pool.request()
                .query(`SELECT *
                FROM dbo.GiaiDau nv WHERE nv.NgayKhoiTranh != '${new Date((lastTour.recordset[0].NgayKhoiTranh)).toLocaleString("en-US").split(',')[0]}' AND DATEDIFF(DAY,nv.NgayKhoiTranh ,'${new Date((lastTour.recordset[0].NgayKhoiTranh)).toLocaleString("en-US").split(',')[0]}') <= ALL (SELECT DATEDIFF(DAY,nv1.NgayKhoiTranh, '${new Date((lastTour.recordset[0].NgayKhoiTranh)).toLocaleString("en-US").split(',')[0]}') FROM dbo.GiaiDau nv1 WHERE nv1.NgayKhoiTranh != '1-1-2021')`)
           
            
         
            if (lastTour.rowsAffected != 0){
                var user = await pool.request()
                    .query(`SELECT * FROM XepHang WHERE MuaGiai = ${lastTour.recordset[0].MaMuaGiai} and ThamGia = 1 ORDER BY DiemTichLuy DESC`)
                
                let sl = user.rowsAffected[0];
               
                let place = getRandomMatch(sl);

               
                let i = 0;
                let dem = 0;
               while (i < place.length){
                    if (place[i + 1] == -1 && place[i] == -1){
                        i = i + 2;
                        continue
                    }
                    var player1, player2;
                    if (place[i] == -1){
                      
                        player1 = user.recordset[dem];    
                    }
                    else{
                        player1 = user.recordset[dem];
                        dem = dem + 1;
                    }
                    if (place[i + 1] == -1){
                        player2 = user.recordset[dem];    
                    }
                    else{
                        player2 = user.recordset[dem];
                        dem = dem + 1
                    }
                    i = i + 2;
                    console.log(player1, player2)
                  
                    var capdau = await pool.request()
                        .query(`INSERT INTO TranDau VALUES (${newtour.recordset[0].MaMuaGiai}, 1,  '${player1.CauThu}','${player2.CauThu}', null)`);
                       
                }
                
            }
            req.session.messages = "Arrange these matches successfully";
            res.redirect("/admin/tournament?tour=" + id);
        }else{
            req.session.messages = "This tournament does not exists";
            res.redirect("/admin/tournament?tour=create");
        }
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

            var IdTour = parseInt(date[2]);
            
            const pool = await poolPromise;

            var checktour = await pool.request()
            .query(`SELECT * FROM GiaiDau WHERE MaMuaGiai = ${IdTour}`);

            if (checktour.rowsAffected == 0){

                var newtour = await pool.request()
                .query(`INSERT INTO GiaiDau VALUES ('${IdTour}', N'${address}', N'${nameOfTour}', '${dateTour}', N'${des}')`);
                req.session.messages = "This tournament creates successfully";
                res.redirect("/admin/tournament?tour=" + IdTour)
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
                .query(`UPDATE GiaiDau SET NgayKhoiTranh = '${dateTour}', DiaDiem = N'${address}', Mota = N'${des}', TenGiai = N'${nameOfTour}' WHERE MaMuaGiai = ${tour}`)

            
                
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
            .query(`select ND1.HoTen as HT1, ND2.HoTen as HT2, ND3.HoTen as HT3, TD.VongDau from TranDau TD join NguoiDung ND1 on TD.CauThu1 = ND1.TenDangNhap
            join NguoiDung ND2 on TD.CauThu2 = ND2.TenDangNhap
            join NguoiDung ND3 on TD.KetQua = ND3.TenDangNhap
            where TD.MuaGiai = ${muaGiai} and TD.VongDau = '${vongDau}'`);


        }catch(err){
        res.status(404);
        res.send(err.message);
    }

    res.render('alternative.ejs', {results: results});
}

module.exports.getEditTournament = async (req, res) =>{
    var vongDau = parseInt(req.query.vongdau);
    var muaGiai = 2020;
    var id = req.query.id;

    try{
        const pool = await poolPromise;
        const pool1 = await poolPromise;
        
        var results = await pool.request()
            .query(`select ND1.TenDangNhap as ND1, ND2.TenDangNhap as ND2, ND1.HoTen as HT1, ND2.HoTen as HT2, ND3.HoTen as HT3, TD.VongDau, ` + id + ` as id
            from TranDau TD join NguoiDung ND1 on TD.CauThu1 = ND1.TenDangNhap
            join NguoiDung ND2 on TD.CauThu2 = ND2.TenDangNhap
            join NguoiDung ND3 on TD.KetQua = ND3.TenDangNhap
            where TD.MuaGiai = ${muaGiai} and TD.VongDau = '${vongDau}'
            order by TD.VongDau
            offset ` + id + ` rows
            fetch next 1 rows only`);
        var result = results.recordset[0];
        console.log(req.session.TD);
        }catch(err){
        res.status(404);
        res.send(err.message);
    }
    res.render('Edittournament.ejs', {result: result});
}

module.exports.postEditTournament = async (req, res) =>{
    /*
    var vongDau = parseInt(req.session.TD.VongDau);
    var muaGiai = 2020;
    var player1 = req.session.TD.ND1;
    var player2 = req.session.TD.ND2;
    var win;
    if(req.body.score1 == 1){
        win = player1;
        req.session.TD.HT3 = req.session.TD.HT1
    }else{
        win = player2;
        req.session.TD.HT3 = req.session.TD.HT2
    }

    try{
        const pool = await poolPromise;
        const pool1 = await poolPromise;
        
        //var results = await pool.request()
            //.query(`update TranDau set KetQua = '${win}' where VongDau = '${vongDau}'
            //and MuaGiai = '${muaGiai}' and CauThu1 = '${player1}' and CauThu2 = '${player2}'`);
        
        var result = req.session.TD;
        }catch(err){
        res.status(404);
        res.send(err.message);
    }
    //res.render('Edittournament.ejs', {result: result});
    */
}
module.exports.postReset =  async (req, res) =>{

    const user1 = req.session.user;
    const email = user1.Email;

    const {password, password2} = req.body;

        const pool = await poolPromise;
        var user = await pool.request()
        .query(`SELECT * FROM NguoiDung WHERE Email = '${email}'`)

        
        
        if (user.rowsAffected != 0){
            bcrypt.hash(password, bcrypt.genSaltSync(10),  async(err, hashPass) =>{ //Mã hóa mật khẩu trước khi lưu vào db
               
                
                
            
                var newath = await pool.request()
                .query(`UPDATE NguoiDung SET MatKhau = '${hashPass}' WHERE TenDangNhap = '${email}'` )
                
                
                        
                res.redirect('/admin/manage');
            })
        }
}