const db = require('./db');

/**
 * @param db - database object
 * @param search - object for where parameter of query
 */
function findCelebrity(search) {
    if(!search) {
        return db.select().from('celebrity'); 
    } else {
        return db.select().from('celebrity').where(search);
    }
}

/**
 * @param details - celebrity object to create 
 */
function createCelebrity(details) {
    return db.insert(details).into('celebrity');
}

/**
 * Add media item to appearances field of a celebrity
 * @param fullname_native - used with dob to form unique index to fetch celebrity ID
 * @param dob - ^ 
 * @param link - link to the unique media object
 */
function addMediaToCelebrity(fullname_native, dob, link) {

    // first fetch the media item with link as unique index
    return db.select().first().from('media').where({
        link: link
    }).then(({ id }) => {
        var unique_index = {fullname_native: fullname_native, dob: dob};

        // then fetch the celebrity item with name + dob as unique index
        return db.select().first().from('celebrity').where(unique_index).then((res) => {
            if(res.appearances) {

                // if a media item doesn't exist, push a new element to json array
                if(!res.appearances.map(val => val.id).includes(id)) {
                    res.appearances.push({'id': id.toString()});
                    return db.from('celebrity').where(unique_index).update({
                        appearances: JSON.stringify(res.appearances)
                    });
                }
            } else {
                // if appearances field is undefined, create a new json array and update
                res.appearances = [{'id': id.toString()}];
                return db.from('celebrity').where(unique_index).update({
                    appearances: JSON.stringify(res.appearances)
                });
            }
        });
    });
}


/**
 * Remove media from appearances field of a celebrity
 * @param fullname_native - used with dob to form unique index to fetch celebrity ID
 * @param dob - ^ 
 * @param link - link to the unique media object
 */
function removeMediaFromCelebrity(fullname_native, dob, link) {

    // first fetch the media item with our unique index
    return db.select().first().from('media').where({
        link: link
    }).then(({ id }) => {
        var unique_index = {fullname_native: fullname_native, dob: dob};

        // then fetch the celebrity item with name + dob as unique index
        return db.select().first().from('celebrity').where(unique_index).then((res) => {
            if(res.appearances) {

                res.appearances = res.appearances.filter(val => val.id != id);

                // delete media by id in json array (if it exists)
                return db.from('celebrity').where(unique_index).update({
                    appearances: JSON.stringify(res.appearances)
                });
            } 
        });
    });
}

module.exports = { findCelebrity, createCelebrity, addMediaToCelebrity, removeMediaFromCelebrity };
