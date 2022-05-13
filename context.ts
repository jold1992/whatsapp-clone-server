import { PubSub } from 'graphql-subscriptions';

export type MyContext = {
    pubsub: PubSub;
};