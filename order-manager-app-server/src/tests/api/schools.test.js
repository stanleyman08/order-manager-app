import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

// MongoDB
import School from '../../models/school'

// Constants
import {STATUS_SUCCESS, STATUS_FAIL} from '../../commons/constants';

beforeEach(async (done) => {
    await School.collection.drop().then(() => {

    }).catch((err) => {
        if (err.code === 26) {
            console.log('namespace %s not found', School.collection.name);
        } else {
            throw err;
        }
    });
    done();
});

afterAll((done) => {
    mongoose.connection.close().then(() => {
        done();
    })
});

describe(' GET /api/schools/', () => {
   it('should get empty results', async () => {
       const res = await request(app)
           .get('/api/schools');
       expect(res.statusCode).toEqual(200);
       expect(res.body).toEqual({
           status: STATUS_SUCCESS,
           data: [],
           msg: null,
           error: null
       });
   });

   it('should get all results', async () => {
       const res = await request(app)
           .post('/api/schools/')
           .send({"name": "windermere secondary"});
       expect(res.statusCode).toEqual(201);

       const res2 = await request(app)
           .get('/api/schools');
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data).toHaveLength(1);
       expect(res2.body.error).toBeNull();
       expect(res2.body.data[0].name).toEqual('windermere secondary');
   });
});

describe('POST /api/schools/', () => {
    it('should create school successfully', async () => {
        const res = await request(app)
            .post('/api/schools/')
            .send({"name": "windermere secondary"});
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual(STATUS_SUCCESS);
        expect(res.body.error).toEqual(null);
        expect(res.body.data.name).toEqual('windermere secondary');
    });

    it('should fail when passing name as null', async () => {
        const res = await request(app)
            .post('/api/schools/')
            .send({"name": null});
        expect(res.statusCode).toEqual(422);
        expect(res.body.status).toEqual(STATUS_FAIL);
    });

    it('should fail when passing nothing', async () => {
        const res = await request(app)
            .post('/api/schools/')
            .send({});
        expect(res.statusCode).toEqual(422);
        expect(res.body.status).toEqual(STATUS_FAIL);
    });
});

describe('GET /api/schools/:id', () => {
   it('should return school by id', async () => {
       const res = await request(app)
           .post('/api/schools/')
           .send({"name": "windermere secondary"});
       expect(res.statusCode).toEqual(201);

       const schoolId = res.body.data._id;
       const res2 = await request(app)
           .get('/api/schools/')
           .query({"id": schoolId});
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data[0].name).toEqual('windermere secondary');
   });

   it('should not return customer by id', async () => {
      const res = await request(app)
          .get('/api/schools/')
          .query({"id": 123});
       expect(res.statusCode).toEqual(200);
       expect(res.body.status).toEqual(STATUS_SUCCESS);
       expect(res.body.data).toEqual([]);
   });
});

describe('PUT /api/schools/:id', () => {
   it('should update school successfully', async () => {
       const res = await request(app)
           .post('/api/schools/')
           .send({"name": "windermere secondary"});
       expect(res.statusCode).toEqual(201);

       const schoolId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/schools/' + schoolId)
           .send({"name": "windermere secondary new"});
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data.name).toEqual("windermere secondary new");
   });

   it('should not update when school not found', async () => {
       const res = await request(app)
           .post('/api/schools/')
           .send({"name": "windermere secondary"});
       expect(res.statusCode).toEqual(201);

       const schoolId = '123';
       const res2 = await request(app)
           .put('/api/schools/' + schoolId)
           .send({"name": "windermere secondary new"});
       expect(res2.statusCode).toEqual(400);
       expect(res2.body.status).toEqual(STATUS_FAIL);
       expect(res2.body.data).toBeNull();
   });

   it('should fail when passing name as ""', async () => {
       const res = await request(app)
           .post('/api/schools/')
           .send({"name": "windermere secondary"});
       expect(res.statusCode).toEqual(201);

       const schoolId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/schools/' + schoolId)
           .send({"name": ""});
       expect(res2.statusCode).toEqual(422);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing name as null', async () => {
       const res = await request(app)
           .post('/api/schools/')
           .send({"name": "windermere secondary"});
       expect(res.statusCode).toEqual(201);

       const schoolId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/schools/' + schoolId)
           .send({"name": null});
       expect(res2.statusCode).toEqual(422);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing name as nothing', async () => {
       const res = await request(app)
           .post('/api/schools/')
           .send({"name": "windermere secondary"});
       expect(res.statusCode).toEqual(201);

       const schoolId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/schools/' + schoolId)
           .send({});
       expect(res2.statusCode).toEqual(422);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });
});

describe('DELETE /api/schools/:id', () => {
   it('should delete school successfully', async () => {
       const res = await request(app)
           .post('/api/schools/')
           .send({"name": "windermere secondary"});
       expect(res.statusCode).toEqual(201);

       const schoolId = res.body.data._id;
       const res2 = await request(app)
           .del('/api/schools/' + schoolId);
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data).toEqual(res.body.data);
   });

   it('should not delete when id not found', async () => {
       const res = await request(app)
           .post('/api/schools/')
           .send({"name": "windermere secondary"});
       expect(res.statusCode).toEqual(201);

       const schoolId = '123';
       const res2 = await request(app)
           .del('/api/schools/' + schoolId);
       expect(res2.statusCode).toEqual(404);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   })
});
