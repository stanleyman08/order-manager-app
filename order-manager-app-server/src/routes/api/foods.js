import express from 'express';
import {check, validationResult} from "express-validator";
const router = express.Router();

// Load Food model
import Food from '../../models/food';

// Constants
import {STATUS_SUCCESS, STATUS_FAIL} from '../../commons/constants';

// @route GET api/foods
// @description Get all foods
// @access Public
router.get('/', (req, res) => {
    Food.find()
        .then(foods => {
            res.status(200).json({
                status: STATUS_SUCCESS,
                data: foods,
                msg: null,
                error: null
            });
        })
        .catch(err => res.status(404).json({
            status: STATUS_FAIL,
            data: null,
            msg: null,
            error: err
        }));
});

// @route POST api/foods
// @description create foods
// @access Public
router.post('/', [
    check('dishName')
        .exists()
        .not().isEmpty(),
    check('priceSmall')
        .optional()
        .isNumeric(),
    check('priceMedium')
        .optional()
        .isNumeric(),
    check('priceLarge')
        .optional()
        .isNumeric()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: STATUS_FAIL,
            data: null,
            msg: null,
            error: errors.array()
        });
    } else {
        Food.create(req.body)
            .then(food => res.status(201).json({
                status: STATUS_SUCCESS,
                data: food,
                msg: null,
                error: null
            }))
            .catch(err => res.status(400).json({
                status: STATUS_FAIL,
                data: null,
                msg: null,
                error: err
            }));
    }
});

// @route GET api/foods/:id
// @description Get single food by id
// @access Public
router.get('/:id', (req, res) => {
    Food.findById(req.params.id)
        .then(food => res.status(200).json({
            status: STATUS_SUCCESS,
            data: food,
            msg: null,
            error: null
        }))
        .catch(err => res.status(400).json({
            status: STATUS_FAIL,
            data: null,
            msg: null,
            error: err
        }));
});

// @route PUT api/foods/:id
// @description Update food
// @access Public
router.put('/:id',[
    check('dishName')
        .exists()
        .not().isEmpty(),
    check('priceSmall')
        .optional()
        .isNumeric(),
    check('priceMedium')
        .optional()
        .isNumeric(),
    check('priceLarge')
        .optional()
        .isNumeric()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: STATUS_FAIL,
            data: null,
            msg: null,
            error: errors.array()
        });
    } else {
        Food.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false})
            .then(food => res.status(200).json({
                status: STATUS_SUCCESS,
                data: food,
                msg: null,
                error: null
            }))
            .catch(err => res.status(400).json({
                status: STATUS_FAIL,
                data: null,
                msg: null,
                error: err
            }));
    }
});

// @route DELETE api/foods/:id
// @description Delete food by id
// @access Public
router.delete('/:id', (req, res) => {
    Food.findByIdAndRemove(req.params.id, req.body)
        .then(food => res.status(200).json({
            status: STATUS_SUCCESS,
            data: food,
            msg: null,
            error: null
        }))
        .catch(err => res.status(404).json({
            status: STATUS_FAIL,
            data: null,
            msg: null,
            error: err
        }));
});

export default router;
