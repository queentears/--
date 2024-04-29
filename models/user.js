const db=require('../config/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');



const userModel = db.define('user', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
   UserName: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'name'
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'password'
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'email'
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: true,
        field:'gender'
    },
    Desc: {
        type: DataTypes.TEXT,
        allowNull: true,
        field:'jianjie'
    },
}, {
   
     freezeTableName: true,
    tableName: 'user', 
    timestamps: false, 
    
});

module.exports = userModel;
