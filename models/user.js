const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    referralCode: {
        type: String,
        required: true,
        unique: true
    },
    referredBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level: {
        type: Number,
        required: true
    },
    data: {
        type: Schema.Types.Mixed,
        default: {}
    },
    commission: {
        type: Number,
        default: 0
    },
    investment: {
        type: Number,
        default: 0
    },
      documentType: String,
  identityProofNumber: String,
  address: String,
});


module.exports = {
    User :  mongoose.model('User', userSchema),
};
