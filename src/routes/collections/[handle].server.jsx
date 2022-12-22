import { gql, useShopQuery, useRouteParams, useUrl } from "@shopify/hydrogen";
import { Layout } from "../../components/server/Layout.server";
import CollectionGrid from "../../components/client/CollectionGrid.client";

const PAGINATION_SIZE = 4;
let GLOBAL_HANDLE = "";

export default function Collection({ filter, cursor }) {
  if (filter) {
    filter = JSON.parse(filter);
  }
  const { handle } = useRouteParams();
  GLOBAL_HANDLE = handle;
  const url = useUrl().pathname + useUrl().search;
  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      key: filter?.filter || "COLLECTION_DEFAULT",
      pageBy: filter?.length || PAGINATION_SIZE,
      cursor,
    },
  });

  return (
    <Layout>
      <header className="grid w-full gap-8 p-4 py-8 md:p-8 lg:p-12 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
          {collection?.title}
        </h1>
        {collection?.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {collection?.description}
              </p>
            </div>
          </div>
        )}
      </header>
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <CollectionGrid collection={collection?.products} url={url} />
      </section>
    </Layout>
  );
}

export async function api(request, { queryShop }) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const filter = url.searchParams.get("filter");
  const { data } = await queryShop({
    query: QUERY,
    variables: {
      handle: GLOBAL_HANDLE,
      key: filter || "COLLECTION_DEFAULT",
      pageBy: PAGINATION_SIZE,
      cursor,
    },
  });
  return data?.collection?.products;
}

const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $key: ProductCollectionSortKeys!
    $pageBy: Int!
    $cursor: String
  ) {
    collection(handle: $handle) {
      id
      title
      description
      image {
        id
        url
        width
        height
        altText
      }
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
            id
            url
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
  }
`;
