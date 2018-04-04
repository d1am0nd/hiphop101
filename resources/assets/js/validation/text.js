const textBetween = ({
  input,
  name,
  min,
  max,
}) => `${name} must be between ${min} and ${max}, currently: ${
  input ? input.length : 0
}`;

const textMin = ({
  input,
  name,
  min,
}) => `${name} must be at least ${min} characters, currently: ${
  input ? input.length : 0
}`;

export {
  textBetween,
  textMin,
};
