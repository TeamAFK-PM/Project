const bcrypt = require('bcrypt');
const { poolPromise } = require('../config/db')


module.exports.getLogin = async (req, res) => {

    error = req.session.err;
    delete req.session.err;
    
    res.render("index.ejs", {err: error});
   
}

module.exports.login = async (req, res) => {
    try{
        
        console.log(req.body)
        const pool = await poolPromise;
       
        var results = await pool.request()
            .query(`select * from NguoiDung where TenDangNhap = '${req.body.username}'`);

        console.log(results.rowsAffected)
        if (results.rowsAffected != 0){

            bcrypt.compare(req.body.password, results.recordset[0].MatKhau, function (err, result) {

                if(err){
                    return res.status(404).json({
                        msg: 'Auth failed!'
                    })
                }
                if (result == true) {
                    //set session
                    req.session.user = results.recordset[0];
                    console.log(req.session.user);
                    res.redirect('/');
                
                } else {
                    
                    req.session.err ="Mật khẩu của bạn nhập chưa đúng, vui lòng nhập lại mật khẩu giúp mình nhé";
                    res.redirect('/login');
                }
              });
        }
        else{
            req.session.err ="Đăng nhập KHÔNG thành công. Bạn vui lòng thử lại hoặc kiểm tra xem mình có được chấp nhận là cầu thủ chưa nhé.";
            res.redirect('/login');
        }

         
    }catch(err){
        res.status(404);
        res.send(err.message);
    }

};


module.exports.getRegister = async(req, res) =>{


    res.render('Register.ejs');
}

module.exports.postRegister = async(req, res) => {

    const {name, sex, phone, email, birthday, cmnd, tour, address} = req.body;
    console.log(birthday);
    try{
        const pool = await poolPromise;
       
        var results = await pool.request()
            .query(`select * from NguoiDung where HoTen = '${name}' and NgaySinh = '${birthday}' and GioiTinh = '${sex}' and SoDienThoai = '${phone}' and DiaChi = '${address}' and Email = '${email}' or email = '${email}'`);
        
        if (results.rowsAffected != 0){
            
            
            res.redirect('/register');
        }
        else{
            
            const pool = await poolPromise;
            
            let checksex = 0;
            if (sex == 'male')
                checksex = 1;
            var result = await pool.request()
                .query(`INSERT INTO NguoiDung VALUES ('${email}', '${1}', '${name}', '${2}', '${birthday}', '${address}', '${email}', '${phone}', '${checksex}', '${cmnd}', '${0}')`);
        
            
            res.redirect('/');
        }



    }catch(err){
        res.status(404);
        res.send(err.message)
    }
}


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

module.exports.getProfile = async(req, res) =>{
    var info = req.session.user;
    res.render('inforAthlete.ejs', {info: info});

};