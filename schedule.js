//Cron风格定时器
/*
    *  *  *  *  *  *
    ┬ ┬ ┬ ┬ ┬ ┬
    │ │ │ │ │  |
    │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
    │ │ │ │ └───── month (1 - 12)
    │ │ │ └────────── day of month (1 - 31)
    │ │ └─────────────── hour (0 - 23)
    │ └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)

　　6个占位符从左到右分别代表：秒、分、时、日、月、周几

　　'*'表示通配符，匹配任意，当秒是'*'时，表示任意秒数都触发，其它类推

　　下面可以看看以下传入参数分别代表的意思

    每分钟的第30秒触发： '30 * * * * *'

    每小时的1分30秒触发 ：'30 1 * * * *'

    每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'

    每月的1日1点1分30秒触发 ：'30 1 1 1 * *'

    2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

    每周1的1点1分30秒触发 ：'30 1 1 * * 1'
    */

var schedule = require('node-schedule');

function scheduleCronstyle(){
	schedule.scheduleJob('30 * * * * *',function(){
		console.log("scheduleCronstyle:"+new Date());
	})
}

scheduleCronstyle();

//Cron风格定时器-范围触发
// function scheduleCronstyle(){
//     schedule.scheduleJob('1-10 * * * * *', function(){
//         console.log('scheduleCronstyle:' + new Date());
//     }); 
// }

//递归规则定时器
// function scheduleRecurrenceRule(){
//     var rule = new schedule.RecurrenceRule();
//     // rule.dayOfWeek = 2;
//     // rule.month = 3;
//     // rule.dayOfMonth = 1;
//     // rule.hour = 1;
//     // rule.minute = 42;
//     rule.second = 0;
    
//     schedule.scheduleJob(rule, function(){
//        console.log('scheduleRecurrenceRule:' + new Date());
//     });
// }

//对象文本语法定时器
// function scheduleObjectLiteralSyntax(){
//     //dayOfWeek
//     //month
//     //dayOfMonth
//     //hour
//     //minute
//     //second
//     schedule.scheduleJob({hour: 16, minute: 11, dayOfWeek: 1}, function(){
//         console.log('scheduleObjectLiteralSyntax:' + new Date());
//     });
// }

//取消定时器
function scheduleCancel(){
    var counter = 1;
    var j = schedule.scheduleJob('* * * * * *', function(){
        console.log('定时器触发次数：' + counter);
        counter++;
        
    });
    setTimeout(function() {
        console.log('定时器取消')
        j.cancel();   
    }, 5000);
}

scheduleCancel();
