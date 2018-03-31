const textBetween = ({
  input,
  name,
  min,
  max,
}) => `${name} must be between ${min} and ${max}, currently: ${input.length}`;

const textMin = ({
  input,
  name,
  min,
}) => `${name} must be at least ${min} characters, currently: ${input.length}`;

export {
  textBetween,
  textMin,
};
