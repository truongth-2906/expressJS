module.exports = {
  success: (message, data) => {
    return {
      success: true,
      message: message,
      data: data,
    };
  },

  fail: (message, data) => {
    return {
      success: false,
      message: message,
      data: data,
    };
  },
};
