const db = require('./db');
const { findCelebrity, createCelebrity } = require('./celebrity');

/**
 * @param db - database object
 * @param search - object for where parameter of query
 */
function findMedia(search) {
    if(typeof search != 'undefined') {
        return db.select().from('media').where(search); 
    } else {
        return db.select().from('media');
    }
}

/**
 * @param details - media object to create 
 */
function createMedia(details) {
    if(typeof details.celebrities != 'undefined') {
        return createCelebrity(details.celebrities).then(() => 
            Promise.all(details.celebrities.map(val => findCelebrity(val))).then((res) => {
                details.celebrities = JSON.stringify(res.map(val => ({'id': val[0].id.toString()})));
                return db.insert(details).into('celebrity');
            }))
    } else {
        return db.insert(details).into('media');
    }
}

module.exports = { findMedia, createMedia };