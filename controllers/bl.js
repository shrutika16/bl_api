var express = require('express');
var mongoose = require('mongoose');

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

//pagination
const getPagination = (page, size) => {
  const setLimit = size ? +size : 10;
  const setOffset = page ? (page * setLimit) - setLimit  : 0;
  return { setLimit, setOffset };
};

router.get('/list', async (req, res) => {
  // search result
  const searchData = req.query.search ?? '';
  
  const searchDataRegex = new RegExp(searchData, 'i')
  
  const page = req.query.page;
  const size = 10;
  const { setLimit, setOffset } = getPagination(page, size);
  
  memories
    .find(
      {
        $or:
          [
            { title: searchDataRegex },
            { description: searchDataRegex },
            { image_name: searchDataRegex },
            { url: searchDataRegex },
            { 'meta_data.Photographer': searchDataRegex },
            { 'meta_data.Medium' : searchDataRegex },
            { 'meta_data.Date' : searchDataRegex },
            { 'meta_data.Shelfmark' : searchDataRegex },
            { 'meta_data.Item number': searchDataRegex },
            { 'meta_data.Genre' : searchDataRegex },
            { full_img_page_url: searchDataRegex },
            { data_file: searchDataRegex }
          ]
      })
    .limit(setLimit)
    .skip(setOffset)
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