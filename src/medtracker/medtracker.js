const express = require('express');
const moment = require('moment');
const MedTrackerService = require('./medtracker-service');

const medTrackerRouter = express.Router();
const jsonParser = express.json();

medTrackerRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const {id, minutes} = req.body
        const newLog = {
            id,
            minutes
        }
        //Inserts the new log and then converting the result and sending it back proper formatting
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