const MedtrackerService = {

    insertNewLog(knex, newLog) {
        return knex
            .insert(newLog)
            .into('meditation_log')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }

}

module.exports = MedtrackerService;