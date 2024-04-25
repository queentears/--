const db=require('../config/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const perModel = db.define('香水总数据', {
   
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
        allowNull: true ,// 根据你的需求调整
        field:'前调'
    },
    Middle: {
        type: DataTypes.STRING,
        allowNull: true, // 根据你的需求调整
        field:'中调',
    },
    Back: {
        type: DataTypes.STRING,
        allowNull: true, // 根据你的需求调整,
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
    //sequelize,
   // modelName: 'Student',
    // 如果你不想使用Sequelize自动生成的复数形式表名（students），可以显式指定表名
    freezeTableName: true,
    tableName: '香水总数据', // 确保这个名称与你的数据库表名一致
    timestamps: false, // 假设你的表不包含Sequelize默认的createdAt和updatedAt字段
    
});

module.exports = perModel;

//模型定义完成后，你可以使用模型来查询数据库。例如：
// const student = require('./student');
// const students = await student.findAll();
// console.log(students);