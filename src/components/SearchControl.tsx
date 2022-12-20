import { FC, useEffect, useState } from "react"

type SearchControlProps = {
  search: string;
  handle: (value: string) => void;
}

const SearchControl: FC<SearchControlProps> = (props) => {
  const { search = '', handle } = props

  const [value, setValue] = useState("");

  useEffect(() => {
    handle(value)
  }, [value])

  useEffect(() => {
    setValue(() => search)
  }, [search])

  return (
    <div>
      <input
        onChange={(e) => setValue(() => e.target.value)}
        value={value}
        name="search"
        type="search"
        placeholder="Quick Search" />
    </div>
  )
}

export default SearchControl