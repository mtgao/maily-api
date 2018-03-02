const typeDefs = `

    type Query {
        accounts(user_name: String): [Account]
        celebrity(id: ID,
                  firstname: String, 
                  lastname: String,
                  firstname_birth: String,
                  lastname_birth: String,
                  fullname_native: String,
                  gender: String,
                  occupation: String,
                  nationality: String,
                  dob: String): [Celebrity]
        media(id: ID,
              name: String,
              description: String,
              link: String,
              category: String): [Media]
    }
    
    type Account {
        user_name: String,
        user_password: String
    }

    type Celebrity {
        id: ID,
        firstname: String!, 
        lastname: String!,
        firstname_birth: String!,
        lastname_birth: String!,
        fullname_native: String!,
        gender: String,
        occupation: String,
        nationality: String,
        dob: String,
        appearances: [Media]
    }

    type Media {
        id: ID,
        name: String!,
        description: String,
        link: String!,
        category: String,
        celebrities: [Celebrity]
    }

    input AccountInput {
        user_name: String!,
        user_password: String!
    }

    input CelebrityInput {
        id: ID,
        firstname: String!, 
        lastname: String!,
        firstname_birth: String!,
        lastname_birth: String!,
        fullname_native: String!,
        gender: String,
        occupation: String,
        nationality: String,
        dob: String
    }

    input MediaInput {
        id: ID,
        name: String!,
        description: String,
        link: String!,
        category: String
    }

    # Allow mutations
    type Mutation {
        createAccount(input: AccountInput): Account
        updatePassword(input: AccountInput): Account
        createCelebrity(input: CelebrityInput): Celebrity
        createMedia(input: MediaInput): Media
        addCelebrityToMedia(link: String!, fullname_native: String!, dob: String!): Media
    }
`;

module.exports = typeDefs;
