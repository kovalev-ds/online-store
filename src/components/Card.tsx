import { Link } from "react-router-dom"
import { FC } from 'react';

import { Product } from '../types';

type CardProps = {
  item: Product
}

const Card: FC<CardProps> = (props) => {
  const { item: { id, title, thumbnail } } = props

  return (
    <div >
      <Link to={`/products/${id}`}>
        <img src={thumbnail} alt={title} />
      </Link>
      <h2>
        {title}
      </h2>
    </div>
  )
}



export default Card;