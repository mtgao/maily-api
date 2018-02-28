const db = require('./db');

/**
 * @param db - database object
 * @param search - object for where parameter of query
 */
function findAccount(search) {
    if(typeof search != 'undefined') {
        return db.select().from('accounts').where(search); 
    } else {
        return db.select().from('accounts');
    }
}

/**
 * @param details - object with account username and password
 */
function createAccount(details) {
    return db.insert(details).into('accounts');
}

/**
 * @param details - object with account username to update with new password
 */
function updatePassword(details) {
    return db.update({
        user_password: details.user_password
    })
    .from('accounts')
    .where({
        user_name: details.user_name
    });
}

module.exports = { findAccount, createAccount, updatePassword };
