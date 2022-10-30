var operations = ['+-', '*/'];

export const applyOp = (val: string, arg1: number, arg2: number): number => {
  switch (val) {
    case '*':
      return arg1 * arg2;
    case '/':
      return arg1 / arg2;
    case '+':
      return arg1 + arg2;
    case '-':
      return arg1 - arg2;
    default:
      throw new Error('Operation ' + val + ' is not implemented');
  }
};

export const lastFrom = (input: string, ops: Array<string>): [string, number] | undefined => {
  if (!Array.isArray(ops) || ops.length < 1) return undefined;

  let result: [string, number] = ['$', Number.NEGATIVE_INFINITY];
  for (let op of ops) {
    let nextIx = input.lastIndexOf(op);
    if (nextIx >= 0 && nextIx > result[1]) result = [op, nextIx];
  }
  if (result[1] === Number.NEGATIVE_INFINITY) return undefined;
  return result;
};

export const isNumber = (val: string): boolean => {
  return val != null && !Array.isArray(val) && !isNaN(+val);
};

export const evaluate = (input: string): number => {
  if (isNumber(input)) return +input;

  for (let op of operations) {
    let nextOp: [string, number] | undefined;

    if (op === '*/') nextOp = lastFrom(input, ['*', '/']);
    if (op === '+-') nextOp = lastFrom(input, ['+', '-']);

    if (nextOp && nextOp[1] >= 0) {
      let leftOp = input.substring(0, nextOp[1] - 1).trim();
      let rightOp = input.substring(nextOp[1] + 1, input.length).trim();
      return applyOp(nextOp[0], evaluate(leftOp), evaluate(rightOp));
    } else {
      Error('Expression ' + input + ' is not valid');
    }
  }

  throw Error('Expression ' + input + ' is not valid');
};
