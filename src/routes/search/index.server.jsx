import { useUrl, gql, useShopQuery } from "@shopify/hydrogen";
import ProductGrid from "../../components/client/ProductGrid.client";
import BestSelling from "../../components/server/BestSelling.server";
import { Layout } from "../../components/server/Layout.server";

const PAGINATION_SIZE = 4;

const index = ({ filter, cursor }) => {
  if (filter) {
    filter = JSON.parse(filter);
    console.log(filter);
  }

  const { searchParams } = useUrl();
  const q = searchParams.get("q");
  const url = useUrl().pathname + useUrl().search;
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
    variables: {
      query: q,
      key: filter?.filter || "PRODUCT_TYPE",
      pageBy: filter?.length || PAGINATION_SIZE,
      cursor,
    },
  });
  return (
    <Layout>
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        {products?.nodes?.length ? (
          <ProductGrid collection={products} url={url} />
        ) : (
          <>
            <h3>No results, try something else.</h3>
            <BestSelling />
          </>
        )}
      </section>
    </Layout>
  );
};

export default index;

export async function api(request, { queryShop }) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const q = url.searchParams.get("q");
  const filter = url.searchParams.get("filter");
  return queryShop({
    query: QUERY,
    variables: {
      query: q,
      key: filter || "PRODUCT_TYPE",
      pageBy: PAGINATION_SIZE,
      cursor,
    },
  });
}

const QUERY = gql`
  query Products(
    $query: String!
    $key: ProductSortKeys!
    $pageBy: Int!
    $cursor: String
  ) {
    products(first: $pageBy, after: $cursor, sortKey: $key, query: $query) {
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
