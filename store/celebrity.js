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

                // check to see if our media Id already exists
                var occurs = false;
                for(var k in res.appearances) {
                    if(res.appearances[k].id == id) {
                      occurs = true;
                    }
                }

                // if it doesn't, push a new element to our json array
                if(!occurs) {
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

                // delete media by id in json array (if it exists)
                for(var k in res.appearances) {
                    if(res.appearances[k].id == id) {
                        res.appearances.splice(k, 1);
                        return db.from('celebrity').where(unique_index).update({
                            appearances: JSON.stringify(res.appearances)
                        });
                    }
                }
            } 
        });
    });
}

module.exports = { findCelebrity, createCelebrity, addMediaToCelebrity, removeMediaFromCelebrity };
