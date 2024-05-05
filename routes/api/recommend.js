const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const passport = require('passport');
const PerfumeModel = require('../../models/perfumeMod');
const FavoriteModel = require('../../models/favorite'); 
const userModel = require('../../models/user');
userModel.hasMany(FavoriteModel, { foreignKey: 'UserID' });

FavoriteModel.belongsTo(userModel, { foreignKey: 'UserID' });

router.get('/high-rating', async (req, res) => {
    try {
        const highRatingPerfumes = await PerfumeModel.findAll({
            where: {
                Score: {
                    [Op.gte]: 9.0
                }
            },
            order: Sequelize.literal('rand()'), // 随机排序
            limit: 3
        });

        res.json(highRatingPerfumes);
    } catch (error) {
        console.error('Error fetching high rating perfumes:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/top-users-by-favorites', async (req, res) => {
    try {
        // 查询收藏数最多的三个用户ID
        const topUserIds = await FavoriteModel.findAll({
            attributes: [
                'UserID',
                [Sequelize.fn('COUNT', Sequelize.col('UserID')), 'FavoriteCount']
            ],
            group: 'UserID',
            order: [[Sequelize.fn('COUNT', Sequelize.col('UserID')), 'DESC']],
            limit: 3,
            raw: true
        });
 
       
        // 从获取的ID数组中提取用户ID
        const userIds = topUserIds.map(entry => entry.UserID);
       
        // 根据这些ID查询用户详细信息
        const topUsers = await userModel.findAll({
            attributes: ['UserName', 'Email', 'Desc'], // 只查询这些字段
            where: {
                id: {
                    [Sequelize.Op.in]: userIds
                }
            },
            order: [
                [Sequelize.literal(`FIELD(id, ${userIds.join(',')})`)] // 保持与原来收藏计数的顺序相同
            ]
        });

        res.json(topUsers);
    } catch (error) {
        console.error('Error fetching top users by favorites:', error);
        res.status(500).send('Internal Server Error');
    }
});







module.exports = router;