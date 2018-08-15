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

function diffObjectChanges(_a, _b, parentKey, diffReport = [], alreadyVisited = []){
  var a = _a, 
      b = _b;

  // if a or b is empty
  if (a == null || b == null){
    diffReport.push({type: 'value', key: parentKey, aValue: a, bValue: b });
    return diffReport;
  } 

  // return the primive value
  a = a.valueOf();
  b = b.valueOf();

  // if either is primitive see if they're the same
  if((['string', 'number', 'boolean'].indexOf(typeof a) >= 0 || 
      ['string', 'number', 'boolean'].indexOf(typeof b) >= 0) && 
      a !== b) {
    diffReport.push({type: 'value', key: parentKey, aValue: a, bValue: b }); 
    return diffReport;
  }

  // check if array has been checked already
  if( alreadyVisited.indexOf(a) >= 0 && alreadyVisited.indexOf(b) >= 0 )
    return;
  
  alreadyVisited.push(a);
  alreadyVisited.push(b);

  // make sure keys are the same (is valid object or array)
  var aKeys = Object.keys(a), 
      bKeys = Object.keys(b),
      keys = Object.keys(aKeys.concat(bKeys).reduce((obj, key) => (obj[key] = obj), {}));
      
  for (var i = 0; i < keys.length; i++ ){
    //keys is the unique keys
    var key = keys[i], 
        aVal = a[key], 
        bVal = b[key];

    // recursion 
    diffObjectChanges(aVal, bVal, (parentKey != null) ? (parentKey + '.' + key) : key, diffReport, alreadyVisited);

  }
  return diffReport;
};

module.exports = {
  noop,
  regexpEscape,
  attrGetterSetter,
  toNumber,
  capitalize,
  isObject,
  pending,
  diffObjectChanges
};
