/**
 * Created by LuisZenaidoHernandez on 12/16/16.
 */
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var db = pgp('postgres://LuisZenaidoHernandez@localhost:5432/gamedata');
/* GET home page. */
router.get('/', function(req, res, next) {
    db.any('SELECT * FROM gdata ORDER BY score ASC LIMIT 10')
        .then(function (gdata) {
            return res.render('chestgame',{title: 'High Scores', gdata: gdata})
        })
        .catch(function (err) {
            return next(err);
        });
});
router.post('/', function (req,res,next) {
    db.none('INSERT INTO gdata(username,score) VALUES ($1,$2)',[req.body.user,req.body.score])
        .then(function (g) {
            return res.redirect('rankings');
        })
});

module.exports = router;
