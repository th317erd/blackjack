//const dust = global.dust = require('dustjs');
class Context {
  constructor(values) {
    Object.assign(this, values || {});
  }

  resolve(name) {
    return this[name];
  }
}

const { regexpEscape } = require('./utils');

const valueE = "([e\\d.-]+|\\w+)",
      valueRE = new RegExp(valueE, 'g');

const operators = {
  '*': (lh, rh) => (lh * rh),
  '/': (lh, rh) => (lh / rh),
  '%': (lh, rh) => (lh % rh),
  '+': (lh, rh) => (lh + rh),
  '-': (lh, rh) => (lh - rh)
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
  if (value.match(/[a-zA-Z]/))
    value = state.context.resolve(value);
  else
    value = parseFloat(value);

  return value;
}

function getOp(state) {
  return getRE(/[%*\/+-]{1}/g, state);
}

function operate(lh, op, rh) {
  var opFunc = operators[op];
  if (!opFunc)
    throw new Error(`Unknown operator: ${op}`);

  return opFunc(lh, rh);
}

function solve(state) {
  var lh, op, rh;

  for (var i = state.offset, il = state.data.length; i < il; i = state.offset) {
    if (lh === undefined) {
      lh = getValue(state);
    } else if (op === undefined) {
      op = getOp(state);
    } else {
      rh = getValue(state);
      return operate(lh, op, rh);
    }
  }

  throw new Error('Parsing error');
}

function reduce(_expression, context) {
  var expression = _expression,
      keys = Object.keys(operators);

  keys.forEach((key) => {
    var str = `${valueE}${regexpEscape(key)}${valueE}`;
    expression = expression.replace(new RegExp(str, 'g'), function(m) {
      var offset = arguments[arguments.length - 2],
          data = arguments[arguments.length - 1];

      return solve({ offset, data, context });
    });
  });

  return expression;
}

function calc(_expression, context) {
  var expression = _expression.replace(/\s+/g, '');

  while(1) {
    var found = false;
    expression = expression.replace(/\(([^)]*)\)/g, function(m, group) {
      found = true;
      return reduce(group, context);
    });

    if (!found)
      break;
  }

  return parseFloat(reduce(expression, context));
}

(function(expression) {
  var context = new Context({ x: 0.1, y: 0.5 });
  console.log('Final value: ', calc(expression, context));
})("10 * y + 5");

// global.dust.helpers.calc = function(chunk, context, bodies, params) {


//   var expression = context.resolve(params.expression),
//       state = { offset: 0, value: null };

//    /* logic here */
//    return chunk;
// }
