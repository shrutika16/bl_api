const mongoose = require('mongoose');


const schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title: String,
    url:  {
        type: String,
        required: 'URL can\'t be empty'
    },
    description: String,
    meta_data: [mongoose.Schema.Types.Mixed],
    image_name: String,
    full_img_page_url: {
        type: String,
        required: 'URL can\'t be empty'
    },
    data_file: {
        type: String,
        required: 'URL can\'t be empty'
    }
}, {
    tableName: 'memories'
    // timestamps: true
});

module.exports = mongoose.model('memories', schema);