const Recommend = require("./../models/recommend.model");
const User = require("./../models/user.model");

exports.updateAction = async (req, res) => {
    try {
        const { status } = req.body;
        const userId = req.user.id;

        let recommend = await Recommend.findOne({
            where: {
                userId: userId
            }
        });

        if (recommend) {
            recommend = await recommend.update({ status });
        } else {
            recommend = await Recommend.create({
                userId,
                status
            });
        }
        return res.status(200).json({
            status: "success",
            recommend: recommend,
        });
    } catch (e) {
        return res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
};

exports.usersAction = async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [
                {
                    model: Recommend,
                    as: 'recommends',
                },
            ],
            attributes: {
                exclude: ['password', 'email'],
            },
            order: [['id', 'ASC']],
        });

        const users = [];
        for (let i = 0; i < userData.length; i++) {
            users.push(userData[i].toJSON())
        }

        const lst = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].parentLevel == req.user.level)
                lst.push(users[i])
        }

        for (let i = 0; i < lst.length; i++) {
            if (lst[i].role == 'Manager') {
                lst[i].recommends = getTemplateData(users, lst[i].level)
            }
        }

        return res.status(200).json({
            status: "success",
            users: lst,
        });
    } catch (e) {
        return res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
}

exports.individualAction = async (req, res) => {
    try {
        const userId = req.user.id;
        const recommends = await Recommend.findAll({
            where: {
                userId: userId
            }
        });

        return res.status(200).json({
            status: 'success',
            recommends
        })
    } catch (e) {
        return res.status(400).json({
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
