const { findAccount, createAccount, updatePassword } = require('../store/account');
const { findCelebrity, createCelebrity } = require('../store/celebrity');
const { findMedia, createMedia } = require('../store/media');

const resolvers = {
    Query: {
        accounts: ( _, { user_name } ) =>
            findAccount({ 
                user_name: user_name 
            }),
        celebrity: ( _, args ) => 
            findCelebrity(args),
        media: ( _, args ) => 
            findMedia(args)
    },
    Celebrity: {
        appearances: ( { appearances } ) => 
            Promise.all(appearances.map(val => findMedia(val))).then(res => 
                res.map(val => ({...val[0],}));
            )
    },
    Media: {
        celebrities: ( { celebrities } ) => 
            Promise.all(celebrities.map(val => findCelebrity(val))).then(res => 
                res.map(val => ({...val[0],}));
            )
    },
    Mutation: {
        createAccount: ( _, { input }) => 
            createAccount(input).then(() => ({
                    user_name: input.user_name,
                    user_password: input.user_password
             })),
        updatePassword: ( _, { input }) =>
            updatePassword(input).then(() => ({
                    user_name: input.user_name,
                    user_password: input.user_password
            })),
        createCelebrity: ( _, { input }) => 
            createCelebrity(input).then(() => input),
        createMedia: ( _, { input }) => 
            createMedia(input).then(() => input)
    }
};

module.exports = resolvers;
