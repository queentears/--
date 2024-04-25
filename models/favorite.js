const db=require('../config/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const favModel = db.define('favorites', {
   
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field:"FavoriteID"
    },
  Userid:{
        type: DataTypes.INTEGER,
        field:'UserID',
    },
    Perfumeid:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field:'PerfumeID',
  }
}, {
   
    freezeTableName: true,
    tableName: 'favorites', // 确保这个名称与你的数据库表名一致
    timestamps: false, // 假设你的表不包含Sequelize默认的createdAt和updatedAt字段
    
});

module.exports = favModel;

