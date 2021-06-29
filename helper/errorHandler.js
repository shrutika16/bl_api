const getServerError = (message, key = null, value = null) => {
  return [
    {
      message,
      key,
      value,
    },
  ];
};

const sendResponse = (res, status, data, options = {}) => {
  return res.status(status).send(data);
};

const getResponse = (obj) => {
  const { success = false, data = [], errors = [], message = '' } = obj;
  return {
    success: success,
    data: data,
    errors: errors,
    message: message,
  };
};

const getValidationError = (err) => {
  console.log(err);
  let errors = err.details.map((error) => {
    return {
      message: error.message || null,
      key: error.context.key || null,
      value: error.context.value || null,
    };
  });

  return errors;
};

module.exports = {
  getServerError,
  sendResponse,
  getResponse,
  getValidationError,
};
