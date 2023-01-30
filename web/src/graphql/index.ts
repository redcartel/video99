import { MongoClient, ServerApiVersion } from 'mongodb';
import { ApolloServer, gql } from 'apollo-server-micro';

function loadResolvers(client: MongoClient) {
    return {
        Query: {
            books: async () => {
                await client.connect().catch(e => console.error('error connecting to mongo', e))
                const books = await client.db('staging').collection('testCollection').find().toArray();
                return books
            },
        },
    };
}

export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

export function makeServer(mongoClient?: MongoClient | undefined) {
    if (mongoClient === undefined) {
        mongoClient = new MongoClient(process.env.PRIVATE_MONGOuri!, { serverApi: ServerApiVersion.v1 })
    }
    return new ApolloServer({ typeDefs, resolvers: loadResolvers(mongoClient) })
};

