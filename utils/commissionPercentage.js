const getCommissionPercentage = async (level) => {
    switch (level) {
        case 0:
            return 5;
        case 1:
            return 1.75;
        case 2:
            return 1.5;
        case 3:
            return 1.2;
        case 4:
            return 1;
        default:
            if (level >= 5 && level <= 15) {
                return 0.355;
            }
            return 0;
    }
};

module.exports = getCommissionPercentage;
