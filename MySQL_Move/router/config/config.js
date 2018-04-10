
var schedulefun = require('../schedule/schedule.js')

module.exports = function(){
	var data={
		BeginData:{
			Base:'asite',
			Table:'zbp_testpost',
		},
		EndData:{
			Base:'bsite',
			Table:'zbp_post',
		}
	}
	schedulefun(data)
}
