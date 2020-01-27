const express = require('express');
const router = express.Router();

// Model
const Administrator = require('../models/Administrator');

// RETRIEVE
// @route GET api/administrators
// @desc Retrieve all administrators
// @access Public
router.get('/', (req,res) => {
    Administrator.find()
    .then(administrators => res.json(administrators))
    .catch(() => res.status(400).json({
        message: {
            msgBody: "Unable to retrieve administrators!", 
            msgError: true
        }
    }));
});

// CREATE
// @route POST api/administrators
// @desc Create an administrator
// @access Public
router.post('/',(req,res) => {
    const newAdmin = new Administrator({
        username: req.body.username,
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId
    });

    newAdmin.save()
    .then(() => res.json({
        message: {
            msgBody: "Successfully added administrator!", 
            msgError: false
        }
    }))
    .catch(() => res.status(400).json({
        message: {
            msgBody: "Unable to add administrator!", 
            msgError: true
        }
    }));
});

// DELETE
// @route DELETE api/administrators/:id
// @desc Delete an administrator
// @access Public
router.delete('/:id',(req,res) => {
    Administrator.findByIdAndDelete(req.params.id)
    .then(() => res.json({
        message: {
            msgBody: "Successfully deleted administrator!", 
            msgError: false
        }
    }))
    .catch(() => res.status(400).json({
        message: {
            msgBody: "Unable to delete administrator!", 
            msgError: true
        }
    }));
});

// UPDATE
// @route PUT api/administrators/:id
// @desc Update an administrator
// @access Public
router.put('/:id',(req,res) => {
    Administrator.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {runValidators:true} // by default, mongoose only runs validators for Create, Retrieve & Delete.
    )
    .then(() => res.json({
        message: {
            msgBody: "Successfully updated administrator!", 
            msgError: false
        }
    }))
    .catch(() => res.status(400).json({
        message: {
            msgBody: "Unable to update administrator!", 
            msgError: true
        }
    }));
});

module.exports = router;