const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schame({
    // 用户id
    access_token_id: {
        type: String,
        required: true
    },
    expires_at: {
        type: Number
    },
    revoked: {
        type: Boolean,
        default: false
    },
})
module.exports = mongoose.model('oauthRefreshTokenModel', Table, 'oauth_refresh_tokens')