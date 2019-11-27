import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

// MongoDB
import WeeklyMenu from "../../models/weeklyMenu";
import Food from "../../models/food";

// Constants
import {STATUS_SUCCESS, STATUS_FAIL} from "../../commons/constants";

let foodId = null;
beforeAll(async (done) => {
    const res = await request(app)
        .post('/api/foods/')
        .send({"dishName": "test dish", "priceSmall": 1, "priceMedium": 5, "priceLarge": 10});
    const res1 = await request(app)
        .get('/api/foods/');
    foodId = res1.body.data[0]._id;
    console.log(foodId);
    done();
});

beforeEach(async (done) => {
    await WeeklyMenu.collection.drop().then(() => {

    }).catch((err) => {
        if (err.code === 26) {
            console.log('namespace %s not found',WeeklyMenu.collection.name);
        } else {
            throw err;
        }
    });
    done();
});

afterAll(async (done) => {
    await Food.collection.drop().then(() => {

    }).catch((err) => {
        if (err.code === 26) {
            console.log('namespace %s not found', Food.collection.name);
        } else {
            throw err;
        }
    });

    mongoose.connection.close().then(() => {
        done();
    });
});

describe('GET /api/weeklyMenus/', () => {
   it('should get empty results', async () => {
       const res = await request(app)
           .get('/api/weeklyMenus/');
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
           .post('/api/weeklyMenus/')
           .send({"menuDate": "2019-01-01"});
       expect(res.statusCode).toEqual(201);
       const res2 = await request(app)
           .get('/api/weeklyMenus/');
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data).toHaveLength(1);
       expect(res2.body.error).toEqual(null);
       expect(res2.body.data[0].menuDate).toEqual('2019-01-01T00:00:00.000Z');
   });
});

describe('POST /api/weeklyMenus/', () => {
   it('should create weeklyMenu successfully', async () => {
       const res = await request(app)
           .post('/api/weeklyMenus/')
           .send({
               "menuDate": "2019-01-01",
               "monday": [foodId]
           });
       expect(res.statusCode).toEqual(201);
       expect(res.body.status).toEqual(STATUS_SUCCESS);
       expect(res.body.error).toEqual(null);
       expect(res.body.data.menuDate).toEqual('2019-01-01T00:00:00.000Z');
       expect(res.body.data.monday).toHaveLength(1);
   });

   it('should fail when passing menuDate as ""', async () => {
       const res = await request(app)
           .post('/api/weeklyMenus/')
           .send({
               "menuDate": ""
           });
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing nothing', async () => {
       const res = await request(app)
           .post('/api/weeklyMenus/')
           .send({});
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing menuDate as null', async () => {
       const res = await request(app)
           .post('/api/weeklyMenus/')
           .send({
               "menuDate": null
           });
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing invalid menuDate', async () => {
       const res = await request(app)
           .post('/api/weeklyMenus/')
           .send({
               "menuDate": "2019-invalid-date"
           });
       expect(res.statusCode).toEqual(422);
       expect(res.body.status).toEqual(STATUS_FAIL);
   });

   it('should fail when passing invalid foodId', async () => {
       const res = await request(app)
           .post('/api/weeklyMenus/')
           .send({
               "menuDate": "2019-01-01",
               "monday": ["123"]
           });
       expect(res.statusCode).toEqual(400);
       expect(res.body.status).toEqual(STATUS_FAIL);
   })
});

describe('GET /api/weeklyMenus/:id', () => {
    it('should return weeklyMenu by id', async () => {
        const res = await request(app)
            .post('/api/weeklyMenus/')
            .send({
                "menuDate": "2019-01-01",
                "monday": [foodId]
            });
        expect(res.statusCode).toEqual(201);
        const weeklyMenuId = res.body.data._id;
        const res2 = await request(app)
            .get('/api/weeklyMenus/' + weeklyMenuId);
        expect(res2.statusCode).toEqual(200);
        expect(res2.body.status).toEqual(STATUS_SUCCESS);
        expect(res2.body.data.menuDate).toEqual('2019-01-01T00:00:00.000Z');
        expect(res2.body.data.monday).toEqual([foodId]);
    }, 10000);

    it('should not return weeklyMenu by id', async () => {
        const res = await request(app)
            .post('/api/weeklyMenus/')
            .send({
                "menuDate": "2019-01-01",
                "monday": [foodId]
            });
        expect(res.statusCode).toEqual(201);
        const res1 = await request(app)
            .get('/api/weeklyMenus/' + 123);
        expect(res1.statusCode).toEqual(400);
        expect(res1.body.status).toEqual(STATUS_FAIL);
    })
});

describe('PUT /api/weeklyMenus/:id', () => {
    it('should update weeklyMenu successfully', async () => {
        const res = await request(app)
            .post('/api/weeklyMenus/')
            .send({
                "menuDate": "2019-01-01",
                "monday": [foodId]
            });
        expect(res.statusCode).toEqual(201);

        const weeklyMenuId = res.body.data._id;
        const res2 = await request(app)
            .put('/api/weeklyMenus/' + weeklyMenuId)
            .send({
                "menuDate": "2019-01-01",
                "monday": []
            });
        expect(res2.statusCode).toEqual(200);
        expect(res2.body.status).toEqual(STATUS_SUCCESS);
        expect(res2.body.data.menuDate).toEqual("2019-01-01T00:00:00.000Z");
        expect(res2.body.data.monday).toEqual([]);
    });

    it('should not update when passing ""', async () => {
       const res = await request(app)
           .post('/api/weeklyMenus/')
           .send({
               "menuDate": "2019-01-01",
               "monday": [foodId]
           });
        expect(res.statusCode).toEqual(201);

        const weeklyMenuId = res.body.data._id;
        const res2 = await request(app)
            .put('/api/weeklyMenus/' + weeklyMenuId)
            .send({
                "menuDate": "",
            });
        expect(res2.statusCode).toEqual(422);
        expect(res2.body.status).toEqual(STATUS_FAIL);
        expect(res2.body.data).toBeNull();
    });

    it('should not update when passing null', async () => {
        const res = await request(app)
            .post('/api/weeklyMenus/')
            .send({
                "menuDate": "2019-01-01",
                "monday": [foodId]
            });
        expect(res.statusCode).toEqual(201);

        const weeklyMenuId = res.body.data._id;
        const res2 = await request(app)
            .put('/api/weeklyMenus/' + weeklyMenuId)
            .send({
                "menuDate": null,
            });
        expect(res2.statusCode).toEqual(422);
        expect(res2.body.status).toEqual(STATUS_FAIL);
        expect(res2.body.data).toBeNull();
    });

    it('should not update when passing nothing', async () => {
        const res = await request(app)
            .post('/api/weeklyMenus/')
            .send({
                "menuDate": "2019-01-01",
                "monday": [foodId]
            });
        expect(res.statusCode).toEqual(201);

        const weeklyMenuId = res.body.data._id;
        const res2 = await request(app)
            .put('/api/weeklyMenus/' + weeklyMenuId)
            .send({});
        expect(res2.statusCode).toEqual(422);
        expect(res2.body.status).toEqual(STATUS_FAIL);
        expect(res2.body.data).toBeNull();
    });

    it('should not update when passing an invalid menuDate', async () => {
        const res = await request(app)
            .post('/api/weeklyMenus/')
            .send({
                "menuDate": "2019-01-01",
                "monday": [foodId]
            });
        expect(res.statusCode).toEqual(201);

        const weeklyMenuId = res.body.data._id;
        const res2 = await request(app)
            .put('/api/weeklyMenus/' + weeklyMenuId)
            .send({
                "menuDate": "2019-invalid-date"
            });
        expect(res2.statusCode).toEqual(422);
        expect(res2.body.status).toEqual(STATUS_FAIL);
        expect(res2.body.data).toBeNull();
    });

    it('should not update when passing invalid foodId', async () => {
        const res = await request(app)
            .post('/api/weeklyMenus/')
            .send({
                "menuDate": "2019-01-01",
                "monday": [foodId]
            });
        expect(res.statusCode).toEqual(201);

        const weeklyMenuId = res.body.data._id;
        const res2 = await request(app)
            .put('/api/weeklyMenus/' + weeklyMenuId)
            .send({
                "menuDate": "2019-invalid-date",
                "monday": ["123"]
            });
        expect(res2.statusCode).toEqual(422);
        expect(res2.body.status).toEqual(STATUS_FAIL);
        expect(res2.body.data).toBeNull();
    })
});

describe('DELETE /api/weeklyMenus/:id', () => {
   it('should delete weeklyMenu successfully', async () => {
       const res = await request(app)
           .post('/api/weeklyMenus/')
           .send({
               "menuDate": "2019-01-01",
               "monday": [foodId]
           });
       expect(res.statusCode).toEqual(201);
       const weeklyMenuId = res.body.data._id;
       const res2 = await request(app)
           .del('/api/weeklyMenus/' + weeklyMenuId);
       expect(res2.statusCode).toEqual(200);
       expect(res2.body.status).toEqual(STATUS_SUCCESS);
       expect(res2.body.data).toEqual(res.body.data);
   });

   it('should not delete when id not found', async () => {
       const res = await request(app)
           .post('/api/weeklyMenus/')
           .send({
               "menuDate": "2019-01-01",
               "monday": [foodId]
           });
       expect(res.statusCode).toEqual(201);

       const weeklyMenuId = "123";
       const res2 = await request(app)
           .del('/api/weeklyMenus/' + weeklyMenuId);
       expect(res2.statusCode).toEqual(404);
       expect(res2.body.status).toEqual(STATUS_FAIL);
   });
});

describe('GET /api/weeklyMenus/:menuDate', () => {
    it('should return weeklyMenu by date', async () => {
        const res = await request(app)
            .post('/api/weeklyMenus/')
            .send({
                "menuDate": "2019-01-01",
                "monday": [foodId]
            });
        expect(res.statusCode).toEqual(201);

        const menuDate = res.body.data.menuDate;
        const res2 = await request(app)
            .get('/api/weeklyMenus/')
            .query({menuDate: menuDate});
        expect(res2.statusCode).toEqual(200);
    });

    it('should not return weeklyMenu by date because date is wrong', async () => {
        const res = await request(app)
            .post('/api/weeklyMenus/')
            .send({
                "menuDate": "2019-01-01",
                "monday": [foodId]
            });
        expect(res.statusCode).toEqual(201);

        const menuDate = '2020-01-01';
        const res2 = await request(app)
            .get('/api/weeklyMenus/')
            .query({menuDate: menuDate});
        expect(res2.statusCode).toEqual(200);
        expect(res2.body.data).toEqual(null);
    })
});
