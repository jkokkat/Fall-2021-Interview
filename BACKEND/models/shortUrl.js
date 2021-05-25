const mongoose=require('mongoose')

const shortId = require('shortid')
const longId  = require("url-unshort")
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
        default:longId.generate
    },
    short: {
        type: String,
        required: true,
        default:shortId.generate
    }
})
module.exports = mongoose.model('ShortUrl', shortUrlSchema)
