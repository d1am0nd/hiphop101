const name = 'authchanged';
const event = (data) => new CustomEvent(name, {
  detail: data,
});
// Quick hack to fire after the storage has changed
const dispatch = (data) => {
  setTimeout(
    function() {
      window.dispatchEvent(event(data));
    },
    10
  );
};

export {
  name,
  event,
  dispatch,
};
