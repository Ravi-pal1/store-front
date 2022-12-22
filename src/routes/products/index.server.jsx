import { useUrl, gql, useShopQuery } from "@shopify/hydrogen";
import { Layout } from "../../components/server/Layout.server";
import CollectionGrid from "../../components/client/CollectionGrid.client";

const PAGINATION_SIZE = 4;

const Index = ({ filter, cursor }) => {
  if (filter) {
    filter = JSON.parse(filter);
  }
  const url = useUrl().pathname + useUrl().search;
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
    variables: {
      key: filter?.filter || "BEST_SELLING",
      pageBy: filter?.length || PAGINATION_SIZE,
      cursor,
    },
  });
  return (
    <Layout>
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <CollectionGrid collection={products} url={url} />
      </section>
    </Layout>
  );
};

export async function api(request, { queryShop }) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const filter = url.searchParams.get("filter");
  const {data} = await queryShop({
    query: QUERY,
    variables: {
      key: filter || "BEST_SELLING",
      pageBy: PAGINATION_SIZE,
      cursor,
    },
  });
  return data?.products;
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
