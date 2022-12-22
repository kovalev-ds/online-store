import { FC } from "react"
import { SortBy } from "../types"
import List from "./List"

const options: { name: string, value: SortBy }[] = [
  { name: "Sort By Price ASC", value: SortBy.priceASC },
  { name: "Sort By Price DESC", value: SortBy.priceDESC },
  { name: "Sort By Rating ASC", value: SortBy.ratingASC },
  { name: "Sort By Rating DESC", value: SortBy.ratingDESC },

]

type SelectControlProps = {
  value?: string;
  handle: (value: string) => void
}

const SelectControl: FC<SelectControlProps> = ({ value, handle }) => {
  return (
    <select value={value ?? 'default'} onChange={(e) => handle(e.target.value)}>
      <option value='default' disabled>Sort Options:</option>
      <List items={options} fn={item => (
        <option key={item.value} value={item.value}>{item.name}</option>
      )} />
    </select>
  )
}

export default SelectControl