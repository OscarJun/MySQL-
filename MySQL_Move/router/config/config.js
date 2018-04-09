
var schedulefun = require('../schedule/schedule.js')

module.exports = function(){
	var data={
		BeginData:{
			Base:'mysql_move',
			Table:'zbp_post',
		},
		EndData:{
			Base:'mysql_b',
			Table:'zbp_testpost',
		}
	}
	schedulefun(data)
}
