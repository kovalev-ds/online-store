import clsx from "clsx"
import { AwaitProps, Link } from "react-router-dom"
import { json, LoaderFunction, useLoaderData } from "react-router-dom"

import Button from "../components/Button"
import Card from "../components/Card"
import FilterCard from "../components/FilterCard"
import FilterControl from "../components/FilterControl"
import List from "../components/List"
import RangeControl from "../components/RangeControl"
import SearchControl from "../components/SearchControl"
import SelectControl from "../components/SelectControl"

import { prepareParams, useSearchState } from "../hooks/useSearchState"
import { fetchBrands, fetchCategories, fetchMinMaxPrice, fetchProducts } from "../http/services/product"
import { useStoreContext } from "../store"
import { FilterOptions } from "../types"

const StorePage = () => {

  const { addToCart, removeFromCart, cart } = useStoreContext()
  const { products, categories, brands, prices } = useLoaderData() as LoaderData

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
          <FilterCard title="price">
            <RangeControl
              min={prices.min}
              max={prices.max}
              minValue={Number(params.price?.at(0) ?? prices.min)}
              maxValue={Number(params.price?.at(1) ?? prices.max)}
              handle={(min, max) => {
                setParams(builder => builder.set("price", [`${min}`, `${max}`]))
              }} />
          </FilterCard>
        </div>
        <div>
          <div className="flex items-center justify-between py-4">
            <SelectControl
              value={params.sort?.toString()}
              handle={value => setParams(builder => builder.set("sort", value))} />

            <div className="w-[20ch]">found: <span>{products.length}</span></div>

            <SearchControl
              value={params.search ?? ""}
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
  prices: Awaited<ReturnType<typeof fetchMinMaxPrice>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const params = prepareParams<FilterOptions>(new URL(request.url).searchParams);

  return json<LoaderData>({
    products: await fetchProducts(params),
    categories: await fetchCategories(),
    brands: await fetchBrands(),
    prices: await fetchMinMaxPrice()
  })
}
