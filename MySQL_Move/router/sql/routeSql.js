
module.exports = function(data){
	var routeSql = {}
	var zbp_post = require('./allSql/zbp_post.js')(data);
	var zbp_config = require('./allSql/zbp_config.js')(data);
	var zbp_category = require('./allSql/zbp_category.js')(data);
	var zbp_member = require('./allSql/zbp_member.js')(data);

	zbp_config.sync({force:false});
	zbp_post.sync({force:false});
	zbp_category.sync({force:false});
	zbp_member.sync({force:false});

	routeSql.zbp_config = zbp_config;
	routeSql.zbp_post = zbp_post;
	routeSql.zbp_category = zbp_category;
	routeSql.zbp_member = zbp_member;

	return routeSql;	
}