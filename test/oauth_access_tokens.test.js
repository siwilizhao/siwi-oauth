const oauthAccessTokens = require('../lib/models/oauth_access_tokens')
const expect = require('chai').expect
const mongoose =  require('mongoose')
mongoose.connect('mongodb://192.168.10.10/test');
describe('oauth_access_tokens.js', () => {
    it('', async () => {
        const data = {
            user_id: 1,
            client_id: 2,
            name: 'test',
            scopes:[],
            revoked: 1,
            expires_at: Math.floor(Date.now() / 1000 ) + 60*60*2,
            created_at: Math.floor(Date.now() / 1000 ) 
        }
        const res = await oauthAccessTokens.create(data)
        console.log(res)
    });
});