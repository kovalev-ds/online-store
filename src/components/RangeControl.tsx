import { FC } from 'react';

type RangeControlProps = {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  handle: (min: number, max: number) => void;
};

const RangeControl: FC<RangeControlProps> = ({ min, max, minValue, maxValue, handle }) => {
  return (
    <div className="flex flex-col">
      <div className="multirange">
        <input
          type="range"
          value={minValue}
          onChange={(e) => handle(e.target.valueAsNumber, maxValue)}
          min={min}
          max={max}
        />
        <input
          type="range"
          value={maxValue}
          onChange={(e) => handle(minValue, e.target.valueAsNumber)}
          min={min}
          max={max}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>{minValue}</div>
        <div>{maxValue}</div>
      </div>
    </div>
  );
};

export default RangeControl;
