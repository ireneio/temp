// typescript import
import { LogInput } from '../../../__generated__/meepshop';

// definition
export const resolvers = {
  Mutation: {
    log: async (_: unknown, { input: { type, data } }: { input: LogInput }) => {
      try {
        await fetch('/log', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            ...data,
            type,
            userAgent: window.navigator.userAgent,
          }),
        });

        return 'OK';
      } catch (e) {
        return 'Fail';
      }
    },
  },
};
