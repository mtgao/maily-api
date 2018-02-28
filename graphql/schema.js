const typeDefs = `

    enum Gender {
      male
      female
    }

    enum Category {
        interview
        talk_show
        commercial
        variety_show
        music_show
        radio_show
        television
        movie
        vlive
        misc
    }

    type Query {
        accounts(user_name: String): [Account]
        celebrity(id: ID, 
                  name: String, 
                  gender: Gender,
                  occupation: String,
                  nationality: String,
                  dob: String): [Celebrity]
        media(id: ID,
              name: String,
              description: String,
              link: String,
              category: Category): [Media]
    }
    
    type Account {
        user_name: String,
        user_password: String
    }

    type Celebrity {
        id: ID,
        name: String!,
        gender: Gender,
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
        category: Category,
        celebrities: [Celebrity]
    }

    input AccountInput {
        user_name: String!,
        user_password: String!
    }

    input CelebrityInput {
        id: ID,
        name: String!,
        gender: String,
        occupation: String,
        nationality: String,
        dob: String,
        appearances: [MediaInput]
    }

    input MediaInput {
        id: ID,
        name: String!,
        description: String,
        link: String!,
        category: Category,
        celebrities: [CelebrityInput]
    }

    # Allow mutations
    type Mutation {
        createAccount(input: AccountInput): Account
        updatePassword(input: AccountInput): Account

        createCelebrity(input: CelebrityInput): Celebrity

        createMedia(input: MediaInput): Media
    }
`;

module.exports = typeDefs;
