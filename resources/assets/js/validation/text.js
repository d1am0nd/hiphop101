const textBetween = ({
  input,
  name,
  min,
  max,
}) => `${name} must be between ${min} and ${max}, currently: ${input.length}`;

export {
  textBetween,
};
