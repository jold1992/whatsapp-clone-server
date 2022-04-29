import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import schema from './schema';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/_ping', (req, res) => {
    res.send('pong');
});


const server = new ApolloServer({ schema });

server.start().then(res => {
    const port = process.env.PORT || 4000;
    server.applyMiddleware({ app });
    app.listen(port, () =>
        console.log('🚀 Now browse to http://localhost:4000' + server.graphqlPath + ' 🚀')
    )
});