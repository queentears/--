const db=require('../config/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const PerfumeModel = db.define('香水总数据', {
   
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Perfume: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'香水名'

    },
    PerfumeDesc: {
        type: DataTypes.TEXT,
        allowNull: false,
        field:'香水简介'
    },
    Brand:{
        type: DataTypes.STRING,
        allowNull: false,
        field:'品牌'
    },
    BrandDesc:{
        type: DataTypes.TEXT,
        allowNull: false,
        field:'品牌简介'
    },
    Perfumer: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'调香师'
    },
    Score: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field:'评分',
    },
    Top: {
        type: DataTypes.STRING,
        allowNull: true ,
        field:'前调'
    },
    Middle: {
        type: DataTypes.STRING,
        allowNull: true, 
        field:'中调',
    },
    Back: {
        type: DataTypes.STRING,
        allowNull: true, 
        field:'后调',
    },
    Notes:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'香调',
    },
    Attribute:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'属性',
    },
    Personality:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'性格',
    },
    Scene:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'场景',
    },
    Smell:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'气味',
    },
    Label:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'标签',
    },
}, {
       freezeTableName: true,
    tableName: '香水总数据', 
    timestamps: false, 
    
});

module.exports = PerfumeModel;
