import { FC, useEffect, useState } from "react"

type SearchControlProps = {
  search: string | string[];
  handle: (value: string) => void;
}

const SearchControl: FC<SearchControlProps> = (props) => {
  const { search = '', handle } = props

  return (
    <div>
      <input
        onChange={(e) => handle(e.target.value)}
        value={search}
        name="search"
        type="search"
        placeholder="Quick Search" />
    </div>
  )
}

export default SearchControl