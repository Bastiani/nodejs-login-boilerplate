import { GraphQLObjectType } from 'graphql';

import UserAddMutation from '../modules/User/mutations/UserAddMutation';
import UserLoginMutation from '../modules/User/mutations/UserLoginMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    UserLoginMutation,
    UserAddMutation,
  }),
});
