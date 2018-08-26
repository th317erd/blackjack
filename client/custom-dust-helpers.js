//const dust = global.dust = require('dustjs-linkedin');
const { regexpEscape } = require('../common/utils');

const CustomMath = (function() {
  var CustomMath = {
        getContextVariables: () => contextVariables,
        safe: (value) => {
          return (isNaN(value) || !isFinite(value)) ? 0 : value;
        }
      },
      contextVariables = {
        DTR: Math.PI / 180,
        RTD: 180 / Math.PI
      },
      keys = Object.getOwnPropertyNames(Math);

  for (var i = 0, il = keys.length; i < il; i++) {
    var key = keys[i],
        value = Math[key];

    if (!value)
      continue;

    if (typeof value !== 'function') {
      contextVariables[key] = value;
      continue;
    }

    CustomMath[key] = value;
  }

  return CustomMath;
})();

const valueE = "([\\d.-]+?e-\\d+|[\\d.-]+|\\b[a-zA-Z]+\\b)",
      valueRE = new RegExp(valueE, 'g'),
      strictValueRE = new RegExp('^' + valueE + '$');

const operators = {
  '*': (lh, rh) => (lh * rh),
  '/': (lh, rh) => (lh / rh),
  '%': (lh, rh) => (lh % rh),
  '+': (lh, rh) => (lh + rh),
  '-': (lh, rh) => (lh - rh),
  '^': (lh, rh) => Math.pow(lh, rh)
};

function getRE(re, state) {
  var offset = state.offset;

  re.lastIndex = offset;
  var m = re.exec(state.data);

  if (!m || m.index !== offset)
    throw new Error('Parsing error');

  var value = m[0];
  state.offset = offset + value.length;

  return value;
}

function getValue(state) {
  var value = getRE(valueRE, state);
  if (value.match(/^-?\d/))
    value = parseFloat(value);
  else
    value = state.context[value];

  return value;
}

function getOp(state) {
  return getRE(/[\^%*\/+-]{1}/g, state);
}

function operate(lh, op, rh) {
  var opFunc = operators[op];
  if (!opFunc)
    throw new Error(`Unknown operator: ${op}`);

  return opFunc(lh, rh);
}

function solve(state) {
  var lh, 
      op, 
      rh, 
      step = 0;

  //defaultCardWidth/2

  for (var i = state.offset, il = state.data.length; i < il; i = state.offset) {
    if (step === 0) {
      lh = getValue(state);
      step++;
    } else if (step === 1) {
      op = getOp(state);
      step++;
    } else {
      rh = getValue(state);
      return operate(lh, op, rh);
    }
  }

  throw new Error('Parsing error');
}

function reduce(_expression, context) {
  var expression = _expression;

  // Is this a value all by itself?
  strictValueRE.lastIndex = 0;
  if (strictValueRE.test(expression))
    return parseFloat(getValue({ offset: 0, data: expression, context }));

  // No, do some math...
  var keys = Object.keys(operators);
  keys.forEach((key) => {
    var str = `${valueE}${regexpEscape(key)}${valueE}`;
    expression = expression.replace(new RegExp(str, 'g'), function(m) {
      var offset = arguments[arguments.length - 2],
          data = arguments[arguments.length - 1];

      return solve({ offset, data, context });
    });
  });

  return parseFloat(expression);
}

function calc(_expression, context) {
  var expression = _expression.replace(/\s+/g, '');

  while(1) {
    var found = false;
    expression = expression.replace(/([a-z]+)?\(([^()]*)\)/g, function(m, func, group) {
      found = true;
      var value = reduce(group, context);
      return (func) ? CustomMath[func](value) : value;
    });

    if (!found)
      break;
  }

  return reduce(expression, context);
}

// (function(expression) {
//   var context = new Context(Object.assign({ x: 0.1, y: 0.5, PI: Math.PI,  }, CustomMath.getContextVariables()));
//   console.log('Final value: ', calc(expression, context));
// })("sin(DTR * 30)^2");

function render(what, chunk, context) {
  if (typeof what === "function") {
    var output = '';

    chunk.tap(function(data) {
      output += data;
      return '';
    }).render(what, context).untap();

    return output;
  } else {
    return what || '';
  }
}

function filteredObj(obj) {
  if (!obj)
    return {};

  var newObj = {},
      keys = Object.keys(obj);

  for (var i = 0, il = keys.length; i < il; i++) {
    var key = keys[i],
        value = obj[key];

    if (typeof value === 'function')
      continue;

    newObj[key.replace(/[^a-zA-Z]+/g, '')] = value;
  }

  return newObj;
}

function mergeStack(stack) {
  if (stack.tail) {
    var last = mergeStack(stack.tail);
    return Object.assign(last, filteredObj(stack.head));
  }

  return filteredObj(stack.head);
}

global.dust.helpers.calc = function(chunk, context, bodies, params) {
  var body = bodies.block;
  if (!body)
    return chunk;

  var state = {},
      keys = context.resolve(params['_order']),
      mathContext = Object.assign(mergeStack(context.stack), CustomMath.getContextVariables());

  if (keys && typeof keys.valueOf() === 'string')
    keys = keys.split(/\s*,\s*/g);

  if (!keys)
    keys = Object.keys(params);

  for (var i = 0, il = keys.length; i < il; i++) {
    var key = keys[i];
    if (key.charAt(0) === '_')
      continue;

    var expression = context.resolve(params[key]),
        value = calc('' + expression, mathContext);

    state[key] = mathContext[key] = value;
  }

  if (params['_debug'])
    console.log('Calc output [' + params._debug + ']: ', state);

  return chunk.render(body, context.push(state));
}
