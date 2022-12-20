import { FC, ReactNode } from "react"

type FilterCardProps = {
  title: string
  children: ReactNode
}

const FilterCard: FC<FilterCardProps> = (props) => {
  const { children, title } = props;
  return (
    <div>
      <h6>{title}</h6>
      <div className="max-h-40 overflow-y-auto scrollbar-hide">{children}</div>
    </div>
  )
}

export default FilterCard