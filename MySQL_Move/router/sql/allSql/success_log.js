
var Sequelize = require('sequelize');
var sequelize = require('../sqlConnect.js');
module.exports = function(SqlName){

	var success_log = sequelize(SqlName).define('success_log',
	{
	    Id:{
	        type:Sequelize.BIGINT,
	        allowNull:false,
	        primaryKey:true,
	        autoIncrement:true
	    },
	    BeginBase:{
	        type:Sequelize.STRING,
	        allowNull:false
	    },
	    EndBase:{
	        type:Sequelize.STRING,
	        allowNull:false
	    },
	    WillMove:{
	        type:Sequelize.BIGINT,
	        allowNull:false
	    },
	    ReadyMove:{
	        type:Sequelize.BIGINT,
	        allowNull:false
	    },
	    SuccessID:{
	        type:Sequelize.BIGINT,
	        allowNull:false
	    }
	},{
	    timestamps:false,//不增加 TIMESTAMP 属性  (updatedAt, createdAt)
	    freezeTableName:true//Model 对应的表名将与model名相同
	})

    return success_log;
}

