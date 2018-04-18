const OauthClients = require('./models/oauth_clients')
const OauthAuthCodes = require('./models/oauth_auth_codes')
const OauthAccessTokens = require('./models/oauth_access_tokens')
const OauthRefreshTokens = require('./models/oauth_refresh_tokens')
const OauthPersonalAccessClients = require('./models/oauth_personal_access_clients')
const unique = require('siwi-uniquestring')
class Oauth {
    constructor() {
    }
    /**
     * 创建客户端
     * @param {*} user_id 
     * @param {*} name 
     * @param {*} redirect 
     * @param {*} personal_access_client 
     * @param {*} password_client 
     * @param {*} desc 
     */
    async createClient(user_id, name, redirect, desc, personal_access_client = false, password_client = false) {
        const data = {
            user_id: user_id,
            name: name,
            redirect: redirect,
            desc: desc,
            secret: await unique.random(64),
            personal_access_client: personal_access_client,
            password_client: password_client
        }
        const res = await OauthClients.create(data)
        return res
    }

    /**
     * 修改客户端
     * @param {*} id 
     * @param {*} name 
     * @param {*} redirect 
     * @param {*} desc 
     */
    async updateClient(id, name, redirect, desc) {
        const update = {
            name: name,
            redirect: redirect,
            desc: desc
        }
        const res = await OauthClients.findByIdAndUpdate(id, update)
        return res
    }

    /**
     * 删除客户端
     * @param {String} id client_id
     */
    async deleteClient(id) {
        const res = await OauthClients.findByIdAndRemove({
            _id: id
        })
        return res
    }

    /**
     * 获取客户端
     * @param {*} page 
     * @param {*} size 
     * @param {*} conditions 
     */
    async getClients(page, size, conditions) {
        const count = await OauthClients.count(conditions).lean()
        const data = await OauthClients.find(conditions).skip((page - 1) * size).limit(size)
        const pager = await this.getPage(count, page, size)
        return {
            data: data,
            pager: pager
        }
    }

    /**
     * 获取客户端
     * @param {*} id 
     */
    async getClientById(id) {
        const res = await OauthClients.findById({
            '_id': id
        }).lean()
        return res
    }

    /**
     * 生成code
     * @param {String} user_id 用户ID
     * @param {String} client_id 客户端ID
     * @param {Array} scopes 作用域
     * @param {Number} expires_at 过期时间
     */
    async createCode(user_id, client_id, scopes, expires_at) {
        const data = {
            user_id: user_id,
            client_id: client_id,
            scopes: scopes,
            revoked: true,
            expires_at: expires_at
        }
        const res = await OauthAuthCodes.create(data)
        return res
    }

    /**
     * 获取客户端详情
     * @param {*} id 
     */
    async getCodeById(id) {
        const res = await OauthAuthCodes.findById({
            '_id': id
        }).lean()
        return res
    }

    /**
     * 根据code获取用户信息
     * @param {*} code 
     */
    async getUserByCode(code) {
        const code = await this.getCodeById(code)
        const user_id = code['user_id']
        const res = await this.getUserById(user_id)
        return res
    }

    /**
     * 根据code获取客户端信息
     * @param {*} code 
     */
    async getClientByCode(code) {
        const code = await this.getCodeById(code)
        const client_id = code['client_id']
        const res = await this.getClientById(user_id)
        return res
    }

    /**
     * 创建access_token
     * @param {*} user_id 
     * @param {*} client_id 
     * @param {*} name 
     * @param {*} scopes 
     * @param {*} expires_at 
     */
    async createAccessToken(user_id, client_id, name, scopes, expires_at) {
        const data = {
            user_id: user_id,
            client_id: client_id,
            name: name,
            scopes: scopes,
            expires_at: expires_at,
        }

        const res = await OauthAccessTokens.create(data)

        return res
    }

    /**
     * 更新AccessToken
     * @param {*} id 
     * @param {*} expires_at 
     */
    async updateAccessToken(id, expires_at) {
        const update = {
            expires_at: expires_at,
        }
        const res = await OauthAccessTokens.findByIdAndUpdate({
            _id: id
        }, update)

        return res
    }

    /**
     * 获取access_token 信息
     * @param {String} id access_token_id
     */
    async getAccessTokenById(id) {
        const res = await OauthAccessTokens.findById({
            _id: id
        }).lean()
        return res
    }

    /**
     * 根据access_token_id 获取用户信息
     * @param {String} id 根据access_token_id
     */
    async getUserByAccessTokenId(id) {
        const access_token = await this.getAccessTokenById(id)
        const user_id = access_token['user_id']
        const res = await this.getUserById(user_id)
        return res
    }

    /**
     * 根据access_token_id 获取客户端信息
     * @param {String} id 根据access_token_id
     */
    async getClientByAccessTokenId(id) {
        const access_token = await this.getAccessTokenById(id)
        const client_id = access_token['client_id']
        const res = await this.getClientById(client_id)
        return res
    }

    /**
     * 创建refesh_token 
     * @param {String} access_token_id access_token_id
     * @param {Number} expires_at 过期时间
     */
    async createRefreshToken(access_token_id, expires_at) {
        const data = {
            access_token_id: access_token_id,
            expires_at: expires_at,
        }
        const res = await OauthAccessTokens.create(data)
        return res
    }

    /**
     * 根据id 获取refresh_token
     * @param {String} id refresh_token_id
     */
    async getRefreshTokenById(id) {
        const res = await OauthAccessTokens.findById({
            _id: id
        }).lean()
        return res
    }

    /**
     * 根据refresh_token 更新access_token
     * @param {*} id refresh_token_id
     * @param {*} expires_at 过期时间
     */
    async updateAccessTokenByRefreshTokenId(id, expires_at) {
        const refresh_token = await this.getRefreshTokenById(id)
        const access_token_id = refresh_token['access_token_id']
        const update = {
            expires_at: expires_at,
        }
        const res = await OauthAccessTokens.findByIdAndUpdate({
            _id: access_token_id
        }, update)

        return res
    }

    async getPage (count, page=1, size=50) {
        let total_page = Math.ceil(count / size)
        let pager = {
            total_page: total_page,
            current_page: page,
            per_page: (page - 1) > 1 ? page - 1 : 1,
            next_page: (page+1) < total_page ? page+1 : total_page,
            total_row: count,
            page_size :size
        }
        return pager
    }
}

module.exports = Oauth