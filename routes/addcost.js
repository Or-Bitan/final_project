var express = require('express');
var router = express.Router();
const User = require('../module/users')
const Cost = require('../module/costs')




/* GET users listing. */
router.post('/', async function(req, res, next) {
  await User.find({ "id" : req.body.user_id}).then( function (ans){



    if (ans.length < 1) {
      console.log(ans )
      return res.status(400).send('User not found');

    }
    else {
      if ((req.body.year > 1990 && req.body.year < 2024) && (req.body.month > 0 && req.body.month < 13)) {

        const year = req.body.year.toString()
        const month = req.body.month.toString().padStart(2, '0');
        const day = req.body.day.toString().padStart(2, '0');
        const hour = new Date().getHours().toString().padStart(2, '0');
        const minute = new Date().getMinutes().toString().padStart(2, '0');
        const second = new Date().getSeconds().toString().padStart(2, '0');

        const cost_id = year + month + day + hour + minute + second;

        Cost.create({
          'user_id': req.body.user_id,
          'year': req.body.year,
          'month': req.body.month,
          'day': req.body.day,
          'id': cost_id,
          'description': req.body.description,
          'category': req.body.category,
          'sum': 123
        })
        res.status(200).send('User  found');
      }
      else {
        res.status(400).send('Error');
      }
    }
  }).catch(next);

 // if (user.length <= 1) return res.status(400).send('User not found');


  //const now = new Date();
  //const costId = '${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}';


  });



module.exports = router;
