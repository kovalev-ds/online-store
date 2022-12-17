import { ReactElement } from "react";

type ListProps<T> = {
  items: Array<T>;
  fn: (data: T) => ReactElement
}

const List = <T,>({ items, fn }: ListProps<T>) => {
  return <>{items.map(fn)}</>
}

export default List;