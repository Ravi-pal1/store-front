import { gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import { Suspense } from "react";
import RenderCollections from "../../components/client/RenderCollections.client";
import { Layout } from "../../components/server/Layout.server";
const index = () => {
    const {
        data: { collections },
    } = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
    });
    return (
        <Layout>
            <Suspense>
              <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
                  <h2 className="font-bold text-center text-2xl underline tracking-wider">
                      Collections
                  </h2>
                  <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
                      <RenderCollections collections={collections}/>
                  </div>
              </section>  
            </Suspense>
        </Layout>
    )
}
export default index

const QUERY = gql`
  query FeaturedCollections {
    collections(first:6) {
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