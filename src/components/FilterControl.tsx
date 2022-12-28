import { FC, useEffect, useState } from 'react';

type FilterControlProps = {
  value: string;
  selected: boolean;
  handle: (checked: boolean) => void;
};

const FilterControl: FC<FilterControlProps> = (props) => {
  const { value, handle, selected } = props;

  return (
    <div>
      <label>
        <input
          className="h-3 w-3 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-gray-600 focus:ring-white transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left ml-2 mr-2 mt-2 cursor-pointer "
          type="checkbox"
          value={value}
          checked={selected}
          onChange={(e) => handle(e.target.checked)}
        />
        <span className="text-xs">{value}</span>
      </label>
    </div>
  );
};

export default FilterControl;
