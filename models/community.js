const db=require('../config/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const Community = db.define('社区', {
   
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'name'
    },
    Content:{
        type:DataTypes.TEXT,
        allowNull:false,
        field:'content',
    },
    Time:{
        type:DataTypes.TIME,
        allowNull:false,
        field:'time',
    }},
    //sequelize,
   // modelName: 'Student',
  {  freezeTableName: true,
    tableName: '社区', // 确保这个名称与你的数据库表名一致
    timestamps: false, // 假设你的表不包含Sequelize默认的createdAt和updatedAt字段}  // 如果你不想使用Sequelize自动生成的复数形式表名（students），可以显式指定表名
  });

module.exports = Community;
