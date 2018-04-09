
module.exports = function(){
	var routeSql = {}
	var success_log = require('./allSql/success_log.js')('success_log');

	success_log.sync({force:false});

	routeSql.success_log = success_log;

	return routeSql;	
}