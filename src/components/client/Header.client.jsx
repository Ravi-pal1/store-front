import { Link, useCart } from "@shopify/hydrogen";
import { Drawer, useDrawer } from "./Drawer.client";
import { CartDetails } from "./CartDetails.client";
import SearchBar from "./SearchBar.client";

export default function Header({ shop }) {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  return (
    <>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <div className="grid">
          <CartDetails onClose={closeDrawer} />
        </div>
      </Drawer>
      <header
        role="banner"
        className={`flex items-center h-16 p-6 md:p-8 lg:p-12 sticky backdrop-blur-lg z-50 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm bg-black/80 text-white`}
      >
        <div className="flex gap-12">
          <Link className="font-bold text-2xl" to="/">
            {shop.name}
          </Link>
        </div>
        <div className="flex items-center space-x-4 gap-4">
          <div className="flex items-center space-x-5">
            <SearchBar />
            <div className="hover:text-gray-200">
              <Link className="font-bold" to="/products">
                All Products
              </Link>
            </div>
            <Link to="/account">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 hover:text-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
          </div>
          <button
            onClick={openDrawer}
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconBag />
            <CartBadge />
          </button>
        </div>
      </header>
    </>
  );
}

function IconBag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-6 h-6 hover:text-gray-200"
    >
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </svg>
  );
}

function CartBadge() {
  const { totalQuantity } = useCart();
  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`text-black bg-white absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
