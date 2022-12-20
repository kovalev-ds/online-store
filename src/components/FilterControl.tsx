import { FC, useEffect, useState } from "react";

type FilterControlProps = {
  value: string;
  selected: boolean;
  handle: (checked: boolean) => void
}

const FilterControl: FC<FilterControlProps> = (props) => {
  const { value, handle, selected } = props;

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    handle(checked)
  }, [checked])

  useEffect(() => {
    setChecked(() => selected)
  }, [selected])

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={value}
          checked={checked}
          onChange={() => setChecked(prev => !prev)}
        />
        <span>{value}</span>
      </label>
    </div>
  )
}

export default FilterControl;