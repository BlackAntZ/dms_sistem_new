const User = require('../models/user.model');
// const authUtil = require('../util/authentication');
const validation = require('../util/validation');
// const sessionFlash = require('../util/session-flash');

async function signup(req, res, next) {
  const enteredData = {
    ime: req.body.ime,
    prezime: req.body.prezime,
    korime: req.body.korime,
    email: req.body.email,
    sifra: req.body.sifra,
    potvrdasifra: req.body.potvrdasifra
  };

  if (
    !validation.userDetailsAreValid(
      req.body.ime,
      req.body.prezime,
      req.body.korime,
      req.body.email,
      req.body.sifra
    ) ||
    !validation.passwordIsConfirmed(req.body.sifra, req.body.potvrdasifra)
  ) {
    console.log(enteredData);
  //   sessionFlash.flashDataToSession(
  //     req,
  //     {
  //       errorMessage:
  //         'Provjerite unesene podatke.',
  //       ...enteredData,
  //     },
  //     function () {
  //       res.redirect('/signup');
  //     }
  //   );
  //   return;
  }

  const user = new User(
    req.body.korime,
    req.body.sifra,
    req.body.ime,
    req.body.prezime,
    req.body.email
  );

  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready.email || existsAlready.username) {
      res.json('Korisnik postoji');
      // sessionFlash.flashDataToSession(
      //   req,
      //   {
      //     errorMessage: 'Korisnik vec postoji!',
      //     ...enteredData,
      //   },
      //   function () {
      //     res.redirect('/signup');
      //   }
      // );
      return;
    }

    await user.signup();
    res.json('Korisnik dodan');
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const user = new User(req.body.korime, req.body.sifra);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameUsername();
    // userPrivs = await user.getUserPrivs(req.body.email);
  } catch (error) {
    next(error);
    return;
  }

  // const sessionErrorData = {
  //   errorMessage:
  //     'Pogresan unos, provjerite podatke!',
  //   email: user.email,
  //   password: user.password,
  // };

  // if (existingUser.length === 0) {
  //   sessionFlash.flashDataToSession(req, sessionErrorData, function () {
  //     res.redirect('/login');
  //   });
  //   return;
  // }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    // sessionFlash.flashDataToSession(req, sessionErrorData, function () {
    //   res.redirect('/login');
    // });
    res.json('Sifra se ne poklapa');
  } else {
    res.json('Uspjesno logovanje');
  }
  // if (userPrivs && userPrivs.privilegije === 'admin') {
  //   existingUser.isAdmin = true;
  //   authUtil.createUserSession(req, existingUser, function () {
  //     res.redirect('/admin/admin-main');
  //   });
  // } else {
  //   authUtil.createUserSession(req, existingUser, function () {
  //     res.redirect('/main');
  //   });
  // }
}

function logout(req, res) {
  // authUtil.destroyUserAuthSession(req);
  // res.redirect('/login');
}

module.exports = {
  signup: signup,
  login: login,
  logout: logout,
};