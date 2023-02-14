/**
 * Or Bitan 209336916
 * Michael Lipshin 312354491 */

var express = require('express');
var router = express.Router();
const User = require('../module/users')
const Cost = require('../module/costs')

/** This route handler handles POST requests to the /users endpoint */
router.post('/', async function(req, res, next) {

  /** Find the user with the given user ID */
  await User.find({ "id" : req.body.user_id}).then( function (ans){

    if (ans.length < 1) {
      console.log(ans )
      return res.status(400).send('User not found');
    }
    else {
      if ((req.body.year > 1990 && req.body.year < 2024) && (req.body.month > 0 && req.body.month < 13)) {

        /** Check if category is valid */
        const category = req.body.category;
        if (!['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'].includes(category)) {
          return res.status(400).send('Invalid category');
        }

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
          'category': category,
          'sum': req.body.sum
        })
        res.status(200).send('User  found');
      }
      else {
        res.status(400).send('Error');
      }
    }
  }).catch(next);

  });

module.exports = router;
