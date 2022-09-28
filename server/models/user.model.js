const bcrypt = require('bcryptjs');

const db = require('../data/data');

class User {
  constructor(korime, sifra, ime, prezime, email, grad, postanski_broj, drzava, datum_rodj) {
    this.ime = ime;
    this.prezime = prezime;
    this.korime = korime;
    this.email = email;
    this.sifra = sifra;
    this.grad = grad;
    this.postanski_broj = postanski_broj;
    this.drzava = drzava;
    let today = ''
    if (datum_rodj && datum_rodj.length > 0) {
      const split = datum_rodj.split('/');
      today = `${split[2]}-${split[1]}-${split[0]}`;
    }
    this.datum_rodj = today;
  }

  async getUserWithSameEmail() {
    const [result] = await db.getDb().query('select * from korisnici where email = (?)', this.email);
    return result[0];
  }

  async getUserWithSameUsername() {
    const [result] = await db.getDb().query('select * from korisnici where korime = (?)', this.korime);
    return result[0];
  }

  async existsAlready() {
    const existingEmail = await this.getUserWithSameEmail();
    const existingUsername = await this.getUserWithSameUsername();
    return {email: existingEmail !== undefined, username: existingUsername !== undefined};
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.sifra, 12);

    const data = [
      this.ime,
      this.prezime,
      this.korime,
      this.email,
      hashedPassword,
      this.grad,
      this.postanski_broj,
      this.drzava,
      this.datum_rodj
    ];

    await db.getDb().query('insert into korisnici (ime, prezime, korime, email, password, grad, postanski_broj, drzava, datum_rodj) values (?)', [data]);

  }

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.sifra, hashedPassword);
  }

  // async getUserByName(input) {
  //   const [result] = await db.getDb().query('select id,name,last_name from users where name like (?)', input + '%');
  //   return result;
  // }
  //
  // async getUserByTask(input) {
  //   const output = {data:{}};
  //   const [replace] = await db.getDb().query('select u.user_id, t.name as taskName, u.task_id, u.level, u.active, u.priv_id, k.name, k.last_name, p.naziv from userPrivTask u join users k on u.user_id = k.id  join privilegije p on u.priv_id = p.id join tasks t on t.id = u.task_id where task_id = (?);', input);
  //   for (const replaceElement of replace) {
  //     const currentElement = `${replaceElement.user_id}-${replaceElement.task_id}`;
  //     if (!output.data[currentElement]) output.data[currentElement] = {};
  //     output.data[currentElement].user_id = replaceElement.user_id;
  //     output.data[currentElement].task_id = replaceElement.task_id;
  //     output.data[currentElement].level = replaceElement.level;
  //     output.data[currentElement].name = replaceElement.name;
  //     output.data[currentElement].last_name = replaceElement.last_name;
  //     if (!output.data[currentElement].priv) {
  //       output.data[currentElement].priv = [];
  //     }
  //
  //     output.data[currentElement].priv.push(
  //       {
  //         id: replaceElement.priv_id,
  //         active: replaceElement.active,
  //         naziv: replaceElement.naziv
  //       });
  //   }
  //   output.taskName = replace[0].taskName;
  //   return output;
  // }

  updateUserData(id, fields, values) {
    let query = `update korisnici set ${fields.map(field => {
      return `${field} = (?)`
    })} where id = (?);`;
    db.getDb().query(query, [...values, ...id]);
  }

  async getAllUsers() {
    let query = 'select * from korisnici;'
    const [users] = await db.getDb().query(query);
    const [user_odjeljenja] = await  db.getDb().query('select * from kor_odj');
    return users.map(user => {
      return {...user, odjeljenja: user_odjeljenja.filter(odjeljenje => odjeljenje["korisnik_id"] === user.id)}    });
  }
  //
  // async getUserPrivs (input) {
  //   const [response] = await db.getDb().query('select u.name, u.last_name as "last name",p.naziv as privilegije from userPrava up join users u on up.user_id = u.id join prava p on up.prava_id = p.id where u.email = (?);', input);
  //   return response[0];
  // }
}

module.exports = User;