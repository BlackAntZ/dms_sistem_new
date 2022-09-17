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

}

module.exports = Odjeljenje;