import { useLoaderData, LoaderFunction } from 'react-router-dom';
import { fetchProduct } from '../api/products';
import { Product } from '../types';

const ProductPage = () => {
  const product = useLoaderData() as Product;

  console.log(product);

  const images = product.images.map((e) => (
    <img className="max-w-[150px]" src={e} alt="product foto" key={e.toString()} />
  ));

  return (
    <div className="container">
      {/* <div>Хлебные крошки</div> */}
      <div className="bg-white rounded-xl">
        <div className="text-center bg-slate-400 rounded-t-xl">
          <h1 className="py-2">{product.title}</h1>
        </div>
        <div className="flex">
          <div className="">{images}</div>
          {/* <div>main img</div> */}
          <div className="flex flex-col">
            <h2>{product.description}</h2>
            <h2>{product.discountPercentage}</h2>
            <h2>{product.rating}</h2>
            <h2>{product.stock}</h2>
            <h2>{product.brand}</h2>
            <h2>{product.category}</h2>
          </div>
          <div>
            <h2>{product.price}$</h2>
            <button>Add To Cart {/* состояние корзины */}</button>
            <button>BUY NOW</button>
          </div>
        </div>
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
