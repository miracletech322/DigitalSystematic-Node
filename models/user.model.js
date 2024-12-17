const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        level: {
            type: Number,
            default: 0,
        },
        department: {
            type: String,
            default: '',
        },
        managerName: {
            type: String,
            required: true
        },
        managerNumber: {
            type: String,
            default: ''
        },
        parentLevel: {
            type: Number,
            default: 0,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['User', 'Admin', 'Manager'],
            default: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
