const getData = (res) => res.data.data;
const getParent = (res) => res.data.parent;
const getErr = (err) => err.response.data.errors;

export {
  getData,
  getParent,
  getErr,
};
