import request from 'supertest';
import app from '../../app';

// MongoDB
import Food from '../../models/food';

beforeEach(() => {
    Food.collection.drop().then(() => {

    }).catch((err) => {
        if (err.code === 26) {
            console.log('namespace %s not found',Food.collection.name);
        } else {
            throw err;
        }
    })
});

describe('GET /api/foods/', () => {
    it('should get empty result', async () => {
        const res = await request(app)
            .get('/api/foods/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    it('should get all result', async () => {
        const res1 = await request(app)
            .post('/api/foods/')
            .send({"dishName": "test dish"});
        expect(res1.statusCode).toEqual(201);
        const res2 = await request(app)
            .get('/api/foods/');
        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toHaveLength(1);
        expect(res2.body[0].dishName).toEqual('test dish');
        expect(res2.body[0].priceSmall).toEqual(null);
        expect(res2.body[0].priceMedium).toEqual(null);
        expect(res2.body[0].priceLarge).toEqual(null);
    });
});

// describe('POST /api/foods/', () => {
//    it('should create food successfully', async () => {
//        const res = await request(app)
//            .post('/api/foods/')
//            .send({"dishName": "test dish"});
//        expect(res.statusCode).toEqual(201);
//    }) ;
// });
