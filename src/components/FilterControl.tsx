import { FC, useEffect, useState } from "react";

type FilterControlProps = {
  value: string;
  selected: boolean;
  handle: (checked: boolean) => void
}

const FilterControl: FC<FilterControlProps> = (props) => {
  const { value, handle, selected } = props;

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={value}
          checked={selected}
          onChange={(e) => handle(e.target.checked)}
        />
        <span>{value}</span>
      </label>
    </div>
  )
}

export default FilterControl;