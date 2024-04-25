
const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require('../../models/user');
const { Op } = require('sequelize');
const passport = require('passport');
const jwtSecret = 'secret'; // 用于JWT签名的密钥
const saltRounds = 10; // 用于bcrypt加密的salt轮次


router.get('/',function(req,res,next){
    res.send('users');
}  );


router.post('/register', async (req, res) => {
    const { UserName, Password, Email, Gender, jianjie } = req.body;
    try {
        // 检查用户名或邮箱是否已存在
        const userExists = await User.findOne({
            where: {
                [Op.or]: [
                    { UserName: UserName },
                    { Email: Email }
                ]
            }
        });

        if (userExists) {
            return res.status(409).send('Username or Email already in use');
        }

        // 加密密码
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        // 创建新用户
        const newUser = await User.create({
            UserName,
            Password: hashedPassword,
            Email,
            Gender,
            jianjie
        });

        // 生成JWT token
        const token = jwt.sign({ id: newUser.id }, jwtSecret, { expiresIn: '1h' });
        const tokenWithBearer = `Bearer ${token}`;
        res.status(201).json({
            message: '注册成功！',
            token:tokenWithBearer
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 用户登录
router.post('/login', async (req, res) => {
    const { login, Password } = req.body; // 'login'可以是用户名或邮箱
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { Email: login },   // 查找邮箱匹配
                    { UserName: login } // 查找用户名匹配
                ]
            }
        });

        if (!user) {
            return res.status(404).send('用户未找到');
        }

        // 比较密码
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).send('密码错误！');
        }

        // 生成JWT token
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
        const tokenWithBearer = `Bearer ${token}`;
        res.json({ token: tokenWithBearer });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/test',passport.authenticate('jwt', { session: false }),function(req,res){
res.json(req.user);
});




module.exports=router;