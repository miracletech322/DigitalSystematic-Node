const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const User = require('../models/user.model');

exports.signinAction = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.find({ email }).exec();

        if (userData.length === 0) {
            res.status(200).json({
                status: "not_exist",
            });
        } else {
            const hashedPassword = userData[0].password;
            const status = await bcrypt.compare(password, hashedPassword);
            if (status) {
                const token = jwt.encode(userData, '0xDbc23AE43a150ff8884B02Cea117b22D1c3b9796');
                const user = userData[0].toObject();
                delete user.password;

                res.status(200).json({
                    status: "success",
                    user: user,
                    token,
                });
            } else {
                res.status(200).json({
                    status: "wrong",
                });
            }
        }
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
};

exports.signupAction = async (req, res) => {
    try {
        const { managerName, email, password, role } = req.body;

        const existUsers = await User.find({ email });
        if (existUsers.length > 0) {
            res.status(200).json({
                status: "exist",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const passwordString = await bcrypt.hash(password, salt);
        const user = new User({
            email,
            password: passwordString,
            role,
            managerName
        });

        let userData = await user.save();

        userData = userData.toObject();
        delete userData.password;

        res.status(200).json({
            status: "success",
            user: userData,
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
};
