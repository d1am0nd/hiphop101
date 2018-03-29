const heading = (renderer) => (text, level, raw) => {
  ++level;
  level = level > 6 ? 6 : level;
  return `<h${level}>${text}</h${level}>`;
};

export default heading;
