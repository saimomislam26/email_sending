const { Schema, model } = require('mongoose');

const emailSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    pending: {
        type: Boolean,
        required: true
    }

})



const List = model('list', emailSchema);

module.exports.List = List;