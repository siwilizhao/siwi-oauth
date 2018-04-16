const oauthAuthCodes = require('../lib/models/oauth_auth_codes')
const expect = require('chai').expect
const mongoose =  require('mongoose')
mongoose.connect('mongodb://192.168.10.10/test');
describe('oauth_auth_codes.js', () => {
    it('', async () => {
        const data = {
            user_id: 1,
            client_id: 2,
            scopes:[],
            revoked: 1,
            expires_at: Math.floor(Date.now() / 1000 ) + 60*60*2
        }
        const res = await oauthAuthCodes.create(data)
        console.log(res)
    });
});