const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const XLSX = require('xlsx');
const User = require('./../models/user.model');
const bcrypt = require('bcryptjs');

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

            const filePath = uploadedFile[0].filepath;
            const workbook = XLSX.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const xlsJson = XLSX.utils.sheet_to_json(sheet, { range: 1 });

            for (let i = 0; i < xlsJson.length; i++) {
                const item = xlsJson[i];

                const salt = await bcrypt.genSalt(10);
                const passwordString = await bcrypt.hash(item.Password + "", salt);

                const existUsers = await User.find({ email: item.Email });
                if (existUsers.length > 0) {
                    continue;
                }

                const user = new User({
                    level: item.Level ? item.Level : 0,
                    department: item.DepartmentName ? item.DepartmentName : '',
                    managerName: item.ManagerName ? item.ManagerName : '',
                    managerNumber: item.ManagerPersonalNumber ? item.ManagerPersonalNumber : '',
                    parentLevel: item.ParentLevel ? item.ParentLevel : 0,
                    email: item.Email,
                    password: passwordString,
                    role: item.DepartmentName ? 'Manager' : 'User',
                });

                await user.save();
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

exports.dashboardAction = async (req, res) => {
    try {
        const users = await User.find(
            { role: { $ne: 'Admin' } }
        );

        return res.status(200).json({
            status: "success",
            users
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
}