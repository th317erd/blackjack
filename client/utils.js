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

function capitalize(str) {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
}

function pending(func, _opts) {
  var opts = _opts && _opts.valueOf();
  if (typeof opts === 'string')
    opts = { id: opts };
  else if (typeof opts === 'number')
    opts = { time: opts };

  if (!opts.id)
    opts.id = ('' + func);

  if (opts.time == null)
    opts.time = 15;

  if (pendingTimers[id])
    clearTimeout(pendingTimers[id]);

  pendingTimers[id] = setTimeout(() => {
    pendingTimers[id] = null;
    func();
  }, opts.time);
}

module.exports = {
  regexpEscape,
  attrGetterSetter,
  capitalize
};
