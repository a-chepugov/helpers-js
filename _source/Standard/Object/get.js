export default (path = '', source, separator = '.') => (path.split(separator)).reduce(((result = {}, key) => result[key]), source);
