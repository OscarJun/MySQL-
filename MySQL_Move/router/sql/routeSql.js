
module.exports = function(data){
	var routeSql = {}
	var zbp_post = require('./allSql/zbp_post.js')(data);
	zbp_post.sync({force:false});
	routeSql.zbp_post = zbp_post;

	return routeSql;	
}