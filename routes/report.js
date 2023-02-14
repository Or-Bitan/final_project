var express = require('express');
var router = express.Router();
const user = require('../module/users')
const cost = require('../module/costs')
/* GET home page. */
router.get('/',
    async function (req, res, next) {
   await cost.find({user_id:req.query.user_id}).then(function(ans) {if(ans<1){
       res.status(400).send('User not found, Error');

   }});

       await cost.aggregate([
            {$match: {'user_id':Number(req.query.user_id)}},
            {
                $group: {
                    _id: "$category",
                    expenses: {
                        $push: {
                            day: "$day",
                            description: "$description",
                            year:"$year",
                            month:"$motnh",
                            day:"$day",
                            sum: "$sum"
                        }
                    }
                }
            }

        ]).then(function (ans) {
            const report = {
                "food": [],
                "health": [],
                "housing": [],
                "sport": [],
                "education": [],
                "transportation": [],
                "other": []
            }

            for (let doc of ans) {
                report[doc["_id"]] = doc["expenses"]
                console.log(doc)
            }
            res.send(report)

        }).catch(err => res.send(err))

        // if(ans.length>= 1){

        /*  cost.create({
              "user_id": 123,
              "year": 1992,
              "month": 12,
              "day": 3,
              "description": "asdasdasd",
              "sum": 123,
              "category":"food"
          }).then().catch(err => console.log(err));
      }
      else{
          console.log(req.body);

      }
  }).catch(err => res.end(err))
});
*/

    });

module.exports = router;