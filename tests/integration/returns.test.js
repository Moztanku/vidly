const request = require('supertest');
const mongoose = require('mongoose');
const {Rental} = require('../../models/rental');
const {User} = require('../../models/user');

describe('/api/returns',()=>{
    let server;
    let customerId; let movieId;
    let path; let token; let rental;
    const exec = ()=>{
        return request(server)
            .post(path)
            .set('x-auth-token',token)
            .send({customerId,movieId});
    };

    beforeEach(async()=>{
        server = require('../../index');
        customerId = mongoose.Types.ObjectId().toHexString();
        movieId = mongoose.Types.ObjectId().toHexString();
        path = '/api/returns';
        token = new User().generateAuthToken();
        rental = new Rental({
            customer:{
                _id: customerId,
                name: 'Adam'
            },
            movie: {
                _id: movieId,
                title: '12'
            }
        });
        await rental.save();
    });
    afterEach(async()=>{
        await Rental.remove({});
        await server.close();
    });

    it('should return 401 if client is not logged in',async()=>{
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });
    it('should return 400 if customerId is not provided',async()=>{
        customerId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 404 if no rental for customer/movie',async()=>{
        await Rental.remove({});
        const res = await exec();
        expect(res.status).toBe(404);
    });
    it('should return 200 if valid request',async()=>{
        const res = await exec();
        expect(res.status).toBe(200);
    });
    it('should return 400 if ',async()=>{

    });

    afterAll(()=>mongoose.disconnect());
});