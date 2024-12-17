const Recommend = require("./../models/recommend.model");

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
