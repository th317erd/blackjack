function attrGetterSetter(target, name, get, set) {
  Object.defineProperty(target, name, {
    enumerable: true,
    configurable: true,
    get,
    set
  });
}

function capitalize(str) {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
}

module.exports = {
  attrGetterSetter,
  capitalize
};
