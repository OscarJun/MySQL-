

var express = require('express');
var router = express.Router();



Ipconfig = {
	Sql:{
		SqlName:'success_log',//数据库名称PeiXunTYuJun 'PeiXunKeyT'
		SqlUserName:'root',//数据库用户名
		SqlPassword:'xiaoniuuse',//数据库密码 Password1'yujun'
		SqlIpHost:'47.98.135.197',//
		SqlIpPort:3306,
	},
	Local:{
		LocalIpHost:'47.98.135.197',//外网ip
		// LocalIpHost:'192.168.199.210',//本地测试ip
		// DomainName:'menu.xiaoniu.link',//域名
		LocalIpPort:8801//运行端口
	}
}

module.exports = Ipconfig


