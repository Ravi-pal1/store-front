import { Suspense } from "react";
import { useShopQuery, CacheLong, gql, Seo } from "@shopify/hydrogen";
import Header from "../client/Header.client";

export function Layout({ children }) {
  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
  });

  return (
    <>
      <Suspense>
        <Seo
          type="defaultSeo"
          data={{
            title: shop.name,
            description: shop.description,
          }}
        />
      </Suspense>
      <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
        <Header shop={shop} />
        <main role="main" className="flex-grow">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
      </div>
    </>
  );
}

const SHOP_QUERY = gql`
  query layout {
    shop {
      name
      description
    }
  }
`;
