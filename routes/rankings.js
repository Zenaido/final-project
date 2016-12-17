/**
 * Created by LuisZenaidoHernandez on 12/16/16.
 */
/** get rankings **/
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var db = pgp('postgres://LuisZenaidoHernandez@localhost:5432/gamedata');


router.get('/',function (req,res,next) {
    db.any('SELECT * FROM gdata ORDER BY score DESC')
        .then(function (gdata) {
            return res.render('rankings',{title: 'High Scores', gdata: gdata})
        })
        .catch(function (err) {
            return next(err);
        });
});

module.exports = router;