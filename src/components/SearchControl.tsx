import { FC } from 'react';

type SearchControlProps = {
  value: string | string[];
  handle: (value: string) => void;
};

const SearchControl: FC<SearchControlProps> = (props) => {
  const { value = '', handle } = props;

  return (
    <div>
      <input
        onChange={(e) => handle(e.target.value)}
        value={value}
        name="search"
        type="search"
        placeholder="Quick Search"
      />
    </div>
  );
};

export default SearchControl;
