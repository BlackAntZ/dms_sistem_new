function getAllUsers(req, res, next) {
  try {
    res.json({users: [{id: '1', name: 'Dejan', last_name:'Bajic', email: 'dejanbajich@gmail.com', odjeljenja: [{id:'6', boja:'#25D366', trajanje: '10/10/2022'}]},
        {id: '2', name: 'Simo', last_name:'Gajic', email: 'ismoliktar@gmail.com', odjeljenja: [{id:'7', boja:'#09B83E', trajanje: '10/10/2022'}]},
        {id: '3', name: 'Simeun', last_name:'Setpic', email: 'js123@gmail.com', odjeljenja: [{id:'8', boja:'#00B489', trajanje: '10/10/2022'}]},
        {id: '4', name: 'Konstantin', last_name:'Sukalo', email: 'psapt4@hotmail.com', odjeljenja: [{id:'9', boja:'#E4405F', trajanje: '10/10/2022'}]},
        {id: '5', name: 'Ermolaj', last_name:'Maric', email: 'ermomar@protonmain.com', odjeljenja: [{id:'10', boja:'#131418', trajanje: '10/10/2022'}]},
        {id: '6', name: 'Aleksej', last_name:'Ljuboja', email: 'aleks@gmail.com', odjeljenja: [{id:'6', boja:'#25D366', trajanje: ''},{id:'7', boja:'#09B83E', trajanje: ''}]},
        {id: '7', name: 'Pero', last_name:'Jokic', email: 'joker@joker.com', odjeljenja: [{id:'7', boja:'#09B83E', trajanje: ''},{id:'8', boja:'#00B489', trajanje: ''}]},
        {id: '8', name: 'Stevo', last_name:'Micic', email: 'mikara@gmail.com', odjeljenja: [{id:'8', boja:'#00B489', trajanje: ''},{id:'9', boja:'#E4405F', trajanje: ''}]},
        {id: '9', name: 'Marko', last_name:'Sekulovic', email: 'pekara@gmail.com', odjeljenja: [{id:'9', boja:'#E4405F', trajanje: ''},{id:'10', boja:'#131418', trajanje: ''}]},
        {id: '10', name: 'Artemije', last_name:'Stupar', email: 'atrsos@gmail.com', odjeljenja: [{id:'6', boja:'#25D366', trajanje: ''},{id:'10', boja:'#131418', trajanje: ''},{id:'17', boja:'#131418', trajanje: ''}]},
        {id: '11', name: 'Pelagije', last_name:'Stevanic', email: 'stevo@gmail.com', odjeljenja: [{id:'7', boja:'#09B83E', trajanje: ''},{id:'9', boja:'#E4405F', trajanje: ''}]}
      ], tags: [{id: '1', parent: '0', child: '6', naziv: 'Rukovodstvo', boja: '#1877F2'},
        {id: '2', parent: '0', child: '7', naziv: 'Finansije', boja: '#BD081C'},
        {id: '3', parent: '0', child: '8', naziv: 'Ljudski Resursi', boja: '#DA552F'},
        {id: '4', parent: '0', child: '9', naziv: 'Menadzment', boja: '#FF6600'},
        {id: '5', parent: '0', child: '10', naziv: 'Cistoca', boja: '#FFFC00'},
        {id: '6', parent: '1', child: '16', naziv: 'Uprava', boja: '#25D366'},
        {id: '7', parent: '2', child: '0', naziv: 'Porezi', boja: '#09B83E'},
        {id: '8', parent: '3', child: '0', naziv: 'Unutarnji', boja: '#00B489'},
        {id: '9', parent: '4', child: '0', naziv: 'Primjer', boja: '#E4405F'},
        {id: '10', parent: '5', child: '0', naziv: 'Gradska', boja: '#131418'},
        {id: '11', parent: '1', child: '0', naziv: 'Odbor', boja: '#131418'},
        {id: '12', parent: '2', child: '0', naziv: 'Izdaci', boja: '#E4405F'},
        {id: '13', parent: '3', child: '0', naziv: 'Vanjski', boja: '#09B83E'},
        {id: '14', parent: '4', child: '0', naziv: 'Zaposleni', boja: '#00B489'},
        {id: '15', parent: '5', child: '0', naziv: 'Seoska', boja: '#FFFC00'},
        {id: '16', parent: '6', child: '17', naziv: 'Programer', boja: '#131418'},
        {id: '17', parent: '16', child: '0', naziv: 'QA Tester', boja: '#E4405F'}
      ]});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers: getAllUsers,
}