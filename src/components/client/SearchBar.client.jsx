const SearchBar = () => {
  return (
    <section>
        <form action="/search" className="rounded flex bg-white text-black items-center overflow-hidden">
          <select className="outline-none text-sm" name="type">
            <option value="products">Products</option>
            <option value="collections">Collections</option>
          </select>
          <input
            type="search"
            placeholder="Search here......"
            className="lg:w-72 md:w-40 h-6 pl-4 outline-none"
            name="q"
          />
          <button className="bg-gray-100 px-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="lg:w-6 lg:h-6 h-5 w-5"
              type="submit"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
    </section>
  );
};

export default SearchBar;
