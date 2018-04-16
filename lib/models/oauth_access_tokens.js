const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schema({
    // 用户id
    user_id: {
        type: String
    },
    // 客户端ID
    client_id: {
        type: String
    },
    // 客户端名称
    name: {
        type: String
    },
    // 作用域
    scopes: {
        type: Array
    },
    // 是否过期
    revoked: {
        type: Boolean,
        default: false
    },
    // 过期时间
    expires_at: {
        type: Number
    },
    // 创建时间
    created_at: {
        type: Number
    },
    // 更新时间
    updated_at: {
        type: Number
    }
})
module.exports = mongoose.model('oauthAccessTokensModel', Table, 'oauth_access_tokens')