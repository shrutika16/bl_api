var express = require('express');
var mongoose = require('mongoose')

var router = express.Router();

const memories = require('../models/memories');

const HELPER = require('../helper/errorHandler');

router.get('/detail', async (req, res) => {
  let id = req.query.id;
  memories.find({ "_id": mongoose.Types.ObjectId(id) })
    .then(memories => {
      let resarr = HELPER.getResponse({
        success: true,
        data: { memories },
        message: 'featch successfully',
      });
      return HELPER.sendResponse(res, 201, resarr);
    }).catch(err => {
      let resarr = HELPER.getResponse({
        success: false,
        data: [],
        message: err.message || 'memory not Found',
      });
      return HELPER.sendResponse(res, 422, resarr);
    });
});

router.get('/list', async (req, res) => {
  memories.find()
    .then(memories => {
        let resarr = HELPER.getResponse({
          success: true,
          data: { memories },
          message: 'featch successfully',
        });
        return HELPER.sendResponse(res, 422, resarr);
    }).catch(err => {
      let resarr = HELPER.getResponse({
        success: false,
        data: [],
        message:  err.message || 'memory not Found',
      });
    });
});

router.post('/insert_views', async (req, res) => {
    
});

router.post('/insert_downloads', async (req, res) => {
    
});


module.exports = router;