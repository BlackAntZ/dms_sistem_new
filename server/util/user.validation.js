const FIELDS = ['korime', 'ime', 'prezime', 'email', 'grad', 'postanski_broj', 'drzava', 'datum_rodj', 'id'];

function isValid(name, value) {
  if (!value && typeof value !== 'number') {
    if (value.trim() === '') return false;
  }
  if (name === 'id') return /^\d+$/ig.test(value);
  else if (name === 'email') return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
  else if (name === 'korime' || name === 'sign_korime') return value.length >= 3 && /^\S+$/ig.test(value);
  else if (name === 'postanski_broj') return value.length >= 3 && /^.+$/ig.test(value);
  else return value.length >= 3 && (/^[a-z]+\s[a-z]+$/ig.test(value) || /^[a-z]+$/ig.test(value) || /^[a-z]+\s[a-z]+\s[a-z]+$/ig.test(value));
}

function checkFields(data) {
  let response = {valid: true, fields: [], values: [], id: []}
  for (const dataKey in data) {
    if (!FIELDS.includes(dataKey)) {
      response.valid = false;
    }
    if (!isValid(dataKey, data[dataKey])) {
      response.valid = false;
    }
    if (dataKey === 'id') {
      response.id.push(data[dataKey]);
    } else {
      response.fields.push(dataKey);
      response.values.push(data[dataKey]);
    }
  }

  return response;
}

function userDetailsAreValid(data) {
  return (
    checkFields(data)
  );
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid
};