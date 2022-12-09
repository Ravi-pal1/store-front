import { Link, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import RenderCollections from "../client/RenderCollections.client";

export default function FeaturedCollections() {
  const {
    data: { collections },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });
  return (
    <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">
          Collections
        </h2>
        <Link 
          to="/collections"
          className="underline"
        >
          View All
        </Link>
      </div>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
        <RenderCollections collections={collections}/>
      </div>
    </section>
  );
}

const QUERY = gql`
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart", sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
