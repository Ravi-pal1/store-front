import { useEffect, useState } from "react";
import { useServerProps } from "@shopify/hydrogen";
import ProductCard from "./ProductCard.client";
import Filter from "./Filters.client";

export const filters = [
  {
    id: 1,
    handle: "BEST_SELLING",
    title: "Default",
  },
  {
    id: 2,
    handle: "BEST_SELLING",
    title: "Best Selling",
  },
  {
    id: 3,
    handle: "PRICE",
    title: "Price (Low to High)",
  },
  {
    id: 4,
    handle: "CREATED_AT",
    title: "Latest",
  },
  {
    id: 5,
    handle: "TITLE",
    title: "Alphabetically (A-Z)",
  },
];

const CollectionGrid = ({ collection, url }) => {
  const [products, setProducts] = useState(collection?.nodes);
  const [cursor, setCursor] = useState(collection?.pageInfo?.endCursor);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(
    collection?.pageInfo?.hasNextPage
  );
  const { setServerProps } = useServerProps();
  useEffect(() => {
    setProducts(collection?.nodes);
    setHasNextPage(collection?.pageInfo?.hasNextPage);
    setCursor(collection?.pageInfo?.endCursor);
  }, [collection]);

  useEffect(() => {
    if (filter) {
      setServerProps(
        "filter",
        JSON.stringify({ filter, length: products.length })
      );
    }
  }, [filter]);

  const handleLoadMoreButton = async () => {
    setIsLoading(true)
    const postUrl = new URL(window.location.origin + url);
    postUrl.searchParams.set("cursor", cursor);
    postUrl.searchParams.set("filter", filter);
    const response = await fetch(postUrl, {
      method: "POST",
    });
    console.log(await response.json());
    const data = await response.json()
    setIsLoading(false)
    if(data) {
      setCursor('data?.pageInfo?.endCursor');
      setHasNextPage(data?.pageInfo?.hasNextPage);
      setProducts([...products, ...data?.nodes]);
    }
  };

  return (
    <>
      <Filter filters={filters} setFilter={setFilter} />
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasNextPage && (
        <div className="mx-auto">
          <button
            onClick={handleLoadMoreButton}
            className="border w-fit px-3 py-1 text-white bg-gray-900 rounded-lg"
          >
            {isLoading?"Loading...":"Load more"}
          </button>
        </div>
      )}
    </>
  );
};

export default CollectionGrid;
