const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schame({
    // 用户id
    user_id: {
        type: String
    },
    // 名称
    name: {
        type: String,
        required: true,
    },
    // 秘钥
    secret: {
        type: String,
        unique: true
    },
    // 回调
    redirect: {
        type: String
    },
    // 是否私人令牌
    personal_access_client: {
        type: Boolean
    },
    // 是否密码客户端
    password_client: {
        type: Boolean
    },
    // 是否失效
    revoked: {
        type: Boolean,
        default: true
    },
    // 客户端描述 申请理由
    desc: {
        type: String
    },
    // 审核记录
    audit_records: {
        type: Array,
        default: []
    }
})
module.exports = mongoose.model('oauthClientsModel', Table, 'oauth_clients')