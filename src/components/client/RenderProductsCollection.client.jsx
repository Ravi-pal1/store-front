import ProductCard from "./ProductCard.client";

const RenderProductsCollection = ({ products, title }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900">
        {title || "Best Selling"}
      </h1>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {products?.nodes?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default RenderProductsCollection;
