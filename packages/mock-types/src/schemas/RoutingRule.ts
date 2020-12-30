// typescript import
import { ContextType, fieldsType } from '../mock';

// import
import mock from '../mock';

// graphql typescript
import { routingRuleFragment as routingRuleFragmentType } from './gqls/__generated__/routingRuleFragment';

// definition
const findRouting = (id: string): routingRuleFragmentType => ({
  __typename: 'RoutingRule',
  id,
  toPath: `/${id}_toPath`,
  fromPath: `/${id}_fromPath`,
});

export default mock.add<routingRuleFragmentType>('RoutingRule', [
  ({ id }: { id: string }, _: unknown, { isList }: ContextType) =>
    !isList
      ? findRouting(id)
      : Object.keys(findRouting('id')).reduce(
          (result, key: keyof routingRuleFragmentType) => ({
            ...result,
            [key]: ({ id: routingId }: { id: string }) => {
              return findRouting(routingId)[key];
            },
          }),
          {} as fieldsType<routingRuleFragmentType>,
        ),
]);
