import express from 'express';
import {check, validationResult} from "express-validator";
const router = express.Router();

import WeeklyMenu from "../../models/weeklyMenu";
import Food from "../../models/food";

// Constants
import {STATUS_SUCCESS, STATUS_FAIL} from "../../commons/constants";

// @route GET api/weeklyMenus
// @description Get all weeklyMenus
// @access Public
router.get('/', (req, res) => {
    if (req.query.menuDate) {
        WeeklyMenu.findOne({ menuDate: req.query.menuDate })
            .then(weeklyMenu => {
                // Convert all foodId in array to object
                return getWeeklyMenuWithFoodObj(weeklyMenu)
            })
            .then(weeklyMenuWithFoodObj => res.status(200).json({
                status: STATUS_SUCCESS,
                data: weeklyMenuWithFoodObj,
                msg: null,
                error: null
            }))
            .catch(err => res.status(404).json({
                status: STATUS_FAIL,
                data: null,
                msg: null,
                error: err
            }));
    } else {
        //todo: Convert all foodId from weeklyMenus to foodObj
        WeeklyMenu.find()
            .then(weeklyMenus => {
                res.status(200).json({
                    status: STATUS_SUCCESS,
                    data: weeklyMenus,
                    msg: null,
                    error: null
                });
            })
            .catch(err => res.status(404).json({
                status: STATUS_SUCCESS,
                data: null,
                msg: null,
                error: err
            }));
    }
});

// Helper function to convert weeklyMenu Obj to return food Obj instead of just the foodId
async function getWeeklyMenuWithFoodObj(weeklyMenu) {
    const daysKeyConstants = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const keys = Object.keys(weeklyMenu['_doc']);
    for (const key of keys) {
        // todo: Refactor to common library
        if (daysKeyConstants.includes(key) &&
            (Array.isArray(weeklyMenu['_doc'][key]) && weeklyMenu['_doc'][key].length > 0)) {
            let foodObjArr = [];
            for (const foodId of weeklyMenu['_doc'][key]) {
                let foodObj = null;
                await Food.findById(foodId)
                    .then(food => {
                        foodObj = food;
                        foodObjArr.push(foodObj);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
            weeklyMenu['_doc'][key] = foodObjArr;
        }
    }
    return weeklyMenu;
}

// @route POST api/weeklyMenus
// @description create weeklyMenus
// @access Public
router.post('/', [
    check('menuDate')
        .exists()
        .not().isEmpty()
        .isISO8601(),
    check('monday')
        .optional()
        .isArray(),
    check('tuesday')
        .optional()
        .isArray(),
    check('wednesday')
        .optional()
        .isArray(),
    check('thursday')
        .optional()
        .isArray(),
    check('friday')
        .optional()
        .isArray(),
    check('saturday')
        .optional()
        .isArray(),
    check('sunday')
        .optional()
        .isArray(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: STATUS_FAIL,
            data: null,
            msg: null,
            error: errors.array()
        })
    } else {
        WeeklyMenu.create(req.body)
            .then(weeklyMenu => res.status(201).json({
                status:STATUS_SUCCESS,
                data: weeklyMenu,
                msg: null,
                error: null,
            }))
            .catch(err => res.status(400).json({
                status: STATUS_FAIL,
                data: null,
                msg: null,
                error: err
            }));
    }
});

// @route GET api/weeklyMenus/:id
// @description Get weeklyMenus by id
// @access Public
router.get('/:id', (req, res) => {
   WeeklyMenu.findById(req.params.id)
       .then(weeklyMenu => res.status(200).json({
           status: STATUS_SUCCESS,
           data: weeklyMenu,
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

// @route PUT api/weeklyMenus/:id
// @description Update weeklyMenu
// @access Public
router.put('/:id',[
    check('menuDate')
        .exists()
        .not().isEmpty()
        .isISO8601(),
    check('monday')
        .optional()
        .isArray(),
    check('tuesday')
        .optional()
        .isArray(),
    check('wednesday')
        .optional()
        .isArray(),
    check('thursday')
        .optional()
        .isArray(),
    check('friday')
        .optional()
        .isArray(),
    check('saturday')
        .optional()
        .isArray(),
    check('sunday')
        .optional()
        .isArray(),
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
        WeeklyMenu.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false})
            .then(weeklyMenu => res.status(200).json({
                status: STATUS_SUCCESS,
                data: weeklyMenu,
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

// @route DELETE api/weeklyMenus/:id
// @description Delete weeklyMenus by id
// @access Public
router.delete('/:id', (req, res) => {
   WeeklyMenu.findByIdAndRemove(req.params.id, req.body)
       .then(weeklyMenu => res.status(200).json({
           status: STATUS_SUCCESS,
           data: weeklyMenu,
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

// router.get('/?menuDate', (req, res) => {
//     WeeklyMenu.findOne({ menuDate: req.query.menuDate })
//         .then(weeklyMenu => res.status(200).json({
//             status: STATUS_SUCCESS,
//             data: weeklyMenu,
//             msg: null,
//             error: null
//         }))
//         .catch(err => res.status(404).json({
//             status: STATUS_FAIL,
//             data: null,
//             msg: null,
//             error: err
//         }));
// });

export default router;
