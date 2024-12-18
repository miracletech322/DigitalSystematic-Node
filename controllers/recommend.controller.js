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
        const users = await User.aggregate([
            {
                $lookup: {
                    from: 'recommends',  // The name of the Recommend collection in MongoDB
                    localField: '_id',    // Field from User collection
                    foreignField: 'userId', // Field from Recommend collection
                    as: 'recommends'  // The new field that will store the joined data
                }
            }
        ]);

        const lst = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].parentLevel == req.user.level)
                lst.push(users[i])
        }

        for (let i = 0; i < lst.length; i++) {
            if (lst[i].role == 'Manager') {
                lst[i].recommends = getTemplateData(users, req.user.level)
            }
        }

        res.status(200).json({
            status: "success",
            users: lst
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

function getTemplateData(data, paraParentId) {
    const result = [];

    // Recursive function to collect all recommends from child items
    function collectRecommends(currentLevel) {
        // Find all child items of the current level
        const childItems = data.filter(item => item.parentLevel === currentLevel);

        for (const child of childItems) {
            // Collect recommends of the current child item
            if (child.recommends && child.recommends.length > 0) {
                result.push(...child.recommends);
            }
            // Recursively process child items
            collectRecommends(child.level);
        }
    }

    // Find the parent item(s) that match the given paraParentId
    const parentItems = data.filter(item => item.level === paraParentId);

    for (const parent of parentItems) {
        // Collect recommends of the parent item
        if (parent.recommends && parent.recommends.length > 0) {
            result.push(...parent.recommends);
        }
        // Collect recommends from all descendants
        collectRecommends(parent.level);
    }

    return result;
}
