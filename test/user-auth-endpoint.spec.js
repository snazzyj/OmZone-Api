const { expect } = require('chai')
const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { makeUsersArray } = require('./user-fixtures');
const TEST_DB_URL = "postgresql://Alex:1@localhost/omzone-api"

describe('User Auth Endpoints', function () {

    let db;
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: TEST_DB_URL
        })
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());
    before('clean the table', () => db.raw('TRUNCATE users, meditation_log'));
    afterEach('cleanup', () => db.raw('TRUNCATE users, meditation_log'));

    describe(`POST /api/auth/login`, () => {

        context('Given there are users in the database', () => {
            const testUsers = makeUsersArray();
            const testUser = testUsers[0]
            const userValidCreds = {
                email: testUser.email,
                password: testUser.password
            }
            const subject = testUser.email;
            const payload = {user_id: testUser.id}
            const user = {
                id: testUser.id,
                medData: [],
                totalTime: 0
            }

            const expectedToken = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    subject,
                    algorithm: 'HS256'
                }
            )

            console.log(userValidCreds)
            console.log(user)
            console.log(expectedToken)
            console.log(process.env.JWT_SECRET)

            beforeEach('insert users', () => {
                return db.into('users').insert(testUsers)
            })

            const requiredFields = ['email', 'password'];
            requiredFields.forEach(field => {
                const loginAttemptBody = {
                    email: testUser.email,
                    password: testUser.password
                }

                it(`responds with 400 required error when '${field} is missing`, () => {
                    delete loginAttemptBody[field];

                    return supertest(app)
                        .post('/api/auth/login/')
                        .send(loginAttemptBody)
                        .expect(400, {
                            error: { message: `Missing '${field}' in request body` }
                        })
                })
            })

            it(`responds with 400 'invalid email or password' when bad email`, () => {
                const invalidUserEmail = { email: 'user-not', password: 'existy' };

                return supertest(app)
                    .post('/api/auth/login/')
                    .send(invalidUserEmail)
                    .expect(400, { error: `Incorrect email or password` })
            })
            it(`responds with 400 'invalid email or password' when bad password`, () => {
                const invalidUserPass = { email: testUser.email, password: 'existy' };

                return supertest(app)
                    .post('/api/auth/login/')
                    .send(invalidUserPass)
                    .expect(400, { error: `Incorrect email or password` })
            })

            it(`responds 200 and JWT auth token using secret when valid creds`, () => {
                const userValidCreds = {
                    email: testUser.email,
                    password: testUser.password
                }
                const subject = testUser.email;
                const payload = {user_id: testUser.id}
                const user = {
                    id: testUser.id,
                    medData: [],
                    totalTime: 0
                }

                const expectedToken = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        subject,
                        algorithm: 'HS256'
                    }
                )
                
                return supertest(app)
                    .post('/api/auth/login')
                    .send(userValidCreds)
                    .expect(200, {
                        authToken: expectedToken,
                        user
                    })
            })


        })
    })



})