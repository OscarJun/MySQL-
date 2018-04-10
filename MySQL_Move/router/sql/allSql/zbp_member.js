
var Sequelize = require('sequelize');
var sequelize = require('../sqlConnect.js');

module.exports = function(data){
    var zbp_member = sequelize(data.Base).define(data.Table,{
        mem_ID:{
            type:Sequelize.INTEGER(11),
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        mem_Guid:{
            type:Sequelize.STRING(36),//链接名称
            allowNull:false,
        },
        mem_Level:{
            type:Sequelize.TINYINT(4),
            allowNull:false
        },
        mem_Status:{
            type:Sequelize.TINYINT(4),
            allowNull:false
        },
        mem_Name:{
            type:Sequelize.STRING(50),//链接名称
            allowNull:false,
        },
        mem_Password:{
            type:Sequelize.STRING(32),
            allowNull:false
        },
        mem_Email:{
            type:Sequelize.STRING(50),
            allowNull:false
        },
        mem_HomePage:{
            type:Sequelize.STRING(255),
            allowNull:false
        },
        mem_IP:{
            type:Sequelize.STRING(15),
            allowNull:false
        },
        mem_PostTime:{
            type:Sequelize.INTEGER(11),
            allowNull:false
        },
        mem_Alias:{
            type:Sequelize.STRING(50),//链接排序序号
            allowNull:false
        },
        mem_Intro:{
            type:Sequelize.TEXT,
            allowNull:false
        },
        mem_Articles:{
            type:Sequelize.INTEGER(11),
            allowNull:false
        },
        mem_Pages:{
            type:Sequelize.INTEGER(11),
            allowNull:false
        },
        mem_Comments:{
            type:Sequelize.INTEGER(11),
            allowNull:false
        },
        mem_Uploads:{
            type:Sequelize.INTEGER(11),
            allowNull:false
        },
        mem_Template:{
            type:Sequelize.STRING(50),
            allowNull:false
        },
        mem_Meta:{
            type:Sequelize.TEXT('long'),
            allowNull:false
        }
    },{
        timestamps:false,//不增加 TIMESTAMP 属性  (updatedAt, createdAt)
        freezeTableName:true//Model 对应的表名将与model名相同
    })
    return zbp_member;
}


