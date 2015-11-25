export default (action, condition) => {
  function wrap(fn) {
    return new Promise((resolve) => {
      resolve(fn());
    });
  }

  return wrap(function loop() {
    return wrap(action)
      .then(() => {
        if (condition()) {
          return loop();
        }
      });
  });
};
