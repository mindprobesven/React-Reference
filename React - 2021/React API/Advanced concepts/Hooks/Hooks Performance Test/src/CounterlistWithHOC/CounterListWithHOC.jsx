import withDataSource from './withDataSource';
import CounterList from './CounterList';

const CounterListWithHOC = withDataSource(CounterList);

export default CounterListWithHOC;
