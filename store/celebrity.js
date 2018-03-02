const db = require('./db');

/**
 * @param db - database object
 * @param search - object for where parameter of query
 */
function findCelebrity(search) {
    if(typeof search != 'undefined') {
        return db.select().from('celebrity').where(search); 
    } else {
        return db.select().from('celebrity');
    }
}

/**
 * @param details - celebrity object to create 
 */
function createCelebrity(details) {
    return db.insert(details).into('celebrity');
}


module.exports = { findCelebrity, createCelebrity };
