import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import UserType, { UserConnection } from '../modules/User/UserType';
import { nodeField } from '../interface/Node';

import * as UserLoader from '../modules/User/UserLoader';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: nodeField,
    me: {
      type: UserType,
      description: 'Me is the logged user',
      resolve: async (root, args, context) => UserLoader.load(context, context.user && context.user.id),
    },
    users: {
      type: GraphQLNonNull(UserConnection.connectionType),
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: async (obj, args, context) => await UserLoader.loadUsers(context, args),
    },
  }),
});
