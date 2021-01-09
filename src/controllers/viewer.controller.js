const { poolPromise } = require('../config/db')


module.exports.resgis = (req, res) =>{



}

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }
module.exports.getviewTour = async (req, res, next) =>{

    const {tour} = (req.query);
    var messErr = req.session.messages;
  
    delete req.session.messages;

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