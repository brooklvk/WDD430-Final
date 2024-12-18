var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('Resolved path:', path.join(__dirname, '../../dist/ranch/index.html'));

  res.sendFile(path.join(__dirname, '../../dist/ranch/browser/index.html'));
});

module.exports = router;
