const roundToTwo = async (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

module.exports = roundToTwo;
