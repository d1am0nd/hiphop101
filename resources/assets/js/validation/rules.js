const gte = (input, min) => input.length >= min;
const lte = (input, max) => input.length <= max;

const textBetween = (input, min, max) => gte(input, min) && lte(input max);

export {
  gte,
  lte,
  textBetween,
};
