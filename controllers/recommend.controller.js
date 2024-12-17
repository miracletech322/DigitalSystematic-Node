const Recommend = require("./../models/recommend.model");
const User = require("./../models/user.model");
const mongoose = require('mongoose');

exports.updateAction = async (req, res) => {
    try {
        const { status } = req.body;
        const userId = req.user._id;

        const recommend = await Recommend.findOneAndUpdate(
            { userId }, // Query to find the document
            { status }, // Update data
            { new: true, upsert: true } // Options: Return the updated document, and create if it doesn't exist
        );

        res.status(200).json({
            status: "success",
            recommend: recommend,
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
};

exports.usersAction = async (req, res) => {
    try {
        const users = await User.find({ parentLevel: req.user.level })
        res.status(200).json({
            status: "success",
            users: users,
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
}

exports.individualAction = async (req, res) => {
    try {
        const userId = req.user._id;
        const recommends = await Recommend.find({
            userId
        });
        res.status(200).json({
            status: 'success',
            recommends
        })
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
}