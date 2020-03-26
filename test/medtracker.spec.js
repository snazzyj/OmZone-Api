const {expect} = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeUsersArray } = require('./user-fixtures');
const TEST_DB_URL = "postgresql://Alex:1@localhost/omzone-api"

describe('Medtracker Endpoint', function () {
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

    describe('Given there are users', () => {
        const testUsers = makeUsersArray();
        const testUser = testUsers[0]
        const data = {
            id: testUser.id,
            minutes: 15
        }

        beforeEach('insert users', () => {
            return db.into('users').insert(testUsers)
        })

        it('POST Req into Meditation_log', () => {
            return supertest(app)
                .post(`/api/medtracker`)
                .send(data)
                .expect(201)
        })
    })

})
