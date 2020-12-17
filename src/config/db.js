var sql = require("mssql");


const config = {
    user: 'thanh',
    password: '.',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'QuanLyCauThu',
    "options": {
      "encrypt": true,
      "enableArithAbort": true
      }
}


const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))
  // sql.connect(config, function(err){
  //   if(err) console.log(err);
  //   let sqlRequest = new sql.Request();
  //   let sqlQuery = 'select TenDangNhap from NGUOIDUNG';
  
  //   sqlRequest.query(sqlQuery, function(err, data){
  //     if(err) console.log(err)
  
  //     console.table(data.recordset);
  //     console.log(data)
  //   sql.close();
  //   });
  // });
 
  
module.exports = {
  sql, poolPromise
}