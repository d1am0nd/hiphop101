const name = 'authchanged';
const event = (data) => new CustomEvent(name, {
  detail: data,
});

export {
  name,
  event,
};
