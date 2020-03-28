const express = require('express');
const moment = require('moment')
const UserAuthService = require('./users-auth-service');
const {TEST_DATABASE_URL} = require('../config')

const userAuthRouter = express.Router();
const jsonParser = express.json();

const serializeUser = user => ({
    name: user.name,
    email: user.email,
    password: user.password
})

const getTotalTime = (array) => {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
        sum += array[i].minutes
    }

    return sum;
}

userAuthRouter
    .route('/login')
    .post(jsonParser, (req, res, next) => {
        const {email, password} = req.body;
        const loginUser = {email, password};
    
        for (const [key, value] of Object.entries(loginUser)) {
            if (value == null) {
              return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
              })
            }
        }

        UserAuthService.getUserWithEmail(
            req.app.get('db'),
            loginUser.email
        )
        .then(dbUser => {
            if (!dbUser) {
                return res.status(400).json({
                    error: { message: 'Incorrect email or password' }
                })
            }

            return UserAuthService.comparePasswords(loginUser.password, dbUser.password)
                .then(compareMatch => {
                    if(!compareMatch) {
                        return res.status(400).json({
                            error: { message: 'Incorrect email or password' }
                        })
                    }
                    UserAuthService.getData(
                        req.app.get('db'),
                        dbUser.id
                    )
                    .then(data => {
                        const sub = dbUser.email;
                        const payload = {user_id: dbUser.id};
                        let totalTime = getTotalTime(data);
                        
                        data.map(log => {
                            log.date_published = moment(log.date_published).format('MMM Do YYYY')
                        })
                        const latestData = data.slice(0, 7)
                        const user = {
                            id: dbUser.id,
                            medData: latestData,
                            totalTime
                        }
                        res.send({
                            authToken: UserAuthService.createJwt(sub, payload),
                            user
                        })
                    })
                })

        })
        .catch(next)
    })

userAuthRouter
    .route('/register')
    .post(jsonParser, (req, res, next) => {
        const {email, password, name} = req.body;

        UserAuthService.getUserWithEmail(
            req.app.get('db'),
            email
        )
        .then(user => {
            return UserAuthService.hashPassword(password)
                .then(hashedPassword => {
                    const newUser = {
                        email,
                        password: hashedPassword,
                        name
                    }

                    return UserAuthService.insertUser(
                        req.app.get('db'),
                        newUser
                    )
                        .then(user => {
                            res.status(201).json(serializeUser(user))
                        })
                })
        })
        .catch(next)
    })

module.exports = userAuthRouter;
