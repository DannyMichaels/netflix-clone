const idMaker = () => () => Math.ceil(Math.random() * 100);

const generateId = idMaker();

/**
 * Takes a number (length) and will return a string.
 * @method makeid
 * @param {Number} length
 * @return {String}
 */
const makeid = (length) => {
  //stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Takes a string and converts it to kebab-case
 * @method toKebabCase
 * @param {String} str
 * @return {String}
 */
const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');

/**
 * Return a random id based on length param.
 * @method getRandomId
 * @param {Number} length
 * @return {string}
 */
export const getRandomId = (length) =>
  toKebabCase(makeid(length)) + generateId();
