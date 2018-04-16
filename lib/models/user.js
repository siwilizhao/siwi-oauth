const mongoose = require('mongoose')
const Schema = mongoose.Schema

const crypto = require('crypto')

const Table = new Schema({
    display_name: {
        type: String,
        default: 'User',
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    remember_token: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    email_bind: {
        type: Number,
    },
    phone: {
        type: String,
        unique: true,
        index: true
    },
    phone_bind: {
        type: Number,
    },
    avatar: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        enum: ['man', 'female'],
        default: 'man'
    },
    city: {
        type: String,
        default: null
    },
    unionid: { 
        type: String,
    },
    openid: {
        type: String,
    }
})

/**
 * 密码写入加密
 */

Table.path('password').set(password => crypto.createHash('md5').update(password).digest('hex'))

/**
 * 虚拟字段 头像
 */
Table.virtual('avatar_img').get(() => 'https://semantic-ui.com/images/avatar2/large/matthew.png')

/**
 * 检测密码
 */

Table.statics.check_password = async (username, password) => {
    let user = await User.findOne({
        username: username,
        password: crypto.createHash('md5').update(password).digest('hex')
    })
    return user
}
module.exports = mongoose.model('User', Table, 'oauth_auth_codes')