const bcrypt = require('bcryptjs');

const db = require('../data/data');

class User {
  constructor(korime, sifra, ime, prezime, email) {
    this.ime = ime;
    this.prezime = prezime;
    this.korime = korime;
    this.email = email;
    this.sifra = sifra;
  }

  // async findByGroup(groupId) {
  //   const [result] = await db.getDb().query('select * from users where groupId = (?)', groupId);
  //   return result;
  // }

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
      hashedPassword
    ];

    await db.getDb().query('insert into korisnici (ime, prezime, korime, email, password) values (?)', [data]);

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
  //
  // async getAllUsers() {
  //   let query = 'select id,name,last_name,groupId from users;'
  //   const [users] = await db.getDb().query(query);
  //   const [groups] = await db.getDb().query('select * from groups_u;');
  //   return {users,groups};
  // }
  //
  // async getAllUsersSolo() {
  //   let query = 'select * from users;'
  //   const [users] = await db.getDb().query(query);
  //   return users;
  // }
  //
  // async getUserPrivs (input) {
  //   const [response] = await db.getDb().query('select u.name, u.last_name as "last name",p.naziv as privilegije from userPrava up join users u on up.user_id = u.id join prava p on up.prava_id = p.id where u.email = (?);', input);
  //   return response[0];
  // }
}

module.exports = User;