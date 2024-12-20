const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const User = require('../models/user.model');

exports.signinAction = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.findOne({
            where: { email },
        });

        if (!userData) {
            return res.status(200).json({
                status: "not_exist",
            });
        }

        const hashedPassword = userData.password;
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (isPasswordValid) {
            const token = jwt.encode(userData.toJSON(), '0xDbc23AE43a150ff8884B02Cea117b22D1c3b9796');

            const user = userData.toJSON();
            delete user.password;

            return res.status(200).json({
                status: "success",
                user: user,
                token,
            });
        } else {
            return res.status(200).json({
                status: "wrong",
            });
        }
    } catch (e) {
        return res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
};

exports.signupAction = async (req, res) => {
    try {
        const { managerName, email, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(200).json({
                status: "exist",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email,
            password: hashedPassword,
            role,
            managerName,
        });

        const userData = { ...user.toJSON() };
        delete userData.password;

        return res.status(200).json({
            status: "success",
            user: userData,
        });
    } catch (e) {
        return res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
};
