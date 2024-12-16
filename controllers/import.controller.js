const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

exports.uploadAction = async (req, res) => {
    try {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const form = new formidable.IncomingForm({ uploadDir: uploadDir, keepExtensions: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ status: 'error', details: err.message });
            }

            const uploadedFile = files.template;
            if (!uploadedFile) {
                return res.status(200).json({ status: 'no_avatar' });
            }

            return res.status(200).json({
                status: "success",
            });
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
}