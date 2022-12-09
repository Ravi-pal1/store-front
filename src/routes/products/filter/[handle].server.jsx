import { gql, useRouteParams, useShopQuery } from "@shopify/hydrogen"
import { Suspense } from "react"
import Filters from "../../../components/client/Filters.client"
import { Layout } from "../../../components/server/Layout.server"
import ProductCard from "../../../components/client/ProductCard.client"

function getQuery(handle) {
  return gql`
  query Products {
    products(first: 20, sortKey: ${handle.toUpperCase()}) {
      nodes {
        id
        title
        publishedAt
        handle
        variants(first: 1) {
          nodes {
            id
            image {
              url
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }`
}
const Filter = () => {
  const { handle } = useRouteParams()
  const QUERY = getQuery(handle)
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
  })
  return (
      <Layout>
        <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <Filters/>
        <Suspense>
          <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
            {products?.nodes?.map((product) => (
              <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </Suspense>
        </section>
      </Layout> 
  )
}
export default Filter
