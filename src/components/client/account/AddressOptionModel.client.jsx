import { useEffect, useState } from "react";

const AddressOptionModel = ({ handleEditButton, handleDeleteButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    window.addEventListener("click", () => {
      setIsOpen(false);
    });
    return () => {
      removeEventListener("click", window);
    };
  }, []);
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
      {isOpen && (
        <div
          className="absolute right-0 border shadow rounded"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={()=>{setIsOpen(false); handleEditButton()}}
            className="rounded-t text-start w-full px-2 hover:bg-violet-500 hover:text-white"
          >
            Edit
          </button>
          <button
            className="text-start px-2 rounded-b hover:bg-violet-500 hover:text-white"
            onClick={()=>{setIsOpen(false);handleDeleteButton()}}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressOptionModel;


