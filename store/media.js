const db = require('./db');

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
    return db.insert(details).into('media');
}

/**
 * @param link - link to the unique media object
 * @param fullname_native - used with dob to form unique constraint to fetch celebrity ID
 * @param dob - ^ 
 */
function addCelebrityToMedia(link, fullname_native, dob) {

    // first fetch the celebrity item with unique index
    return db.select().first().from('celebrity').where({
        fullname_native: fullname_native,
        dob: dob
    }).then(({ id }) => {

        // then fetch the media item with link as the unique index
        return db.select().first().from('media').where({link: link}).then((res) => {
            if(res.celebrities) {

                // if celebrity item doesnt exist, add a new element to our json array
                if(!res.appearances.map(val => val.id).includes(id)) {
                    res.celebrities.push({'id': id.toString()});
                    return db.from('media').where({link: link}).update({
                        celebrities: JSON.stringify(res.celebrities)
                    });
                }
            } else {
                // if celebrities field is undefined, create a new json array and update
                res.celebrities = [{'id': id.toString()}];
                return db.from('media').where({link: link}).update({
                    celebrities: JSON.stringify(res.celebrities)
                });
            }
        });
    });
}

/**
 * Remove celebrity from the celebrities field of a media item
 * @param link - link to the unique media object
 * @param fullname_native - used with dob to form unique index to fetch celebrity ID
 * @param dob - ^ 
 */
function removeCelebrityFromMedia(link, fullname_native, dob) {

    // first fetch the celebrity item with our unique index
    return db.select().first().from('celebrity').where({
        fullname_native: fullname_native,
        dob: dob
    }).then(({ id }) => {

        // then fetch the media item with link as unique index
        return db.select().first().from('media').where({link: link}).then((res) => {
            if(res.celebrities) {

                res.celebrities = res.appearances.filter(val => val.id != id);

                // delete media by id in json array (if it exists)
                return db.from('media').where({link: link}).update({
                            celebrities: JSON.stringify(res.celebrities)
                });
            } 
        });
    });
}


module.exports = { findMedia, createMedia, addCelebrityToMedia, removeCelebrityFromMedia };
