import express from 'express';
import {check, validationResult} from "express-validator";
const router = express.Router();

// Load School model
import School from '../../models/school';

// Constants
import {STATUS_SUCCESS, STATUS_FAIL} from '../../commons/constants';

// @route GET api/schools
// @description Get all schools
// @access Public
router.get('/', (req, res) => {
    School.find()
        .then(schools => {
            res.status(200).json({
                status: STATUS_SUCCESS,
                data: schools,
                msg: null,
                error: null
            });
        })
        .catch(err => res.status(404).json({
            status: STATUS_FAIL,
            data: null,
            msg: null,
            error: err
        }))
});

// @route POST api/schools
// @description Create school
// @access Public
router.post('/', [
   check('name')
       .exists()
       .not().isEmpty()
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
        School.create(req.body)
            .then(school => res.status(201).json({
                status: STATUS_SUCCESS,
                data: school,
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

// @route GET api/schools/:id
// @description Get single school by id
// @access Public
router.get('/:id', (req, res) => {
    School.findById(req.params.id)
        .then(school => res.status(200).json({
            status: STATUS_SUCCESS,
            data: school,
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

// @route PUT api/schools/:id
// @description Update school
// @access Public
router.put('/:id', [
    check('name')
        .exists()
        .not().isEmpty()
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
        School.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false})
            .then(school => res.status(200).json({
                status: STATUS_SUCCESS,
                data: school,
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

// @route DELETE api/schools/:id
// @description Delete school by id
// @access Public
router.delete('/:id', (req, res) => {
   School.findByIdAndRemove(req.params.id, req.body)
       .then(school => res.status(200).json({
           status: STATUS_SUCCESS,
           data: school,
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
