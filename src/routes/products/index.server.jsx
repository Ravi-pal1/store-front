import { useUrl, gql, useShopQuery } from "@shopify/hydrogen";
import { Layout } from "../../components/server/Layout.server";
import ProductGrid from "../../components/client/ProductGrid.client";

const PAGINATION_SIZE = 4;

const Index = ({ filter, cursor }) => {
  if (filter) {
    filter = JSON.parse(filter);
    console.log(filter);
  }
  const url = useUrl().pathname + useUrl().search;
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
    variables: {
      key: filter?.filter || "PRODUCT_TYPE",
      pageBy: filter?.length || PAGINATION_SIZE,
      cursor,
    },
  });
  return (
    <Layout>
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <ProductGrid collection={products} url={url} />
      </section>
    </Layout>
  );
};

export async function api(request, { queryShop }) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const filter = url.searchParams.get("filter");
  return queryShop({
    query: QUERY,
    variables: {
      key: filter || "PRODUCT_TYPE",
      pageBy: PAGINATION_SIZE,
      cursor,
    },
  });
}

export default Index;
const QUERY = gql`
  query Products($key: ProductSortKeys!, $pageBy: Int!, $cursor: String) {
    products(first: $pageBy, after: $cursor, sortKey: $key) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        publishedAt
        handle
        featuredImage {
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
  }
`;
