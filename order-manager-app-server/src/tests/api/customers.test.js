import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

// MongoDB
import Customer from '../../models/customer';

// Constants
import {STATUS_SUCCESS, STATUS_FAIL} from '../../commons/constants';

beforeEach(async (done) => {
    await Customer.collection.drop().then(() => {

    }).catch((err) => {
        if (err.code === 26) {
            console.log('namespace %s not found', Customer.collection.name);
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

describe('GET /api/customers/', () => {
   it('should get empty results', async () => {
     const res = await request(app)
         .get('/api/customers');
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
           .post('/api/customers/')
           .send({"name": "ainsley chen"});
       expect(res.statusCode).toEqual(201);

       const res2 = await request(app)
           .get('/api/customers');
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data).toHaveLength(1);
       expect(res2.body.error).toBeNull();
       expect(res2.body.data[0].name).toEqual('ainsley chen');
       expect(res2.body.data[0].email).toBeNull();
       expect(res2.body.data[0].phone).toBeNull();
   });
});

describe('POST /api/customers/', () => {
   it('should create customer successfully', async () => {
       const res = await request(app)
           .post('/api/customers/')
           .send({"name": "ainsley chen", "email": "ainsleychen@hotmail.com", "phone": "123456"});
       expect(res.statusCode).toEqual(201);
       expect(res.body.status).toEqual(STATUS_SUCCESS);
       expect(res.body.error).toEqual(null);
       expect(res.body.data.name).toEqual('ainsley chen');
       expect(res.body.data.email).toEqual('ainsleychen@hotmail.com');
       expect(res.body.data.phone).toEqual('123456');
   });

   it('should fail when passing name as ""', async () => {
      const res = await request(app)
          .post('/api/customers/')
          .send({"name": ""});
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing dishName as null', async () => {
      const res = await request(app)
          .post('/api/customers/')
          .send({"name": null});
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing nothing', async () => {
       const res = await request(app)
           .post('/api/customers/')
           .send({});
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing an invalid email', async () => {
       const res = await request(app)
           .post('/api/customers/')
           .send({"name": "ainsley chen", "email": "ainsleychen@hotmail"});
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });
});

describe('GET /api/customers/:id', () => {
   it('should return customer by id', async () => {
       const res = await request(app)
           .post('/api/customers/')
           .send({"name": "ainsley chen"});
       expect(res.statusCode).toEqual(201);

       const customerId = res.body.data._id;
       const res2 = await request(app)
           .get('/api/customers/')
           .query({"id": customerId});
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data[0].name).toEqual('ainsley chen');
   });

   it('should not return customer by id', async () => {
       const res = await request(app)
           .get('/api/customers/')
           .query({"id": 123});
       expect(res.statusCode).toEqual(200);
       expect(res.body.status).toEqual(STATUS_SUCCESS);
       expect(res.body.data).toEqual([]);
   });
});

describe('PUT /api/customers/:id', () => {
   it('should update customer successfully', async () => {
       const res = await request(app)
           .post('/api/customers/')
           .send({"name": "ainsley chen"});
       expect(res.statusCode).toEqual(201);

       const customerId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/customers/' + customerId)
           .send({"name": "ainsley chen new"});
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data.name).toEqual("ainsley chen new");
       expect(res2.body.data.email).toBeNull();
       expect(res2.body.data.phone).toBeNull();
   });

   it('should not update when customer not found', async () => {
       const res = await request(app)
           .post('/api/customers/')
           .send({"name": "ainsley chen"});
       expect(res.statusCode).toEqual(201);

       const customerId = '123';
       const res2 = await request(app)
           .put('/api/customers/' + customerId)
           .send(({"name": "ainsley chen new"}));
       expect(res2.statusCode).toEqual(400);
       expect(res2.body.status).toEqual(STATUS_FAIL);
       expect(res2.body.data).toBeNull();
   });

   it('should fail when passing name as ""', async () => {
      const res = await request(app)
          .post('/api/customers/')
          .send({"name": "ainsley chen"});
      expect(res.statusCode).toEqual(201);

       const customerId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/customers/' + customerId)
           .send({"name": ""});
       expect(res2.statusCode).toEqual(422);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing name as null', async () => {
       const res = await request(app)
           .post('/api/customers/')
           .send({"name": "ainsley chen"});
       expect(res.statusCode).toEqual(201);

       const customerId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/customers/' + customerId)
           .send({"name": null});
       expect(res2.statusCode).toEqual(422);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });

    it('should fail when passing name as nothing', async () => {
        const res = await request(app)
            .post('/api/customers/')
            .send({"name": "ainsley chen"});
        expect(res.statusCode).toEqual(201);

        const customerId = res.body.data._id;
        const res2 = await request(app)
            .put('/api/customers/' + customerId)
            .send({});
        expect(res2.statusCode).toEqual(422);
        expect(res2.body.status).toEqual(STATUS_FAIL);
    });

    it('should fail when passing an invalid email', async () => {
        const res = await request(app)
            .post('/api/customers/')
            .send({"name": "ainsley chen"});
        expect(res.statusCode).toEqual(201);

        const customerId = res.body.data._id;
        const res2 = await request(app)
            .put('/api/customers/' + customerId)
            .send({"email": "ainsleychen@hotmail"});
        expect(res2.statusCode).toEqual(422);
        expect(res2.body.status).toEqual(STATUS_FAIL);
    });
});

describe('DELETE /api/customers/:id', () => {
   it('should delete customer successfully', async () => {
       const res = await request(app)
           .post('/api/customers/')
           .send({"name": "ainsley chen"});
       expect(res.statusCode).toEqual(201);

       const customerId = res.body.data._id;
       const res2 = await request(app)
           .del('/api/customers/' + customerId);
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data).toEqual(res.body.data);
   });

   it('should not delete when id not found', async () => {
       const res = await request(app)
           .post('/api/customers/')
           .send({"name": "ainsley chen"});
       expect(res.statusCode).toEqual(201);

       const customerId = 123;
       const res2 = await request(app)
           .del('/api/customers/' + customerId);
       expect(res2.statusCode).toEqual(404);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   })
});
