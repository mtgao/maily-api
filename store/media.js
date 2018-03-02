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

    // first fetch the celebrity item with unique constraint
    return db.select().first().from('celebrity').where({
      fullname_native: fullname_native,
      dob: dob
    }).then(({ id }) => {

      // then fetch the media item with link as the unique constraint
      return db.select().first().from('media').where({link: link}).then((res) => {
        if(res.celebrities) {

          // check to see if our celebrity Id already exists 
          var occurs = false;
          for(var k in res.celebrities) {
            if(res.celebrities[k].id == id) {
              occurs = true;
            }
          }

          // if it doesn't, push a new element to our json array
          if(!occurs) {
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


module.exports = { findMedia, createMedia, addCelebrityToMedia };