import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import cors from 'cors';
import schema from './schema';
import { PubSub } from 'graphql-subscriptions';

(async () => {

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get('/_ping', (req, res) => {
        res.send('pong');
    });

    const pubsub = new PubSub();
    const server = new ApolloServer({
        schema,
        context: () => ({ pubsub }),
    });

    await server.start();
    const httpServer = http.createServer(app);

    const port = process.env.PORT || 4000;

    server.applyMiddleware({ app });

    httpServer.listen(port, () => {
        console.log('🚀 Now browse to http://localhost:4000' + server.graphqlPath + ' 🚀')
    });



})();
// server.start().then(res => {
//     const port = process.env.PORT || 4000;
//     server.applyMiddleware({ app });
//     // app.listen(port, () =>
//     //     console.log('🚀 Now browse to http://localhost:4000' + server.graphqlPath + ' 🚀')
//     // )

//     const httpServer = http.createServer(app);
//     server.installSubscriptionHandlers(httpServer);

//     httpServer.listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//     });

// });