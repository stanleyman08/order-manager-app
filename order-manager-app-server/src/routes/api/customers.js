import express from 'express';
import {check, validationResult} from "express-validator";
const router = express.Router();

// Load Customer model
import Customer from '../../models/customer';

// Constants
import {STATUS_SUCCESS, STATUS_FAIL} from '../../commons/constants';

// @route GET api/customers
// @description Get all customers
// @access Public
router.get('/', (req, res) => {
   Customer.find()
       .then(customers => {
           res.status(200).json({
              status: STATUS_SUCCESS,
              data: customers,
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

// @route POST api/customers
// @description create customers
// @access Public
router.post('/', [
    check('name')
        .exists()
        .not().isEmpty(),
    check('email')
        .optional()
        .isEmail()
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
        Customer.create(req.body)
            .then(customer => res.status(201).json({
                status: STATUS_SUCCESS,
                data: customer,
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

// @route GET api/customers/:id
// @description Get single customer by id
// @access Public
router.get('/:id', (req, res) => {
   Customer.findById(req.params.id)
       .then(customer => res.status(200).json({
           status: STATUS_SUCCESS,
           data: customer,
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

// @route PUT api/customers/:id
// @description Update customer
// @access Public
router.put('/:id',[
    check('name')
        .exists()
        .not().isEmpty(),
    check('email')
        .optional()
        .isEmail()
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
        Customer.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(customer => res.status(200).json({
                status: STATUS_SUCCESS,
                data: customer,
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

// @route DELETE api/customers/:id
// @description Delete customer by id
// @access Public
router.delete('/:id', (req, res) => {
   Customer.findByIdAndRemove(req.params.id, req.body)
       .then(customer => res.status(200).json({
           status: STATUS_SUCCESS,
           data: customer,
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
