const noop = (() => {}),
      pendingTimers = {};

function regexpEscape(str) {
  return str.replace(/([\^*\/+{}\[\]])/g, '\\$1');
}

function attrGetterSetter(target, name, get, set = noop, enumerable = false) {
  Object.defineProperty(target, name, {
    enumerable,
    configurable: true,
    get,
    set
  });
}

function toNumber(_num, defaultValue) {
  var num = parseFloat(('' + _num).replace(/[^\d.-]/g, ''));
  if (isNaN(num) || !isFinite(num))
    return defaultValue;

  return num;
}

function capitalize(str) {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
}

function isObject(data) {
  return (data && data.constructor === Object.constructor);
}

function pending(func, _opts) {
  var opts = _opts && _opts.valueOf(),
      id,
      time;

  if (typeof opts === 'string')
    id = opts;
  else if (typeof opts === 'number')
    time = opts;

  if (!id)
    id = ('' + func);

  if (time == null)
    time = 15;

  if (pendingTimers[id])
    clearTimeout(pendingTimers[id]);

  pendingTimers[id] = setTimeout(() => {
    pendingTimers[id] = null;
    func();
  }, time);
}

module.exports = {
  noop,
  regexpEscape,
  attrGetterSetter,
  toNumber,
  capitalize,
  isObject,
  pending
};
