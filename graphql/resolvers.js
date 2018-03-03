const { 
    findAccount, 
    createAccount, 
    updatePassword 
} = require('../store/account');
const { 
    findCelebrity, 
    createCelebrity, 
    addMediaToCelebrity, 
    removeMediaFromCelebrity
} = require('../store/celebrity');
const { 
    findMedia, 
    createMedia, 
    addCelebrityToMedia, 
    removeCelebrityFromMedia 
} = require('../store/media');

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
        appearances: ( { appearances } ) => {
            if(appearances) {
                return Promise.all(appearances.map(val => findMedia(val))).then(res => {
                    if (res) {
                        return res.map(val => ({...val[0],}));
                    }
                })
            }
        }
    },
    Media: {
        celebrities: ( { celebrities } ) => {
            if(celebrities) {
                return Promise.all(celebrities.map(val => findCelebrity(val))).then(res => { 
                    if(res) {
                        return res.map(val => ({...val[0],}));
                    }
                })
            }
        }
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
            createMedia(input).then(() => input),

        addCelebrityToMedia: ( _, { link, fullname_native, dob}) =>
            addCelebrityToMedia(link, fullname_native, dob).then(() =>
                findMedia({link: link}).then((res) => res[0])),

        removeCelebrityFromMedia: ( _, { link, fullname_native, dob}) =>
            removeCelebrityFromMedia(link, fullname_native, dob).then(() =>
                findMedia({link: link}).then((res) => res[0])),

        addMediaToCelebrity: ( _, { link, fullname_native, dob}) =>
            addMediaToCelebrity(fullname_native, dob, link).then(() =>
                findCelebrity({fullname_native: fullname_native, dob: dob}).then((res) =>
                    res[0])),

        removeMediaFromCelebrity: ( _, { link, fullname_native, dob}) =>
            removeMediaFromCelebrity(fullname_native, dob, link).then(() =>
                findCelebrity({fullname_native: fullname_native, dob: dob}).then((res) =>
                    res[0]))
    }
};

module.exports = resolvers;