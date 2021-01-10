const port = process.env.PORT || 3000;
require('dotenv').config()

seKey = process.env.SESSION_SECRET



const { poolPromise, sql } = require('./config/db');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session');
const paginate = require('express-paginate');


const user = require('./routes/user');
const match = require('./routes/match');
const player = require('./routes/player');
const adminRoute = require('./routes/admin')
const viewer = require("./routes/viewer")

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(paginate.middleware(10, 50));
app.use(cookieParser());


app.use(
    session({
      name: "user_id",
      secret:  seKey, 
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 86400 * 1000, // a session cookie will last for 7 days
      },
      
    }),
  );

app.use(express.static('public'));

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.newath = null;
    res.locals.user = req.session.user;
 
    if ( req.session.user)
        req.session.user.HoTen = req.session.user.HoTen;

    if (req.cookies.user_id && !req.session.user) {
        res.clearCookie('user_id');        
    }
    next();
});

app.get('/', async(req, res)=> {
  try{

    const pool = await poolPromise;
    
    var player = await pool.request()
        .query(`select nd.HoTen 
        from XepHang xh join NguoiDung nd on xh.CauThu = nd.TenDangNhap 
        order by DiemTichLuy DESC`);
    }catch(err){
    res.status(404);
    res.send(err.message);
}
    res.render('index.ejs', {player: player});
});

app.use('/', user);
app.use('/', match);
app.use('/', player);
app.use('/admin', adminRoute);
app.use('/', viewer)

app.listen(3000, () => {
    console.log(`Sever is listening at port ${port}`);
})