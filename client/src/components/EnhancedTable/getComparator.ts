import {descendingComparator} from './descendingComparator';

type Order = 'asc' | 'desc';
// eslint-disable-next-line
export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key, // eslint-disable-next-line
): (a: {[key in Key]: any}, b: {[key in Key]: any}) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
