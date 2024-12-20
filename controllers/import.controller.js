const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const XLSX = require('xlsx');
const bcrypt = require('bcryptjs');
const User = require('./../models/user.model');
const Recommend = require('../models/recommend.model');
const { Sequelize } = require('sequelize');

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

                const existUser = await User.findOne({
                    where: { email: item.Email },
                });

                if (existUser) {
                    continue;
                }

                await User.create({
                    level: item.Level || 0,
                    department: item.DepartmentName || '',
                    managerName: item.ManagerName || '',
                    managerNumber: item.ManagerPersonalNumber || '',
                    parentLevel: item.ParentLevel || 0,
                    email: item.Email,
                    password: passwordString,
                    role: item.DepartmentName ? 'Manager' : 'User',
                });
            }

            return res.status(200).json({
                status: "success",
            });
        });
    } catch (e) {
        return res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
}

exports.dashboardAction = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                role: { [Sequelize.Op.ne]: 'Admin' },
            },
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

        return res.status(200).json({
            status: "success",
            users
        });
    } catch (e) {
        return res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
}