const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecommendSchema = new Schema(
    {
        status: {
            type: Number,
        },
        userId: {
            type: Schema.Types.ObjectId, // Reference to User model
            ref: 'User',
        }
    },
    {
        timestamps: true,
    }
);

const Recommend = mongoose.model('Recommend', RecommendSchema);

module.exports = Recommend;
