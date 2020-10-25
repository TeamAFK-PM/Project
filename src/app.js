require('dotenv').config()

seKey = process.env.SESSION_SECRET
console.log(seKey)

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const user = require('./routes/user');
const match = require('./routes/match')

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser(seKey));

app.use(express.static('public'));

app.get('/', (req, res)=> {

    res.render('home.ejs');
});

app.use('/', user);
app.use('/', match);

app.listen(3000, () => {
    console.log(`Sever is listening at port ${3000}`);
})