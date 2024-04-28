const db=require('../config/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const PerfumeModel = require('./perfumeMod');
const FavoriteModel = db.define('favorites', {
   
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
  },
  AddTime:{
        type: DataTypes.DATE,
        allowNull: false,
        field:'AddTime',
    }
}, {
   
    freezeTableName: true,
    tableName: 'favorites', 
    timestamps: false, 
    
});


module.exports = FavoriteModel;

