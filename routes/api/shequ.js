const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const passport = require('passport');

const CommunityModel = require('../../models/community');

// 获取分页社区信息
router.get('/page/:page/limit/:limit', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const limit = parseInt(req.params.limit, 10);
    const keyword = req.query.keyword;

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).send("Invalid page or limit parameter");
    }

    try {
        const offset = (page - 1) * limit;
        const whereClause = keyword ? { Content: { [Op.like]: `%${keyword}%` } } : {};

        const communities = await CommunityModel.findAll({
            where: whereClause,
            limit: limit,
            offset: offset
        });

        const totalCommunities = await CommunityModel.count({ where: whereClause });

        res.json({
            data: communities,
            total: totalCommunities,
            totalPages: Math.ceil(totalCommunities / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 添加新的社区信息
router.post('/add', async (req, res) => {
    try {
        const community = await CommunityModel.create(req.body);
        res.status(201).json({ message: '创建成功' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 删除社区信息
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;

    try {
        const community = await CommunityModel.findByPk(id);
        if (!community) {
            return res.status(404).send('社区信息未找到');
        }

        await community.destroy();
        res.status(200).send('社区信息删除成功');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 更新社区信息
router.put('/update/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;
    const { Name, Content, Time } = req.body;

    if (!Name || !Content) {
        return res.status(400).send({message:'必须提供社区名和内容'});
    }

    try {
        const community = await CommunityModel.findByPk(id);
        if (!community) {
            return res.status(404).send({message:'社区内容未找到'});
        }

        community.Name = Name;
        community.Content = Content;
        community.Time = Time;

        await community.save();
        res.status(200).send({message:'社区信息更新成功'});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const id = req.params.id;

    try {
        const community = await CommunityModel.findByPk(id);
        if (!community) {
            return res.status(404).send({message:'社区信息未找到'});
        }
        res.json(community);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
