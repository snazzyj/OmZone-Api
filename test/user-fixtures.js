function makeUsersArray() {
    return [
        {
            id: 1,
            name: 'Alex',
            email: 'tester@gmail.com',
            password: 'Password123'
        },
        {
            id: 2,
            name: 'Leyna',
            email: 'test@gmail.com',
            password: 'Password12345'
        }
    ]
}

function testLog() {
    return [
        {
            id: 1,
            minutes: 10,
        },
        {
            id: 1,
            minutes: 15,
        },
        {
            id: 1,
            minutes: 15,
        },
    ]
}

module.exports = {
    makeUsersArray,
    testLog
}