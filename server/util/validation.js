function isEmpty(value) {
  return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password) {
  return (
    email && email.includes('@') && password && password.trim().length >= 6
  );
}

function userDetailsAreValid(ime, prezime, korime, email, sifra) {
  return (
    userCredentialsAreValid(email, sifra) &&
    !isEmpty(ime) &&
    !isEmpty(prezime) &&
    !isEmpty(korime)
  );
}

function passwordIsConfirmed(sifra, potvrdasifra) {
  return sifra === potvrdasifra;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  passwordIsConfirmed: passwordIsConfirmed,
};