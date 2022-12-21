import RenderProductsCollection from "../client/RenderProductsCollection.client"
import { useShopQuery, CacheLong, gql } from "@shopify/hydrogen";

const BestSelling = () => {
    const {
        data: { products },
      } = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
      });
  return (
    <RenderProductsCollection
        products={products}
        title = "Best Selling"
    />
  )
}

export default BestSelling
const QUERY = gql`
query Products {
  products(first: 20, query: "collection_type:smart", sortKey: BEST_SELLING)  {
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