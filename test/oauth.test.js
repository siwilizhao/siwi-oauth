const expect = require('chai').expect
const mongoose = require('mongoose')
mongoose.connect('mongodb://192.168.10.10/test');

const unique = require('siwi-uniquestring')
const Oauth = require('../index')
const oauth = new Oauth()
describe('oauth.js', () => {
    // it('#createClient', async () => {
    //     const user_id = await unique.random(32)
    //     const name = '思微测试'
    //     const redirect = 'https://testv1.siwi.me/callback'
    //     const desc = '测试客户端'
    //     const res = await oauth.createClient(user_id, name, redirect, desc)
    //     console.log(res)
    //     expect(res).to.be.an('object')
    // });
    // it('#updateClient', async () => {
    //     const user_id = await unique.random(32)
    //     const name = '思微测试更新'
    //     const redirect = 'https://testv1.siwi.me/callback'
    //     const desc = '测试客户端'
    //     const client = await oauth.createClient(user_id, name, redirect, desc)
    //     console.log(client)
    //     const id = client['_id']
    //     const res = await oauth.updateClient(id, '测试更新', 'https://testv1.siwi.me/callback2', '测试')
    //     console.log(res)
    //     expect(res).to.be.an('object')
    // });
    // it('#deleteClient', async () => {
    //     const user_id = await unique.random(32)
    //     const name = '思微删除'
    //     const redirect = 'https://testv1.siwi.me/callback'
    //     const desc = '测试删除客户端'
    //     const client = await oauth.createClient(user_id, name, redirect, desc)
    //     const id = client['_id']
    //     const res = await oauth.deleteClient('5ad5a60846c5b627366f04df')
    //     expect(res).to.be.an('object')
    // });
    // it('#getClients', async () => {
    //     const res = await oauth.getClients(1, 50, {revoked: true})
    //     console.log(res)
    //     expect(res).to.be.an('object')
    // });

    // it('#getClientById', async () => {
        
    //     const res = await oauth.getClientById('5ad5a68c03814427b407fd9d')
    //     console.log(res)
    //     expect(res).to.be.an('object')
    // });

    it('#createCode', async () => {
        const user_id = await unique.random(32)
        const client_id = await unique.random(32)
        const scopes = []
        const expires_at = Math.floor(Date.now()/ 1000) + 86400 * 30
        const res = await oauth.createCode(user_id, client_id, scopes, expires_at)
        console.log(res)
        expect(res).to.be.an('object')
    });
});