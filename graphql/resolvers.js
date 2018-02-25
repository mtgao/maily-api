const { findAccount, createAccount, updatePassword } = require('../store/account');

const resolvers = {
    Query: {
        accounts: ( _, { user_name } ) =>
            findAccount({ 
                user_name: user_name 
            })
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
            }))
    }
};

module.exports = resolvers;
