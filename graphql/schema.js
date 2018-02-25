const typeDefs = `
    type Query {
        accounts(user_name: String): [Account]
    }
    
    type Account {
        user_name: String,
        user_password: String
    }

    input AccountInput {
        user_name: String!,
        user_password: String!
    }

    # Allow mutations
    type Mutation {
        createAccount(input: AccountInput): Account
        updatePassword(input: AccountInput): Account
    }
`;

module.exports = typeDefs;
