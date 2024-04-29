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
        type:DataTypes.DATE,
        allowNull:false,
        field:'time',
    }},

  {  freezeTableName: true,
    tableName: '社区',
    timestamps: false, });

module.exports = Community;
