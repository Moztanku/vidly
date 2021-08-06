const request = require('supertest');
const {User} = require('../../models/user');
const {Genres} = require('../../models/genres')

describe('auth middleware',()=>{
    let server;
    let token;
    const exec = () =>{
        return request(server)
            .post('/api/genres')
            .set('x-auth-token',token)
            .send({value:'validName'});
    };

    beforeEach(()=>{
        server = require('../../index');
        token = new User().generateAuthToken();
    });
    afterEach(async()=>{
        await Genres.remove({});
        server.close();
    });

    it('should return 401 if no token is provided',async()=>{
        token = '';
        const result = await exec();
        expect(result.status).toBe(401);
    });
    it('should return 400 if wrong token is provided',async()=>{
        token = 'Invalid Token'
        const result = await exec();
        expect(result.status).toBe(400);
    });
    it('should return 200 if valid token is provided',async()=>{
        const result = await exec();
        expect(result.status).toBe(200);
    });
});