const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schema({
    // 用户id
    user_id: {
        type: String
    },
    // 客户端id
    client_id: {
        type: String
    },
    // 作用域
    scopes: {
        type: Array
    },
    //是否过期
    revoked: {
        type: Boolean,
        default: false
    },
    // 过期时间
    expires_at: {
        type: Number
    }
})
module.exports = mongoose.model('oauthAuthCodesModel', Table, 'oauth_auth_codes')