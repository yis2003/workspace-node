const { Common } = require('../common.ts');

let a = 10;
let b = 20;

test('sum of a and b', () => {
    console.log(`The sum of ${a} and ${b} is: ${Common.sum(a, b)}`);
    expect(Common.sum(a, b)).toBe(30);
});

test('difference of a and b', () => {
    console.log(`The difference of ${a} and ${b} is: ${Common.minus(a, b)}`);
    expect(Common.minus(a, b)).toBe(-10);
}); 

