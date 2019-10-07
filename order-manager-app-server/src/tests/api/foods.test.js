import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

// MongoDB
import Food from '../../models/food';

// Constants
import {STATUS_SUCCESS, STATUS_FAIL} from '../../commons/constants';

beforeEach(async (done) => {
    await Food.collection.drop().then(() => {

    }).catch((err) => {
        if (err.code === 26) {
            console.log('namespace %s not found',Food.collection.name);
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

describe('GET /api/foods/', () => {
    it('should get empty result', async () => {
        const res = await request(app)
            .get('/api/foods/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            status: STATUS_SUCCESS,
            data: [],
            msg: null,
            error: null
        });
    });

    it('should get all result', async () => {
        const res1 = await request(app)
            .post('/api/foods/')
            .send({"dishName": "test dish"});
        expect(res1.statusCode).toEqual(201);
        const res2 = await request(app)
            .get('/api/foods/');
        expect(res2.statusCode).toEqual(200);
        expect(res2.body.status).toEqual(STATUS_SUCCESS);
        expect(res2.body.data).toHaveLength(1);
        expect(res2.body.error).toEqual(null);
        expect(res2.body.data[0].dishName).toEqual('test dish');
        expect(res2.body.data[0].priceSmall).toEqual(null);
        expect(res2.body.data[0].priceMedium).toEqual(null);
        expect(res2.body.data[0].priceLarge).toEqual(null);
    });
});

describe('POST /api/foods/', () => {
   it('should create food successfully', async () => {
       const res = await request(app)
           .post('/api/foods/')
           .send({"dishName": "test dish", "priceSmall": 1, "priceMedium": 5, "priceLarge": 10});
       expect(res.statusCode).toEqual(201);
       expect(res.body.status).toEqual(STATUS_SUCCESS);
       expect(res.body.error).toEqual(null);
       expect(res.body.data.dishName).toEqual('test dish');
       expect(res.body.data.priceSmall).toEqual(1);
       expect(res.body.data.priceMedium).toEqual(5);
       expect(res.body.data.priceLarge).toEqual(10);
   });

   it('should fail when passing dishName as "', async () => {
       const res = await request(app)
           .post('/api/foods/')
           .send({"dishName": ""});
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing dishName as null', async () => {
       const res = await request(app)
           .post('/api/foods')
           .send({"dishName": null});
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
    });

   it('should fail when passing nothing', async () => {
      const res = await request(app)
          .post('/api/foods')
          .send({});
      expect(res.statusCode).toEqual(422);
      expect(res.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing string to price', async () => {
      let res = await request(app)
          .post('/api/foods')
          .send({"dishName": "test dish", "priceSmall": "abc"});
      expect(res.statusCode).toEqual(422);
      expect(res.body.status).toEqual(STATUS_FAIL);

      res = await request(app)
          .post('/api/foods')
          .send({"dishName": "test dish", "priceMedium": "abc"});
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);

       res = await request(app)
           .post('/api/foods')
           .send({"dishName": "test dish", "priceLarge": "abc"});
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });
});

describe('GET /api/foods/:id', () => {
    it('should return food by id', async () => {
        const res = await request(app)
            .post('/api/foods')
            .send({"dishName": "test dish"});
        expect(res.statusCode).toEqual(201);

        const foodId = res.body.data._id;
        const res2 = await request(app)
            .get('/api/foods/')
            .query({"id": foodId});
        expect(res2.statusCode).toEqual(200);
        expect(res2.body.status).toEqual(STATUS_SUCCESS);
        expect(res2.body.data[0].dishName).toEqual('test dish');
    });

    it('should not return food by id', async () => {
        const res = await request(app)
            .get('/api/foods/')
            .query({"id": 123});
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(STATUS_SUCCESS);
        expect(res.body.data).toEqual([]);
    });
});

describe('PUT /api/foods/:id', () => {
   it('should update food successfully', async () => {
       const res = await request(app)
           .post('/api/foods')
           .send({"dishName": "test dish"});
       expect(res.statusCode).toEqual(201);

       const foodId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/foods/' + foodId)
           .send({"dishName": "test dish new"});
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data.dishName).toEqual("test dish new");
       expect(res2.body.data.priceSmall).toBeNull();
       expect(res2.body.data.priceMedium).toBeNull();
       expect(res2.body.data.priceLarge).toBeNull();
   });

   it('should not update when food not found', async () => {
       const res = await request(app)
           .post('/api/foods')
           .send({"dishName": "test dish"});
       expect(res.statusCode).toEqual(201);

       const foodId = '123';
       const res2 = await request(app)
           .put('/api/foods/' + foodId)
           .send(({"dishName": "test dish new"}));
       expect(res2.statusCode).toEqual(400);
       expect(res2.body.status).toEqual(STATUS_FAIL);
       expect(res2.body.data).toBeNull();
   });

   it('should fail when passing dishName as ""', async () => {
       const res = await request(app)
           .post('/api/foods')
           .send({"dishName": "test dish"});
       expect(res.statusCode).toEqual(201);

       const foodId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/foods/' + foodId)
           .send(({"dishName": ""}));
       expect(res2.statusCode).toEqual(422);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing dishName as null', async () => {
       const res = await request(app)
           .post('/api/foods')
           .send({"dishName": "test dish"});
       expect(res.statusCode).toEqual(201);

       const foodId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/foods/' + foodId)
           .send(({"dishName": null}));
       expect(res2.statusCode).toEqual(422);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing nothing', async () => {
       const res = await request(app)
           .post('/api/foods')
           .send({"dishName": "test dish"});
       expect(res.statusCode).toEqual(201);

       const foodId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/foods/' + foodId)
           .send(({}));
       expect(res2.statusCode).toEqual(422);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing string to price', async () => {
       const res = await request(app)
           .post('/api/foods')
           .send({"dishName": "test dish"});
       expect(res.statusCode).toEqual(201);

       const foodId = res.body.data._id;
       const res2 = await request(app)
           .put('/api/foods/' + foodId)
           .send(({"dishName": "test dish new", "priceSmall": "abc"}));
       expect(res2.statusCode).toEqual(422);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });
});

describe('DELETE /api/foods/:id', () => {
   it('should delete food successfully', async () => {
       const res = await request(app)
           .post('/api/foods')
           .send({"dishName": "test dish"});
       expect(res.statusCode).toEqual(201);

       const foodId = res.body.data._id;
       const res2 = await request(app)
           .del('/api/foods/' + foodId);
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data).toEqual(res.body.data);
   });

   it('should not delete when id not found', async () => {
       const res = await request(app)
           .post('/api/foods')
           .send({"dishName": "test dish"});
       expect(res.statusCode).toEqual(201);

       const foodId = "123"
       const res2 = await request(app)
           .del('/api/foods/' + foodId);
       expect(res2.statusCode).toEqual(404);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });

});
