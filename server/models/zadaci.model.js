const db = require('../data/data');

class Zadatak {
  constructor(naziv) {
    this.naziv = naziv;
  }

  async getSveZadatke() {
    const [result] = await db.getDb().query('select * from zadaci');
    return result;
  }

  async dodajNoviZadatak() {
    const data = [
      this.naziv,
      '0'
    ];

    await db.getDb().query('insert into zadaci (naziv, status) values (?)', [data]);
  }

}

module.exports = Zadatak;