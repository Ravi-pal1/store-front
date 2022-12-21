import { useServerProps } from "@shopify/hydrogen";

const LoadMoreButton = ({ cursor }) => {
  const { setServerProps } = useServerProps();
  const handleLoadMoreButton = () => {
    setServerProps("cursor", cursor );
  };
  return (
    <div className="mx-auto">
      <button onClick={handleLoadMoreButton} className="border w-fit px-3 py-1 text-white bg-gray-900 rounded-lg">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreButton;
