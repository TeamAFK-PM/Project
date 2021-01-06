const bcrypt = require('bcrypt');
const { poolPromise } = require('../config/db')
const jwt =  require('jsonwebtoken')
const randomstring = require("randomstring");
const {sendEmail} = require("../config/nodemailer")

const tokenLife = process.env.TOKEN_LIFE
const jwtKey = process.env.JWT_KEY


module.exports.getLogin = async (req, res) => {

    error = req.session.err;
    delete req.session.err;
    
    res.render("login.ejs", {err: error});
   
}

module.exports.login = async (req, res) => {
    try{
        
        //console.log(req.body)
        const pool = await poolPromise;
       
        var results = await pool.request()
            .query(`select * from NguoiDung where TenDangNhap = '${req.body.username}'`);

        //console.log(results.rowsAffected)
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
                    //console.log(req.session.user);
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

    const body = req.body;
    console.log(birthday);
    try{
        const pool = await poolPromise;
       
        var results = await pool.request()
            .query(`select * from NguoiDung where HoTen = '${name}' and NgaySinh = '${birthday}' and GioiTinh = '${sex}' and SoDienThoai = '${phone}' and DiaChi = '${address}' and Email = '${email}' or email = '${email}'`);
        
        if (results.rowsAffected != 0){
            
            
            res.render('register', {newath: body, message: "Email is already exists"});
        }
        else{
            
            const pool = await poolPromise;
            
            let checksex = 0;
            if (sex == 'male')
                checksex = 1;
            var result = await pool.request()
                .query(`INSERT INTO PhieuDangKy VALUES ('${name}', '${birthday}', '${address}', '${email}', '${phone}', '${checksex}', '${cmnd}')`);
        
            
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
    const pool = await poolPromise;
       
    var results = await pool.request()
        .query(`select * from NguoiDung where TenDangNhap = '${req.session.user.TenDangNhap}'`);
    
    req.session.user = results.recordset[0];

    var info = req.session.user;
    //var d = new Date(info.NgaySinh);
    //info.NgaySinh = d.toDateString();
    //info.NgaySinh = await info.NgaySinh.split('T')[0];
    res.render('inforAthlete.ejs', {info: info});
};

module.exports.updateProfile = async(req, res) =>{
    var user = req.session.user.TenDangNhap;
    var name = req.body.name;
    var dob = req.body.dob;
    var address = req.body.address;
    var email = req.body.email;
    var phone = req.body.phone;

    try{
        const pool = await poolPromise;
        
        var result = await pool.request()
            .query(`update NguoiDung set HoTen = N'${name}', NgaySinh = '${dob}', DiaChi = N'${address}', Email = '${email}', SoDienThoai = '${phone}' where TenDangNhap = '${user}'`);
    }catch(err){
        res.status(404);
        res.send(err.message);
    }

    this.getProfile(req, res);
};

module.exports.getforgot = async (req, res, next) =>{


    res.render("forgot")
}

module.exports.getCheckForgot = async (req, res, next) =>{


    const { token} = req.params;
    const message2 = req.session.message2 || null;

    delete req.session.message2;
    res.render('checkforgot', {
        token: token, 
        message2: message2
    });
}

module.exports.getReset = async (req, res, next) =>{


    const { token} = req.params;
    res.render("resetPassword", {
        token
    })
}

module.exports.postForgot = async (req, res) =>{

    try{

        const pool = await poolPromise;
        
        var user = await pool.request()
        .query(`SELECT * FROM NguoiDung WHERE TenDangNhap = '${req.body.email}'`)
        
        if (user.rowsAffected != 0){

            const token = jwt.sign( {email: user.recordset[0].Email}, jwtKey, {
                    expiresIn: 86400,
            });
           
            sendEmail(req, user.recordset[0].Email, user.recordset[0].passwordReset, 'recovery');
       
    
            res.redirect('checkforgot/' + token);
        }
    }catch (error) {
        res.status(404).json({
           error
        })
    }
}

module.exports.forgot = async (req, res) => {

    const { token} = req.params;
    const code = req.body.code;
  
    if(!token){
        return res.status(404).json({
            msg: 'Invalid!'
        })
    }


    try {
        
        const decoded = jwt.verify(token, jwtKey)
        const {email} = decoded;
        
        const pool = await poolPromise;
        var user = await pool.request()
        .query(`SELECT * FROM NguoiDung WHERE Email = '${email}'`)
       
            
        if (code == user.recordset[0].passwordReset){

                   
                    
            //sinh ma xac nhan
            let confirmPass = randomstring.generate({
                length: 6
              });
           

            var newath = await pool.request()
            .query(`UPDATE NguoiDung SET passwordReset = '${confirmPass}' WHERE TenDangNhap = '${email}'` )
        
            res.redirect("/resetPassword/" + token);
        }
        else{
            req.session.message2 = 'This code does not match';
            res.redirect("/checkforgot/" + token);

        }
        


    }catch (error) {
        res.status(404).json({
           error
        })
    }

}

module.exports.postResetPassword = async (req, res) =>{

    const { token} = req.params;

    if(!token){
        return res.status(404).json({
            msg: 'Invalid!'
        })
    }

    try{
        
        const decoded = jwt.verify(token, jwtKey)
        const {email} = decoded;
        const {password, password2} = req.body;

        const pool = await poolPromise;
        var user = await pool.request()
        .query(`SELECT * FROM NguoiDung WHERE Email = '${email}'`)

        
        
        if (user.rowsAffected != 0){
            bcrypt.hash(req.body.password, bcrypt.genSaltSync(10),  async(err, hashPass) =>{ //Mã hóa mật khẩu trước khi lưu vào db
               
                
                
            
                var newath = await pool.request()
                .query(`UPDATE NguoiDung SET MatKhau = '${hashPass}' WHERE TenDangNhap = '${email}'` )
                
                
                        
                res.redirect('/login');
            })
        }
    }catch(err){
        res.status(404).json({
            err
        })
    }
}


