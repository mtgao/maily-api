const db = require('./db');
const { findMedia, createMedia } = require('./media');

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
    if(typeof details.appearances != 'undefined') {
        return createMedia(details.appearances).then(() => 
            Promise.all(details.appearances.map(val => findMedia(val))).then((res) => {
                details.appearances = JSON.stringify(res.map(val => ({'id': val[0].id.toString()})));
                return db.insert(details).into('celebrity');
            }))
    } else {
        return db.insert(details).into('celebrity');
    }
}


module.exports = { findCelebrity, createCelebrity };
