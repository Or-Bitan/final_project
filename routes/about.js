var express = require('express');
var router = express.Router();


const developers = [
  {
    firstname: 'Michael',
    lastname: 'Lipshin',
    id: '312354491',
    email: 'lipshin@gmail.com'
  },
  {
    firstname: 'Or',
    lastname: 'Bitan',
    id: '209336916',
    email: 'or.bitan72@gmail.com'
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(developers);
})

module.exports = router;
