const express = require('express');
const moment = require('moment');
const MedTrackerService = require('./medtracker-service');

const medTrackerRouter = express.Router();
const jsonParser = express.json();

//post req

medTrackerRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const {id, minutes} = req.body
        const newLog = {
            id,
            minutes
        }
        MedTrackerService.insertNewLog(
            req.app.get('db'),
            newLog
        )
        .then(result => {
            const date = moment(result.date_published).format('MMM Do YYYY')
            result.date_published = date;
            res.status(201).send(result)
        })
        .catch(next)
    })



module.exports = medTrackerRouter;