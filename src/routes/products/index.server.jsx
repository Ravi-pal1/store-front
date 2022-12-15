import { gql, useShopQuery } from "@shopify/hydrogen"
import { Layout } from "../../components/server/Layout.server";
import ProductCard from "../../components/client/ProductCard.client";
import Filters from "../../components/client/Filters.client";
const Index = ({ filter }) => {
    const {
        data: { products }, 
    } = useShopQuery({
        query: QUERY,
        variables: {
          key: filter || "BEST_SELLING"
        }
    }); 
  return (
    <Layout>
        <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
            <Filters/>
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
            {
                products?.nodes?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
            </div>
        </section>
    </Layout>
  )
}

export default Index
const QUERY = gql`
query Products($key: ProductSortKeys!) {
  products(first: 20, query: "collection_type:smart", sortKey: $key)  {
    nodes {
      id
      title
      publishedAt
      handle
      featuredImage{
        url
        altText
        width
        height
      }
      variants(first: 1) {
        nodes {
          id
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