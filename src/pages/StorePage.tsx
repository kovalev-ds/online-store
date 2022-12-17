import { useLoaderData, Link, Form, useSubmit, LoaderFunction, ActionFunction } from "react-router-dom"
import Card from "../components/Card";
import List from "../components/List";
import { findProducts } from "../http/services/product";
import { Product } from "../types";

const StorePage = () => {
  const products = useLoaderData() as Product[];
  const submit = useSubmit()

  return (
    <div className="container grid grid--store">
      <div>
        filters
      </div>

      <div>
        <div className="py-2">
          <Form>
            <input
              onChange={(e) => submit(e.target.form, { replace: e.target.value !== '' })}
              name="search"
              type="text"
              placeholder="Quick Search" />
          </Form>
        </div>

        <div className="grid grid--products">
          <List items={products} fn={(item) => <Card key={item.id} item={item} />} />
        </div>
      </div>
    </div>
  )
}

export const loader: LoaderFunction = ({request}) => {
  const url = new URL(request.url)
  console.log('loader', url);
  return findProducts()
}

export const action: ActionFunction = (prop) => {
  console.log("search ", prop);

}

export default StorePage