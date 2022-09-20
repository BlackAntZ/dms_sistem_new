function isEmpty(value) {
  return !value || value.trim() === '';
}

function taskDetailsAreValid(naziv) {
  return (
    !isEmpty(naziv)
    );
}

module.exports = {
  taskDetailsAreValid: taskDetailsAreValid,
};