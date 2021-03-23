const generateServiceCode = (nums) => {
  // thanks General Assembly for the algo homework.
  if (Array.isArray(nums)) {
    return nums.join('').replace(/^(\d{3})(\d{3})$/, `$1-$2`);
  } else {
    return nums.toString().replace(/^(\d{3})(\d{3})$/, `$1-$2`);
  }
};

const getRandomInt = (min, max) => {
  // https://stackoverflow.com/questions/3437133/javascript-generate-a-random-number-that-is-9-numbers-in-length/3437180
  return Math.floor(Math.random() * (max - min)) + min;
}; //The maximum is exclusive and the minimum is inclusive

export const getServiceCode = () => {
  const num = getRandomInt(100000, 999999);
  const result = generateServiceCode(num);
  return result;
};
