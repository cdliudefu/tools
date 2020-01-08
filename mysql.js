var mysql = require('mysql'); // 调用mysql模块

//创建一个connection
// var connection = mysql.createConnection({
// 	host:'127.0.0.1', // 主机
// 	user:'root',
// 	password:'root',
// 	post:'3306',
// 	 database: 'test', 
// });

//创建连接池
var pool  = mysql.createPool({
  host     : '192.168.0.200',
  user     : 'root',
  password : 'abcd'
});

//直接使用
pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

//共享
pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
});


//监听connection事件
pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

// 防止SQL注入，可以使用pool.escape()和connect.escape()
// pool.getConnection(function(err,connection){
    
//     connection.query('SELECT * FROM userinfo WHERE id = ' + '5 OR ID = 6',function(err,result){
//         //console.log(err);
//         console.log(result);
//         connection.release();
//     });

//     connection.query('SELECT * FROM userinfo WHERE id = ' + pool.escape('5 OR ID = 6') ,function(err,result){
//         //console.log(err);
//         console.log(result);
//         connection.release();
//     });
// })

//运行断线重连代码
// var connection;
// function handleDisconnect() {
//   connection = mysql.createConnection(db_config);                                               
//   connection.connect(function(err) {              
//     if(err) {                                     
//       console.log("进行断线重连：" + new Date());
//       setTimeout(handleDisconnect, 2000);   //2秒重连一次
//       return;
//     }         
//      console.log("连接成功");  
//   });                                                                           
//   connection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
//       handleDisconnect();                         
//     } else {                                      
//       throw err;                                 
//     }
//   });
// }
// handleDisconnect();


// var pool  = mysql.createPool({
//   host     : '192.168.0.200',       
//   user     : 'root',              
//   password : 'abcd',       
//   port: '3306',                   
//   database: 'nodesample'  
// });

// pool.getConnection(function(err, connection) {

//     connection.query( 'SELECT * FROM userinfo;', function(err, result) {    
//         console.log(result);
//         connection.release();
//     });

//     connection.query( 'SELECT * FROM userinfo;', function(err, result) {
        
//         console.log(result);
//         connection.release();

//     });
// });


// 创建链接
connection.connect(function(err){
	if(err){
		console.log("[query]-"+err);
		return;
	}
	console.log("[connection connect] succeed");
});

// var  userAddSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)';
// var  userAddSql_Params = ['Wilson', 'abcd'];
// //增
// connection.query(userAddSql,userAddSql_Params,function (err, result) {
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          return;
//         }        

//        console.log('--------------------------INSERT----------------------------');
//        //console.log('INSERT ID:',result.insertId);        
//        console.log('INSERT ID:',result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });
// 

var userModSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
var userModSql_Params = ['钟慰', '5678',1];
//改
connection.query(userModSql,userModSql_Params,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
  console.log('--------------------------UPDATE----------------------------');
  console.log('UPDATE affectedRows',result.affectedRows);
  console.log('-----------------------------------------------------------------\n\n');
});

// var  userDelSql = 'DELETE FROM userinfo';
// //删
// connection.query(userDelSql,function (err, result) {
//         if(err){
//           console.log('[DELETE ERROR] - ',err.message);
//           return;
//         }        

//        console.log('--------------------------DELETE----------------------------');
//        console.log('DELETE affectedRows',result.affectedRows);
//        console.log('-----------------------------------------------------------------\n\n');  
// });


// var  userGetSql = 'SELECT * FROM userinfo';
// //查
// connection.query(userGetSql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }        

//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });

// // 执行sql语句
// connection.query('select 1+1 as solution',function(err,rows,fields){
// 	if(err){
// 		console.log("[query]-"+err);
// 		return;
// 	}
// 	console.log("the solution is:"+rows[0].solution);
// });



// 关闭链接
connection.end(function(err){
	if(err){
		console.log("--"+err);
		return;
	}
	console.log("[connection end] scceed");
})


