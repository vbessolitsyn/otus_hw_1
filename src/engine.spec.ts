import { applyOp, isNumber, evaluate, lastFrom } from './engine';

test('test applyOp', () => {
  expect(applyOp('*', 2, 3)).toEqual(6);
  expect(applyOp('/', 6, 3)).toEqual(2);
  expect(applyOp('+', 2, 1)).toEqual(3);
  expect(applyOp('-', 4, 1)).toEqual(3);
});

test('test isNumber', () => {
  expect(isNumber('1')).toEqual(true);
  expect(isNumber('0')).toEqual(true);
  expect(isNumber('-1')).toEqual(true);
  expect(isNumber('2.4')).toEqual(true);
  expect(isNumber('test')).toEqual(false);
  expect(isNumber('12test')).toEqual(false);
  expect(isNumber([1].toString())).toEqual(true);
  expect(isNumber({ 1: 1 }.toString())).toEqual(false);
});

test('test lastFrom', () => {
  expect(lastFrom('1 * 2 * 3', ['*', '/'])).toEqual(['*', 6]);
  expect(lastFrom('1 * 2 / 3', ['*', '/'])).toEqual(['/', 6]);
  expect(lastFrom('1 + 2 * 3 / 5', ['*', '/'])).toEqual(['/', 10]);

  expect(lastFrom('1 * 2 * 3', ['test'])).toBeUndefined();
  expect(lastFrom('1 / 2 * 3', [])).toBeUndefined();
  expect(lastFrom('1 + 2 * 3 / 5', ['$', '%'])).toBeUndefined();
});

test('test evaluate', () => {
  expect(evaluate('1 + 2')).toEqual(3);
  expect(evaluate('2 * 3')).toEqual(6);
  expect(evaluate('9 / 3')).toEqual(3);
  expect(evaluate('9 - 3')).toEqual(6);
  // test order
  expect(evaluate('3 + 2 - 3')).toEqual(2);
  expect(evaluate('2 * 3 - 1')).toEqual(5);
  expect(evaluate('10 - 2 * 3 ')).toEqual(4);
  expect(evaluate('8 / 4 * 3')).toEqual(6);
  expect(evaluate('9 * 2 / 3')).toEqual(6);
  expect(evaluate('9 - 3 * 2')).toEqual(3);
  expect(evaluate('2 + 2 * 2')).toEqual(6);
  expect(evaluate('2 + 2 * 2 + 2 / 2')).toEqual(7);
  expect(evaluate('1 + 2 * 3 + 3 * 2 - 2 * 3 - 1')).toEqual(6);
  // test not ordinary expressions
  expect(evaluate('11')).toEqual(11);
  expect(evaluate('-11')).toEqual(-11);
  expect(evaluate('1.3')).toEqual(1.3);
  expect(evaluate('0')).toEqual(0);
  expect(evaluate('-')).toEqual(0);
  expect(evaluate(Infinity.toString())).toEqual(Infinity);
  // exceptions
});
