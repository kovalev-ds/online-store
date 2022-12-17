import { useLoaderData, LoaderFunction } from "react-router-dom"
import { findProduct } from "../http/services/product";
import { Product } from "../types";

const ProductPage = () => {
  const product = useLoaderData() as Product

  return (
    <div className="container">
      <div>
        <h1>{product.title}</h1>
        <h2>{product.description}</h2>
      </div>
    </div>
  )
}

export const loader: LoaderFunction = ({ params }) => {

  const { id } = params;
  if (!id) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }

  return findProduct(id)
}

export default ProductPage;