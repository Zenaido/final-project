var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var db = pgp('postgres://LuisZenaidoHernandez@localhost:5432/gamedata');


/* GET home page. */
router.get('/', function(req, res, next) {
  db.any('SELECT * FROM gdata ORDER BY score ASC LIMIT 10')
      .then(function (gdata) {
          return res.render('index',{title: 'High Scores', gdata: gdata});
      })
      .catch(function (err) {
      return next(err);
  });
});
router.get('/g',function (req,res,next) {
    var name = req.param('user');
    db.any('SELECT * FROM gdata ORDER BY score DESC LIMIT 10')
        .then(function (gdata) {
            return res.render('chestgame',{title:'High Score',gdata:gdata,user:name});
        })
        .catch(function (err) {
            return next(err);
        });
})
module.exports = router;
