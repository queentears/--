const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const passport = require('passport');

// 修改模型名以避免与字段名重复
const PerfumeModel = require('../../models/perfumeMod');

router.get('/page/:page/limit/:limit', passport.authenticate('jwt', { session: false }), async function(req, res) {
    const page = parseInt(req.params.page, 10);
    const limit = parseInt(req.params.limit, 10);
    const keyword = req.query.keyword;

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).send("Invalid page or limit parameter");
    }

    try {
        const offset = (page - 1) * limit;
        const whereClause = keyword ? {
            [Op.or]: [
                {Perfume: {[Op.like]: `%${keyword}%`}},
                {Brand: {[Op.like]: `%${keyword}%`}},
                {Notes: {[Op.like]: `%${keyword}%`}},
                {Top: {[Op.like]: `%${keyword}%`}},
                {Middle: {[Op.like]: `%${keyword}%`}},
                {Back: {[Op.like]: `%${keyword}%`}},
                {Attribute: {[Op.like]: `%${keyword}%`}},
                {Smell: {[Op.like]: `%${keyword}%`}},
            ]
        } : {};

        const perfumes = await PerfumeModel.findAll({
            where: whereClause,
            limit: limit,
            offset: offset
        });

        const totalPerfumes = await PerfumeModel.count({ where: whereClause });

        res.json({
            data: perfumes,
            total: totalPerfumes,
            totalPages: Math.ceil(totalPerfumes / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/add', async (req, res) => {
    try {
        const perfume = await PerfumeModel.create(req.body);
        res.status(201).json({ message: '创建成功' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 删除香水
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;

    try {
        const perfume = await PerfumeModel.findByPk(id);
        if (!perfume) {
            return res.status(404).send('香水未找到');
        }

        await perfume.destroy();
        res.status(200).send('香水删除成功');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 更新香水信息
router.put('/update/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;
    const { Perfume, PerfumeDesc, Brand, BrandDesc, Perfumer, Score, Top, Middle, Back, Notes, Attribute, Personality, Scene, Smell, Label } = req.body;

    if (!Perfume || !Brand) {
        return res.status(400).send('必须提供香水名、香水简介、品牌和品牌介绍');
    }

    try {
        const perfume = await PerfumeModel.findByPk(id);
        if (!perfume) {
            return res.status(404).send('香水未找到');
        }

        // 更新香水信息
        perfume.Perfume = Perfume;
        perfume.PerfumeDesc = PerfumeDesc;
        perfume.Brand = Brand;
        perfume.BrandDesc = BrandDesc;
        perfume.Perfumer = Perfumer;
        perfume.Score = Score;
        perfume.Top = Top;
        perfume.Middle = Middle;
        perfume.Back = Back;
        perfume.Notes = Notes;
        perfume.Attribute = Attribute;
        perfume.Personality = Personality;
        perfume.Scene = Scene;
        perfume.Smell = Smell;
        perfume.Label = Label;

        await perfume.save();
        res.status(200).send('香水更新成功');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:id", passport.authenticate('jwt', { session: false }), async function (req, res) {
    const id = req.params.id;

    try {
        const perfume = await PerfumeModel.findByPk(id);
        if (!perfume) {
            return res.status(404).send('香水未找到');
        }
        res.json(perfume);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = router;