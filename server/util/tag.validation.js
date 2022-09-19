function isEmpty(value) {
  return !value || value.trim() === '';
}

function tagDetailsAreValid(parent, child, naziv, boja) {
  return (
    !isEmpty(parent) &&
    !isEmpty(child) &&
    !isEmpty(naziv) &&
    !isEmpty(boja)
  );
}

module.exports = {
  tagDetailsAreValid: tagDetailsAreValid,
};