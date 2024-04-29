const express = require('express');
const path = require('path');
const router =express.Router();
const PerfumeModel = require('../models/perfumeMod');
const User=require('../models/user');
const CommunityModel = require('../models/community');
const { Op } = require('sequelize');
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  
  router.get('/stats', async function(req, res, next) {
    try {
        // 获取用户总数
        const totalUsers = await User.count();

        // 获取性别为男的用户数量
        const maleUsers = await User.count({
            where: { Gender: '男' }
        });

        // 获取性别为女的用户数量
        const femaleUsers = await User.count({
            where: { Gender: '女' }
        });

        // 获取香水总数
        const totalPerfumes = await PerfumeModel.count();

        // 获取社区总数
        const totalCommunities = await CommunityModel.count();

        // 返回统计数据
        res.json({
            totalUsers: totalUsers,
            maleUsers: maleUsers,
            femaleUsers: femaleUsers,
            totalPerfumes: totalPerfumes,
            totalCommunities: totalCommunities
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).send('Server error');
    }
});



  module.exports = router;
