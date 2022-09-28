const inputValidation = (name, value, initValue, sifra = '', selectPw = () =>{}) => {
  const data = {};
  if (name === 'email') {
    if (/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
      data.error=false; data.message=`${name}`;
    } else {
      data.error=true; data.message='Unesite validan email!';
    }
  } else if (name === 'sifra' || name === 'sifra_sign') {
    if (value.length >= 3 && /^.+$/ig.test(value)) {
      data.error=false; data.message=`${name}`;
    } else {
      data.error=true; data.message='Unesite validnu sifru (3 ili vise karaktera)!';
    }
  } else if (name === 'potvrdasifra') {
    if (sifra.length === 0) {
      selectPw();
      return;
    }
    if (value.length >= 3 && (/^.+$/ig.test(value)) && value === sifra) {
      data.error=false; data.message=`${name}`;
    } else if (value.length >= 3 && value !== sifra) {
      data.error=true; data.message=`Sifre se ne poklapaju`;
    } else {
      data.error=true; data.message='Unesite validnu sifru (3 ili vise karaktera)!';
    }
  } else if (name === 'korime' || name === 'sign_korime') {
    if (value.length >= 3 && /^\S+$/ig.test(value)) {
      data.error=false; data.message=`${name}`;
    } else  {
      data.error=true; data.message=`Unesite validno korisnicko ime (3 ili vise karaktera  bez razmaka)!`;
    }
  } else if (name === 'postanski_broj') {
    if (value.length >= 3 && /^.+$/ig.test(value)) {
      data.error=false; data.message=`${name}`;
    } else  {
      data.error=true; data.message=`Unesite validan postanski broj (3 ili vise karaktera)!`;
    }
  } else {
    if (value.length >= 3 && (/^[a-z]+\s[a-z]+$/ig.test(value) || /^[a-z]+$/ig.test(value) || /^[a-z]+\s[a-z]+\s[a-z]+$/ig.test(value))) {
      data.error=false; data.message=`${name}`;
    } else  {
      data.error=true;
      if (name === 'grad') {
        data.message='Unesite validno ime grada (3 ili vise slova)!';
      } else if (name === 'drzava') data.message='Unesite validno ime drzave (3 ili vise slova)!';
      else data.message=`Unesite validno ${name} (3 ili vise slova)!`;
    }
  }
  if (value.length === 0) {
    data.error = true; data.message = ''; data.edited = initValue.length > 0;
  } else if (value === initValue) {
    data.error = true; data.message = ''; data.edited = false;
  } else data.edited = true;
  return {error: data.error, message: data.message, edited: data.edited};
}

module.exports = {inputValidation: inputValidation}