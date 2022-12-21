import clsx from "clsx"
import { Link } from "react-router-dom"
import { json, LoaderFunction, useLoaderData } from "react-router-dom"

import Button from "../components/Button"
import Card from "../components/Card"
import FilterCard from "../components/FilterCard"
import FilterControl from "../components/FilterControl"
import List from "../components/List"
import SearchControl from "../components/SearchControl"

import { prepareParams, useSearchState } from "../hooks/useSearchState"
import { fetchBrands, fetchCategories, fetchProducts } from "../http/services/product"
import { useStoreContext } from "../store"
import { FilterOptions, sortBy } from "../types"

const StorePage = () => {

  const { addToCart, removeFromCart, cart } = useStoreContext()
  const { products, categories, brands } = useLoaderData() as LoaderData

  const [params, setParams] = useSearchState<FilterOptions>()

  console.log('render STORE PAGE');

  return (
    <div className="container">
      <div className="grid grid--store">
        <div className="space-y-6">
          <FilterCard title="categories">
            <List items={categories} fn={(value) => (
              <FilterControl
                key={value}
                value={value}
                selected={Boolean(params.category?.includes(value))}
                handle={(isChecked) =>
                  setParams(builder => isChecked
                    ? builder.append("category", value)
                    : builder.remove("category", value))}
              />
            )} />
          </FilterCard>

          <FilterCard title="brands">
            <List items={brands} fn={(value) => (
              <FilterControl
                key={value}
                value={value}
                selected={Boolean(params.brand?.includes(value))}
                handle={(isChecked) => setParams(builder => isChecked
                  ? builder.append("brand", value)
                  : builder.remove("brand", value))
                } />
            )} />

          </FilterCard>
        </div>
        <div>
          <div className="flex items-center justify-between py-4">
            <select
              value={params.search?.toString()}
              onChange={(e) => setParams(builder => builder.set("sort", e.target.value))}>
              <option value={sortBy.priceASC}>Sort By Price ASC</option>
              <option value={sortBy.priceDESC}>Sort By Price DESC</option>
              <option value={sortBy.ratingASC}>Sort By Rating ASC</option>
              <option value={sortBy.ratingDESC}>Sort By Rating DESC</option>
            </select>
            <div className="w-[20ch]">found: <span>{products.length}</span></div>

            <SearchControl
              search={params.search ?? ""}
              handle={(value) => setParams(builder => builder.set("search", value))}
            />
            <div className="space-x-4">
              <button onClick={() => setParams(builder => builder.set("size", "4"))}>4x4</button>
              <button onClick={() => setParams(builder => builder.set("size", "6"))}>6x6</button>
            </div>
          </div>
          <div className={clsx("grid", `grid--product-grid-${params.size ?? 4}`)}>
            <List items={products} fn={(item) => (
              <Card key={item.id}>
                <Link to={`products/${item.id}`}>
                  <Card.Media src={item.thumbnail} alt={item.title} />
                </Link>
                <h2 className="text-center">{item.title}</h2>
                <h3>BRAND: {item.brand}</h3>
                <h4>PRICE: {item.price}</h4>
                <h5>RATING: {item.rating}</h5>
                <Card.Actions>
                  {cart.includes(item)
                    ? <Button onClick={() => removeFromCart(item)}>Drop From Cart</Button>
                    : <Button onClick={() => addToCart(item)}>Add To Cart</Button>
                  }
                </Card.Actions>
              </Card>
            )} />
          </div>
        </div>
      </div>
    </div >
  )
}

export default StorePage

type LoaderData = {
  products: Awaited<ReturnType<typeof fetchProducts>>
  categories: Awaited<ReturnType<typeof fetchCategories>>
  brands: Awaited<ReturnType<typeof fetchBrands>>

}

export const loader: LoaderFunction = async ({ request }) => {
  const params = prepareParams<FilterOptions>(new URL(request.url).searchParams);

  return json<LoaderData>({
    products: await fetchProducts(params),
    categories: await fetchCategories(),
    brands: await fetchBrands()
  })
}
