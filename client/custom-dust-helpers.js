//const dust = global.dust = require('dustjs');
class Context {
  resolve(name) {
    return this[name];
  }
}

(function(_expression) {
  function getRE(re, offset) {
    re.lastIndex = offset;
    var m = re.exec(expression);

    if (!m || m.index !== offset)
      throw new Error('Parsing error');

    var value = m[0];
    state.offset = offset + value.length;
    state.value = value;

    return value;
  }

  function getValue(offset) {
    // if (expression.charAt(offset) === '(')
    //   return decend(offset + 1);
    var value = getRE(/([e\d.-]+|\w+)/g, offset);

    if (value.match(/[a-zA-Z]/))
      value = context.resolve(value);
    else
      value = parseFloat(value);

    state.value = value;
    return value;
  }

  function getOp(offset) {
    return getRE(/[%*\/+-]{1}/g, offset);
  }

  function getExpression(offset) {
    var lh = getValue(offset),
        op = getOp(state.offset),
        rh = getValue(state.offset);

    state.value = {
      lh,
      op,
      rh
    };
  }

  function operate(exp) {
    var op = operators[exp.op];
    if (!op)
      throw new Error(`Unknown operator: ${op}`);

    return op(exp.lh, exp.rh);
  }

  function decend(offset) {
    for (var i = 0; i < expLen;) {
      getExpression(i);

      var exp = state.value;
      console.log(exp, operate(exp));

      i = state.offset;
    }
  }

  const operators = {
    '*': (lh, rh) => (lh * rh),
    '/': (lh, rh) => (lh / rh),
    '+': (lh, rh) => (lh + rh),
    '-': (lh, rh) => (lh - rh),
    '%': (lh, rh) => (lh % rh)
  };

  var expression = _expression.replace(/\s+/g, ''),
      expLen = expression.length,
      state = { offset: 0, value: null },
      context = new Context();

  context.x = 0.1;
  context.y = 0.5;

  return decend(0);
})("10 * x");


// global.dust.helpers.calc = function(chunk, context, bodies, params) {


//   var expression = context.resolve(params.expression),
//       state = { offset: 0, value: null };

//    /* logic here */
//    return chunk;
// }
