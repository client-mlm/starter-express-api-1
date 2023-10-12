const { User } = require('../models/user');

const generateUniqueReferralCode = async () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    return User.findOne({ referralCode: code }).then(existingUser => {
        if (existingUser) {
            return generateUniqueReferralCode(); // Recursive call if code already exists
        }
        return code;
    });
}

module.exports =  generateUniqueReferralCode;