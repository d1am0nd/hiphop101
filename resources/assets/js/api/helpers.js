const getData = (res) => res.data.data;
const getMeta = (res) => res.data.meta;
const getParent = (res) => res.data.parent;
const getErr = (err) => err.response.data.errors;

export {
  getData,
  getMeta,
  getParent,
  getErr,
};
