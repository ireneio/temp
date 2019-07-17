// import
import memoizeOne from 'memoize-one';
import fx from 'money';

// definition
export default memoizeOne(({ base, rates, timestamp }) => {
  fx.base = base;
  fx.rates = rates;
  fx.timestamp = timestamp;
});
