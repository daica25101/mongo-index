const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const USER_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 0
}
const userSchema = new Schema({
    username: { type: String },
    email: String,
    status: {
        type: 'number',
        isIn: Object.values(USER_STATUSES),
        default: USER_STATUSES.INACTIVE
    },
    createdAt: Date,
    isBlocked: {
        type: 'boolean'
    }
});

module.exports = mongoose.model('User', userSchema);