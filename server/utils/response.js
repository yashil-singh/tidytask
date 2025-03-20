const response = (success, message, data = []) => {
  return {
    success,
    message: message ?? "Something went wrong. Try again.",
    data,
  };
};

export default response;
