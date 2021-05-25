const mongoose=require('mongoose')

const longId  = require("url-unshort")
const longUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
        default:longId.generate
    },
    short: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('LongUrl', longUrlSchema)