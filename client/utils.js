const noop = (() => {});

function regexpEscape(str) {
  return str.replace(/([\^*\/+{}\[\]])/g, '\\$1');
}

function attrGetterSetter(target, name, get, set = noop) {
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
  regexpEscape,
  attrGetterSetter,
  capitalize
};
