
var express = require('express')
var schedule = require('node-schedule')
var Sequelize = require('sequelize');
var saverouteSql = require('../sql/saverouteSql.js')();
var routeSql = require('../sql/routeSql.js')
var Ipconfig = require('../Ipconfig/Ipconfig.js')
var router = express.Router();
var app = express();


module.exports = function(data){
	saverouteSql.success_log.findOne({where:{BeginBase:data.BeginData.Base,EndBase:data.EndData.Base}}).then(function(SuccessData){
		if (SuccessData) {
			if (SuccessData.dataValues.WillMove > SuccessData.dataValues.ReadyMove) {
				var ArrLength = SuccessData.dataValues.WillMove - SuccessData.dataValues.ReadyMove
				var TimeArr = getTimeArr(ArrLength)
				saverouteSql.success_log.update({WillMove:TimeArr.length,ReadyMove:0},{where:{Id:SuccessData.dataValues.Id}}).then(function(){
					for (var i = 0; i < TimeArr.length; i++) {
						var n = schedule.scheduleJob(new Date(TimeArr[i]),function(){
							saverouteSql.success_log.findOne({where:{BeginBase:data.BeginData.Base,EndBase:data.EndData.Base}}).then(function(newSuccessData){
								routeSql(data.BeginData).zbp_post.findOne({where:{Log_ID:{$gt:newSuccessData.dataValues.SuccessID}}}).then(function(WillMoveData){
									routeSql(data.EndData).zbp_post.create({log_CateID:1,log_AuthorID:1,log_Tag:'',log_Status:0,log_Type:0,log_Alias:'',log_IsTop:0,log_IsLock:0,log_Title:WillMoveData.dataValues.log_Title,log_Intro:WillMoveData.dataValues.log_Intro,log_Content:WillMoveData.dataValues.log_Content,log_PostTime:(Date.parse(new Date())/1000),log_CommNums:0,log_ViewNums:0,log_Template:'',log_Meta:''}).then(function(){
										saverouteSql.success_log.findOne({where:{Id:newSuccessData.dataValues.Id}}).then(function(updateData){
											console.log(WillMoveData.dataValues.Log_ID)
											saverouteSql.success_log.update({ReadyMove:(parseInt(updateData.dataValues.ReadyMove)+1),SuccessID:WillMoveData.dataValues.log_ID},{where:{Id:updateData.dataValues.Id}})
										})
									})
								})
							})
						})
					}
				})
			}
			var j = schedule.scheduleJob('1 0 0 * * *',function(){
				var TimeArr = getTimeArr()
				saverouteSql.success_log.update({WillMove:TimeArr.length,ReadyMove:0},{where:{Id:SuccessData.dataValues.Id}}).then(function(){
					for (var i = 0; i < TimeArr.length; i++) {
						var n = schedule.scheduleJob(new Date(TimeArr[i]),function(){
							saverouteSql.success_log.findOne({where:{BeginBase:data.BeginData.Base,EndBase:data.EndData.Base}}).then(function(newSuccessData){
								routeSql(data.BeginData).zbp_post.findOne({where:{Log_ID:{$gt:newSuccessData.dataValues.SuccessID}}}).then(function(WillMoveData){
									routeSql(data.EndData).zbp_post.create({log_CateID:1,log_AuthorID:1,log_Tag:'',log_Status:0,log_Type:0,log_Alias:'',log_IsTop:0,log_IsLock:0,log_Title:WillMoveData.dataValues.log_Title,log_Intro:WillMoveData.dataValues.log_Intro,log_Content:WillMoveData.dataValues.log_Content,log_PostTime:(Date.parse(new Date())/1000),log_CommNums:0,log_ViewNums:0,log_Template:'',log_Meta:''}).then(function(){
										saverouteSql.success_log.findOne({where:{Id:newSuccessData.dataValues.Id}}).then(function(updateData){
											console.log(WillMoveData.dataValues.Log_ID)
											saverouteSql.success_log.update({ReadyMove:(parseInt(updateData.dataValues.ReadyMove)+1),SuccessID:WillMoveData.dataValues.log_ID},{where:{Id:updateData.dataValues.Id}})
										})
									})
								})
							})
						})
					}
				})
			})
		} else {
			saverouteSql.success_log.create({BeginBase:data.BeginData.Base,EndBase:data.EndData.Base,WillMove:0,ReadyMove:0,SuccessID:0}).then(function(SuccessData){
				var j = schedule.scheduleJob('1 0 0 * * *',function(){
					var TimeArr = getTimeArr()
					saverouteSql.success_log.update({WillMove:TimeArr.length,ReadyMove:0},{where:{Id:SuccessData.dataValues.Id}}).then(function(){
						for (var i = 0; i < TimeArr.length; i++) {
							var n = schedule.scheduleJob(new Date(TimeArr[i]),function(){
								saverouteSql.success_log.findOne({where:{BeginBase:data.BeginData.Base,EndBase:data.EndData.Base}}).then(function(newSuccessData){
									routeSql(data.BeginData).zbp_post.findOne({where:{Log_ID:{$gt:newSuccessData.dataValues.SuccessID}}}).then(function(WillMoveData){
										routeSql(data.EndData).zbp_post.create({log_CateID:1,log_AuthorID:1,log_Tag:'',log_Status:0,log_Type:0,log_Alias:'',log_IsTop:0,log_IsLock:0,log_Title:WillMoveData.dataValues.log_Title,log_Intro:WillMoveData.dataValues.log_Intro,log_Content:WillMoveData.dataValues.log_Content,log_PostTime:(Date.parse(new Date())/1000),log_CommNums:0,log_ViewNums:0,log_Template:'',log_Meta:''}).then(function(){
											saverouteSql.success_log.findOne({where:{Id:newSuccessData.dataValues.Id}}).then(function(updateData){
												console.log(WillMoveData.dataValues.Log_ID)
												saverouteSql.success_log.update({ReadyMove:(parseInt(updateData.dataValues.ReadyMove)+1),SuccessID:WillMoveData.dataValues.log_ID},{where:{Id:updateData.dataValues.Id}})
											})
										})
									})
								})
							})
						}
					})
				})
			})
		}
	})
}


function getTimeArr(ArrLength){
	var AddNum = ArrLength?ArrLength:Math.floor(Math.random()*50 + 50);
	var TimeArr = []
	var date = (Date.parse(new Date()) - ((new Date()).setHours(0,0,0,0)))/1000
	var NewArr = new Array(86220 - date);
	NewArr = NewArr.join().split(',').map(function(item, index){
	    return index + 1;
	})
	for (var i = 0; i < NewArr.length; i++) {
		var UseTime = NewArr.splice(Math.floor(Math.random()*NewArr.length),1)
		console.log(UseTime)
		TimeArr.push(new Date().getTime() + UseTime*1000 + 6000)
		if (TimeArr.length == AddNum) {
			TimeArr.sort(function(a,b){
				return a-b;
			})//从小到大排序
			console.log(TimeArr)
			return TimeArr;
		}

		// randomArr = arr - newArr;
		// value = randomArr[random];
		// newArr(value);

		// var lastTime = 86400 - (Date.parse(new Date()) - ((new Date()).setHours(0,0,0,0)))/1000
		// TimeArr.push(new Date().getTime() + Math.floor(Math.random()*(lastTime - 180))*1000 + 60000)
	
	}


	console.log(TimeArr.length)
	console.log(TimeArr)
	return TimeArr;
}
// 一天时间86400秒console.log(new Date(new Date().getTime() + Math.floor(Math.random()*(86400 - 180))*1000))获取一个一天内的随机时间 .shift获取数组第一个

function DateAdd(interval, number, date) {
    switch (interval) {
    case "y": {
        date.setFullYear(date.getFullYear() + number);
        return date;
        break;
    }
    case "q": {
        date.setMonth(date.getMonth() + number);
        return date;
        break;
    }
    case "w": {
        date.setDate(date.getDate() + number * 7);
        return date;
        break;
    }
    case "d": {
        date.setDate(date.getDate() + number);
        return date;
        break;
    }
    case "h": {
        date.setHours(date.getHours() + number);
        return date;
        break;
    }
    case "M": {
        date.setMinutes(date.getMinutes() + number);
        return date;
        break;
    }
    case "s ": {
        date.setSeconds(date.getSeconds() + number);
        return date;
        break;
    }
    default: {
        date.setDate(date.getDate() + number);
        return date;
        break;
    }
    }
}

