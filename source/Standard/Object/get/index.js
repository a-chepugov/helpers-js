module.exports = (source, path = '', separator = '.') => (path.split(separator)).reduce(((result = {}, key) => result[key]), source);
