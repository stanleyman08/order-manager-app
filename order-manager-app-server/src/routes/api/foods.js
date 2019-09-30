import express from 'express';
import {check, validationResult} from "express-validator";
const router = express.Router();

// Load Food model
import Food from '../../models/food';

// Http Response wrapper
// const SimpleHttpResponse = require('../../commons/simpleHttpResponse');

// @route GET api/foods
// @description Get all foods
// @access Public
router.get('/', (req, res) => {
    // const simpleHttpResponse = new SimpleHttpResponse();
    Food.find()
        .then(foods => {
            // simpleHttpResponse.status = "SUCCESS";
            // simpleHttpResponse.data = foods;
            // res.json(simpleHttpResponse);
            res.json(foods);
        })
        .catch(err => res.status(404).json({ error: err }));
});

// @route POST api/foods
// @description add/save book
// @access Public
router.post('/', [
    check('dishName').exists()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    } else {
        Food.create(req.body)
            .then(food => res.status(201).json({msg: 'Food added successfully'}))
            .catch(err => res.status(400).json({errors: err}));
    }
});

// @route GET api/foods/:id
// @description Get single food by id
// @access Public
router.get('/:id', (req, res) => {
    Food.findById(req.params.id)
        .then(food => res.json(food))
        .catch(err => res.status(404).json({ errors: err }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
    Food.findByIdAndUpdate(req.params.id, req.body)
        .then(food => res.json({msg: 'Updated successfully'}))
        .catch(err => res.status(400).json({errors: err}));
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
    Food.findByIdAndRemove(req.params.id, req.body)
        .then(food => res.json({ mgs: 'Book entry deleted successfully' }))
        .catch(err => res.status(404).json({ errors: err }));
});

export default router;
