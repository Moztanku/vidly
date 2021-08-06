const request = require('supertest');
const mongoose = require('mongoose');
const {Genres} = require('../../models/genres');
const {User} = require('../../models/user');
let server;

describe('/api/genres',()=>{
    beforeEach(()=>{
        server = require('../../index');
    });
    afterEach(async()=>{
        await Genres.remove({});
        await server.close();
    });
    describe('GET /',()=>{
        it('should return all genres',async ()=>{
            await Genres.collection.insertMany([
                {name:'genre1'},
                {name:'genre2'},
                {name:'genre3'}
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        });
    });
    describe('GET /:id',()=>{
        it('should return a genre with given id',async()=>{
            const genre = new Genres({ value: 'genre1', id: 1 });
            await genre.save();

            const res = await request(server).get('/api/genres/'+1);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('value',genre.value);
        });
        it('should return 404 if invalid id',async()=>{
            const res = await request(server).get('/api/genres/10');
            expect(res.status).toBe(404);
        });
    });
    describe('POST /',()=>{
        it('should return 401 if client is not logged in',async()=>{
            const res = await request(server)
                .post('/api/genres')
                .send({value: 'genre1'});
            expect(res.status).toBe(401);
        });
        it('should return 400 if genre invalid',async()=>{
            const token = new User().generateAuthToken();
            const res = await request(server)
                .post('/api/genres').set('x-auth-token',token)
                .send({value:'12'});
            expect(res.status).toBe(400);
        });
        it('should return 200 if genre valid',async()=>{
            const token = new User().generateAuthToken();
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token',token)
                .send({value:'123'});
            expect(res.status).toBe(200);
        });
        it('should return the genre if it is valid', async()=>{
            const token = new User().generateAuthToken();

            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token',token)
                .send({name: 'genre1'});
            const genre = await Genres.find({name: 'genre1'});

            expect(genre).not.toBeNull();
        });
    });
    describe('PUT /:id',()=>{
        let token;  let genre;  let path;
        const exec = ()=>{
            return request(server)
                .put(path)
                .set('x-auth-token',token)
                .send(genre);
        }
        
        beforeEach(async()=>{
            genre = {value:'genre2'};
            path = '/api/genres/1';
            token = new User().generateAuthToken();
                await request(server)
                .post('/api/genres')
                .set('x-auth-token',token)
                .send({value:'genre1'});
        });
        afterEach(async()=>{
            await Genres.remove({});
        });
        
        it('should return 200 if everything\'s ok',async()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(genre);
        });
        it('should return 400 if invalid genre name',async()=>{
            genre.value = 'ge';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 404 if invalid id was given',async()=>{
            path = '/api/genres/2';
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it('should return 401 if token is empty',async()=>{
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
    });
    describe('DELETE /:id',()=>{
        let token; let path;
        const exec = ()=>{
            return request(server)
            .delete(path)
            .set('x-auth-token',token);
        }

        beforeEach(async()=>{
            token = new User({
                _id:new mongoose.Types.ObjectId(),
                isAdmin:true
                }).generateAuthToken();
            path = '/api/genres/1';
            await request(server)
                .post('/api/genres')
                .set('x-auth-token',token)
                .send({value:'genre1'});
        });
        afterEach(async()=>{
            await Genres.remove({});
        });

        it('should return 200 and delete a genre',async()=>{
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return 404 if genre with given id doesn\'t exist',async()=>{
            path = '/api/genres/2';
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it('should return 401 if token is empty',async()=>{
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it('should return 403 if user is not an admin',async()=>{
            token = new User({
                _id:new mongoose.Types.ObjectId(),
                isAdmin:false
            }).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });
    });
});