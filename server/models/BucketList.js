const mongoose = require('mongoose');

const BucketListSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
});

const BucketListItem = mongoose.model('BucketListItem', BucketListSchema);
module.exports = BucketListItem;