import clsx from "clsx"
import { Link, useSearchParams } from "react-router-dom"
import { json, LoaderFunction, useLoaderData } from "react-router-dom"
import Button from "../components/Button"
import Card from "../components/Card"
import FilterCard from "../components/FilterCard"
import FilterControl from "../components/FilterControl"
import List from "../components/List"
import SearchControl from "../components/SearchControl"
import { fetchBrands, fetchCategories, findProducts } from "../http/services/product"
import { useStoreContext } from "../store"
import { FilterOptions, sortBy } from "../types"

const StorePage = () => {

  const { addToCart, removeFromCart, cart } = useStoreContext()
  const { products, categories, brands } = useLoaderData() as LoaderData
  const [search, setSearch] = useSearchParams()

  return (
    <div className="container">
      <div className="grid grid--store">
        <div className="space-y-6">
          <FilterCard title="categories">
            <List items={categories} fn={(value) => (
              <FilterControl
                key={value}
                value={value}
                selected={Boolean(search.get("category")?.includes(value))}
                handle={(isChecked) => {
                  const current = search.get("category");
                  const SEPARATOR = "↕";
                  if (isChecked) {
                    if (!current) {
                      search.set('category', value)
                    } else {
                      search.set("category", [...current.split(SEPARATOR), value].join(SEPARATOR))
                    }
                  } else {
                    if (current) {
                      const v = current.split(SEPARATOR).filter(v => v !== value).join(SEPARATOR)
                      v ? search.set("category", v) : search.delete("category")
                    }
                  }
                  setSearch(search);
                }} />
            )} />
          </FilterCard>

          <FilterCard title="brands">
            <List items={brands} fn={(value) => (
              <FilterControl
                key={value}
                value={value}
                selected={Boolean(search.get("brand")?.includes(value))}
                handle={(isChecked) => {
                  const current = search.get("brand");
                  const SEPARATOR = "↕";
                  if (isChecked) {
                    if (!current) {
                      search.set('brand', value)
                    } else {
                      search.set("brand", [...current.split(SEPARATOR), value].join(SEPARATOR))
                    }
                  } else {
                    if (current) {
                      const v = current.split(SEPARATOR).filter(v => v !== value).join(SEPARATOR)
                      v ? search.set("brand", v) : search.delete("brand")
                    }
                  }
                  setSearch(search);
                }} />
            )} />

          </FilterCard>
        </div>
        <div>
          <div className="flex items-center justify-between py-4">
            <select
              onChange={(e) => { search.set("sort", e.target.value); setSearch(search) }}
              value={search.get("sort") ?? ''}
            >
              <option value={sortBy.priceASC}>Sort By Price ASC</option>
              <option value={sortBy.priceDESC}>Sort By Price DESC</option>
              <option value={sortBy.ratingASC}>Sort By Rating ASC</option>
              <option value={sortBy.ratingDESC}>Sort By Rating DESC</option>
            </select>
            <div className="w-[20ch]">found: <span>{products.length}</span></div>
            <SearchControl
              search={search.get("search") ?? ''}
              handle={(value) => {
                value
                  ? search.set('search', value)
                  : search.delete('search');
                setSearch(search, { replace: value !== '' })
              }
              }
            />
            <div className="space-x-4">
              <button onClick={() => { search.set("size", "4"); setSearch(search) }}>4x4</button>
              <button onClick={() => { search.set("size", "6"); setSearch(search) }}>6x6</button>
            </div>
          </div>
          <div className={clsx("grid", `grid--product-grid-${search.get("size") ?? 4}`)}>
            <List items={products} fn={(item) => (
              <Card key={item.id}>
                <Link to={`products/${item.id}`}>
                  <Card.Media src={item.thumbnail} alt={item.title} />
                </Link>
                <h2 className="text-center">{item.title}</h2>
                <h4>{item.price}</h4>
                <h5>{item.rating}</h5>
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
  products: Awaited<ReturnType<typeof findProducts>>
  categories: Awaited<ReturnType<typeof fetchCategories>>
  brands: Awaited<ReturnType<typeof fetchBrands>>

}

export const loader: LoaderFunction = async ({ request }) => {

  const params = Object.fromEntries(new URL(request.url).searchParams) as FilterOptions;

  return json<LoaderData>({
    products: await findProducts(params),
    categories: await fetchCategories(),
    brands: await fetchBrands()
  })
}
