const db = require('../data/data');

class Odjeljenje {
  constructor(parent, child, naziv, boja) {
    this.parent = parent;
    this.child = child;
    this.naziv = naziv;
    this.boja = boja;
  }

  async getAllOdjeljenja() {
    const [result] = await db.getDb().query('select * from odjeljenja');
    return result;
  }

  async existsAlready() {
    const [result] = await db.getDb().query('select * from odjeljenja where naziv = (?)', this.naziv);
    return result.length;
  }

  async dodajNovoOdjeljenje() {
    const data = [
      this.parent,
      this.child,
      this.naziv,
      this.boja,
    ];

    await db.getDb().query('insert into odjeljenja (parent, child, naziv, boja) values (?)', [data]);
    await db.getDb().query('update odjeljenja set child = 1 where id = (?)', this.parent);
  }
}

module.exports = Odjeljenje;