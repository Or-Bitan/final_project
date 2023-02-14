/**
 * Or Bitan 209336916
 * Michael Lipshin 312354491 */

const express = require('express');
const router = express.Router();
const Cost = require('../module/costs');

/** This route handler handles GET requests to the /costs endpoint */
router.get('/', async function (req, res, next) {

    /** Find all costs for the given user ID, year, and month */
    await Cost.find({ user_id: req.query.user_id, year: req.query.year, month: req.query.month })
        .then(function (ans) {
            if (ans.length < 1) {
                /** If no costs are found, return a 400 status code and an error message */
                res.status(400).send('Report not found, Error');
            }
        });

    /** Aggregate costs by category, for the given user ID, year, and month */
    await Cost.aggregate([
        { $match: { 'user_id': Number(req.query.user_id), 'year': Number(req.query.year), 'month': Number(req.query.month) } },
        {
            $group: {
                _id: "$category",
                expenses: {
                    $push: {
                        day: "$day",
                        description: "$description",
                        year: "$year",
                        month: "$month",
                        sum: "$sum"
                    }
                },
                total_cost: { $sum: "$sum" }
            }
        }
    ])
        .then(function (ans) {
            /** Create an object to hold the report, with empty arrays for each category */
            const report = {
                "food": { expenses: [], total_cost: 0 },
                "health": { expenses: [], total_cost: 0 },
                "housing": { expenses: [], total_cost: 0 },
                "sport": { expenses: [], total_cost: 0 },
                "education": { expenses: [], total_cost: 0 },
                "transportation": { expenses: [], total_cost: 0 },
                "other": { expenses: [], total_cost: 0 }
            }

            /** Iterate over the results of the aggregation and add the expenses to the appropriate category array */
            for (let doc of ans) {
                report[doc["_id"]].expenses = doc["expenses"];
                report[doc["_id"]].total_cost = doc["total_cost"];
            }
            /** Send the report object as the response */
            res.send(report)

        })
        .catch(err => res.send(err));
});

module.exports = router;
