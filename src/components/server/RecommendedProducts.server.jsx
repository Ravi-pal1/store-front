import { useShopQuery, CacheLong, gql } from "@shopify/hydrogen";
import ProductCard from "../client/ProductCard.client";
const RecommendedProducts = ({id}) => {
  const getQuery = (id) => {
    return `query relatedProducts{
      products: productRecommendations(productId: "${id}"){
          id
          title
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
    }`
  }
    const query = getQuery(id)
    const {
        data: { products },
      } = useShopQuery({
        query: query,
        cache: CacheLong(),
      });
  return (
    <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <h3 className="text-3xl font-bold">Recommended Products</h3>
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
            {
                products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    </section>
  )
}
export default RecommendedProducts