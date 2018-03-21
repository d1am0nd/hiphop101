const getData = (res) => res.data.data;
const getErr = (err) => err.response.data.errors;

export {
  getData,
  getErr,
};
