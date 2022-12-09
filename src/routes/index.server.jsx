import TopCollections from "../components/client/TopCollections.client";
import { Suspense } from "react";
import { Layout } from "../components/server/Layout.server";
import FeaturedCollections from "../components/server/FeaturedCollections.server";
export default function Home() {
  	return (
        <Layout>
          <Suspense>
            <TopCollections/>
            <FeaturedCollections/>
          </Suspense>
        </Layout>
  );
}
