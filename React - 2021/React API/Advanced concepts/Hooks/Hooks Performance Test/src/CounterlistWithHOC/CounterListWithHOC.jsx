import withDataSource from './withDataSource';
import CounterList from '../components/CounterList';

const CounterListWithHOC = withDataSource(CounterList);

export default CounterListWithHOC;
