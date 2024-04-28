const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const passport = require('passport');
const FavoriteModel = require('../../models/favorite'); // 确保路径正确
const PerfumeModel = require('../../models/perfumeMod');

// 获取收藏列表，支持分页和关键字搜索
router.get('/page/:page/limit/:limit', passport.authenticate('jwt', { session: false }), async function(req, res) {
    const page = parseInt(req.params.page, 10);
    const limit = parseInt(req.params.limit, 10);

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).send("Invalid page or limit parameter");
    }

    try {
        // 第一步：从收藏表中统计香水ID及其收藏次数
        const collectedData = await FavoriteModel.findAll({
            attributes: [
                'Perfumeid',
                [Sequelize.fn('COUNT', Sequelize.col('Perfumeid')), 'collectCount']
            ],
            group: ['Perfumeid'],
            order: [[Sequelize.col('collectCount'), 'DESC']],
            raw: true,
            limit: limit,
            offset: (page - 1) * limit
        });

        // 第二步：从香水表中获取详细信息
        const perfumeIds = collectedData.map(item => item.Perfumeid);
        const perfumeDetails = await PerfumeModel.findAll({
            where: {
                id: {
                    [Op.in]: perfumeIds
                }
            },
            attributes: ['id', 'Perfume', 'Notes', 'Label', 'Scene']
        });

        // 将香水详细信息映射到收藏数据
        const data = collectedData.map(item => ({
            ...item,
            ...perfumeDetails.find(perfume => perfume.id === item.Perfumeid)
        }));

        // 返回数据和分页信息
        const total = await FavoriteModel.count({
            distinct: true,
            col: 'Perfumeid'
        });

        res.json({
            data: data,
            total: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send(error.message);
    }
});

// 测试路由：获取所有被收藏的香水详细信息
router.get('/test-perfumes', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        // 第一步：从收藏表中获取所有不同的香水 ID
        const uniquePerfumeIds = await FavoriteModel.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('Perfumeid')), 'Perfumeid']
            ],
            raw: true
        });

        // 提取所有香水 ID
        const perfumeIds = uniquePerfumeIds.map(item => item.Perfumeid);

        // 第二步：使用这些 ID 查询香水表中的详细信息
        // const perfumes = await PerfumeModel.findAll({
        //     where: {
        //         id: {
        //             [Op.in]: perfumeIds
        //         }
        //     },
        //     attributes: ['id', 'Perfume', 'Notes', 'Label', 'Scene'] // 根据需要选择字段
        // });

        // 返回查询到的所有香水数据
        res.json(perfumeIds);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;

