
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');//引入node的文件(夹)读写包
// var routeSql = require('./router/sql/routeSql.js');
var saverouteSql = require('./router/sql/saverouteSql.js')();
var Ipconfig = require('./router/Ipconfig/Ipconfig.js')
var schedule = require('node-schedule')
var Sequelize = require('sequelize');

var app = express();
app.use(express.static('www'))
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb',extended:true}));
app.use(bodyParser.json({verify:function(req,res,buf,encoding){req.rawBody = buf}}))//设置能够接收raw字段
app.use(bodyParser.urlencoded({extend:false,verify:function(req,res,buf,encoding){req.rawBody = buf}}));//设置能够接收raw字段

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//http://127.0.0.1 ; null 本地访问 ; * 任何都可以访问
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With,token,insert");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By","3.2.1");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


var config = require('./router/config/config.js')
config();

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that URL!');
    next()
});

var sequelize = require('./router/sql/sqlConnect.js')
console.log('--------------')
console.log(saverouteSql)
// console.log(routeSql('mysql_move'))
console.log('--------------')
// routeSql('sharelink').AbpLink.findOne({where:{Id:2}}).then(function(data){
//     console.log(data)
// })

app.listen(Ipconfig.Local.LocalIpPort,function(){
    console.log(Ipconfig.Local.LocalIpPort)
    console.log('server running……');
})

var data1 = {BeginBase:'A',EndBase:'B',BeginTable:'zbp_post',EndTable:'zbp_testpost'}
var data2 = {A:123,B:'ssss'}
var key = data1.BeginBase
console.log(data2[data1.BeginBase])

// var arr = [4,5],brr = [9,10],crr=[15,16,17,18]
// aa()
// bb()
// function aa(){
//     var k = schedule.scheduleJob(arr.shift() + ' * * * * *',function(){
//         console.log(arr)
//         k.cancel()
//         aa()
//     })
// }
// for (var i = 0; i < crr.length; i++) {
//     // console.log(crr[i])
//     cancele(i)
// }
// function cancele(i){
//     var k = schedule.scheduleJob(crr[i] + ' * * * * *',function(){
//         console.log(i)
//         console.log('----------')
//         k.cancel()
//     })

// }
// function bb(){
//     var k = schedule.scheduleJob(brr.shift() + ' * * * * *',function(){
//         console.log(brr)
//         k.cancel()
//         bb()
//     })
// }



