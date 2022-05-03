import { ApolloServer, gql } from 'apollo-server-express';
import schema from '../../schema';
 
describe('Query.chats', () => {
  it('should fetch all chats', async () => {
    const server = new ApolloServer({ schema });
 
    const res = await server.executeOperation({
        query: gql`
          query GetChats {
            chats {
              id
              name
              picture
              lastMessage {
                id
                content
                createdAt
              }
            }
          }
        `,
      });     
 
    expect(res.data).toBeDefined();
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });
});