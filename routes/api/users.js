
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
            Desc
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
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '24h' });
        const tokenWithBearer = `Bearer ${token}`;
        res.json({ token: tokenWithBearer });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 添加用户
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { UserName, Password, Email, Gender, Desc } = req.body;
    try {
        // Check if username or email already exists
        const userExists = await User.findOne({
            where: {
                [Op.or]: [
                    { UserName: UserName },
                    { Email: Email }
                ]
            }
        });
        if (userExists) {
            return res.status(409).json({ message: '用户名或邮箱已被使用' });
        }
        // Encrypt password
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        // Create new user
        const newUser = await User.create({
            UserName,
            Password: hashedPassword,
            Email,
            Gender,
            Desc
        });
        res.status(201).json({ message: '用户创建成功' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 删除用户
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params; // 从URL中获取用户ID

    try {
        // 查询数据库中的用户
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('用户未找到');
        }

        // 删除用户
        await user.destroy();
        res.status(200).send('用户删除成功');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 更新用户信息
router.put('/update/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params; // 获取URL中的用户ID
    const { UserName, Email, Gender, Desc } = req.body; // 从请求体中获取更新数据

    if (!UserName || !Email || !Gender || !Desc) {
        return res.status(400).send('所有字段均为必填项');
    }

    try {
        // 查询数据库，看是否有该用户
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('用户未找到');
        }

        // 更新用户信息
        user.UserName = UserName;
        user.Email = Email;
        user.Gender = Gender;
        user.Desc = Desc;
        await user.save(); // 保存更新

        res.status(200).send('用户更新成功');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//获取所有用户信息
router.get('/all',passport.authenticate('jwt', { session: false }),async function(req,res){
    try{
        const users=await User.findAll();
        res.json(users);
    }catch(error){
        res.status(500).send(error.message);
    }
});
//获取单个用户信息
router.get("/:id", passport.authenticate('jwt', { session: false }), async function (req, res) {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('用户未找到');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});




router.get('/test',passport.authenticate('jwt', { session: false }),function(req,res){
res.json(req.user);
});




module.exports=router;