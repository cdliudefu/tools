var redis = require('redis');
// var client = redis.createClient(); //返回的是一个RedisClient的对象

var RDS_PORT = 6379; //端口号
var RDS_HOST = '127.0.0.1'; //主机
var RDS_OPTS = {}; // 设置项
var RDS_PWS = 'foobared';//redis密码
	// RDS_OPTS['auth_pass']=RDS_PWS; //方法一设置密码

var client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
//方法2 设置连接密码
// client.auth(RDS_PWS,function(){
// 	console.log("通过验证");
// })

//测试是否连接上
client.on('ready',function(err){
	console.log("ready");
});

//Redis的Connection事件之一，在不设置client.options.no_ready_check的情况下，客户端触发connect同时它会发出ready，
//如果设置了client.options.no_ready_check，当这个stream被连接时会触发connect，
// client.on('connect',function(){
// 	client.set('author','zhansan',redis.print);
// 	client.get('author',redis.print);
// 	console.log("connect");
// });

// client.on('connect',function(){
// 	client.hmset('short',{'js':'javascript','c#':'c sharp'},redis.print);
// 	client.hmset('short','SQL','Structured Query Language','HTML','HyperText Mark-up Language',redis.print);

// 	client.hgetall('short',function(err,res){
// 		if(err){
// 			console.log("error:"+err);
// 			return;
// 		}
// 		console.dir(res);
// 	})
// });
//end：redis已建立的连接被关闭时触发
client.on('end',function(err){
	console.log("end");
})

client.on('connect',function(){
	var key = 'skills';
	//client.sadd(key,value1,...valuen,[callback])：集合操作，向集合key中添加N个元素，已存在元素的将忽略；
	// client.sadd(key,'c#');
	// client.sadd(key,'nodejs');
	// client.sadd(key,'mysql');

	//client.multi([commands])：这个标记一个事务的开始，由Multi.exec原子性的执行；github上描述是可以理解为打包，把要执行的命令存放在队列中，
	//redis服务器会原子性的执行所有命令，node_redis接口返回一个Multi对象
	//
	//Multi.exec( callback )：执行事务内所有命令；github上描述是client.multi()返回一个Multi对象，它包含了所有命令，直到Multi.exec()被调用；
	//
	//sismember(key,value,[callback])：元素value是否存在于集合key中，存在返回1，不存在返回0
	//
	//smembers(key,[callback])：返回集合 key 中的所有成员，不存在的集合key也不会报错，而是当作空集返回
	client.multi().sismember(key,'c#').smembers(key).exec(function(err,replies){
		console.log("multi got"+replies.length+'replies');
		replies.forEach(function(reply,index){
			console.log("reply "+index+":"+reply.toString());
		});

		//client.quit()：与之对应的还有一个client.end()方法，相对比较暴力；client.quit方法会接收到所有响应后发送quit命令，而client.end则是直接关闭；都是触发end事件
		client.quit();
	});

})
