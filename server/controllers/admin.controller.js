const Odjeljenja = require("../models/odjeljenja.model");
const Zadaci = require("../models/zadaci.model");
const User = require('../models/user.model');
const tagValidation = require('../util/tag.validation');
const taskValidation = require('../util/task.validation');
const userValidation = require('../util/user.validation');

async function getAllUsers(req, res, next) {
  const korisnik = new User();
  const odjeljenje = new Odjeljenja();
  try {
    const korisnici = await korisnik.getAllUsers();
    const odjeljenja = await odjeljenje.getAllOdjeljenja();
    res.json({users: korisnici, tags: odjeljenja});
  } catch (error) {
    next(error);
  }
}

const editUserData = async (req, res, next) => {
  const korisnik = new User();
  try{
    const data = userValidation.userDetailsAreValid(req.body);
    if (!data.valid) res.json('Data not valid');
    korisnik.updateUserData(data.id, data.fields, data.values);
    res.json('Dodano');
  } catch (error) {
    next(error);
  }
}

const postNewTag = async (req, res, next) => {
  if (!tagValidation.tagDetailsAreValid(
      req.body.parent,
      req.body.child,
      req.body.naziv,
      req.body.boja
    )) {
    console.log('Data not valid');
  }

  const odjeljenje = new Odjeljenja(
    req.body.parent,
    req.body.child,
    req.body.naziv,
    req.body.boja
  );
  try {
    const existsAlready = await odjeljenje.existsAlready();

    if (existsAlready > 0) {
      res.json('Odjeljenje postoji');
      return;
    }
    await odjeljenje.dodajNovoOdjeljenje();
    res.json('Uspjesno dodano');
  } catch (error) {
    next(error);
  }
}

const postNewTask = async (req, res, next) => {
  if (!taskValidation.taskDetailsAreValid(
    req.body.naziv
  )) {
    console.log('Data not valid');
  }

  const zadatak = new Zadaci(
    req.body.naziv
  );
  try {
    await zadatak.dodajNoviZadatak();
    res.json('Uspjesno dodano');
  } catch (error) {
    next(error);
  }
}

async function getAllTasks(req, res, next) {
  const zadatak = new Zadaci();
  try {
    const data = await zadatak.getSveZadatke();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers: getAllUsers,
  editUserData: editUserData,
  postNewTag: postNewTag,
  postNewTask: postNewTask,
  getAllTasks: getAllTasks
}