import { useLoaderData, LoaderFunction } from 'react-router-dom';
import { fetchProduct } from '../api/products';
import { Product } from '../types';

const ProductPage = () => {
  const product = useLoaderData() as Product;

  return (
    <div className="container">
      <div>
        <h1>{product.title}</h1>
        <h2>{product.description}</h2>
      </div>
    </div>
  );
};

export const loader: LoaderFunction = ({ params }) => {
  const { id } = params;

  if (id === null) {
    throw new Response('', {
      status: 404,
      statusText: `Not found`,
    });
  }

  return fetchProduct(id);
};

export default ProductPage;
