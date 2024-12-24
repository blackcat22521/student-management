import { useState } from "react";

const DropdownMenu = ({
  onUpdate,
  onDelete,
}: {
  onUpdate: () => void;
  onDelete: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-600 hover:text-gray-900"
      >
        &#8942; {/* Vertical Ellipsis */}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
          <button
            onClick={() => {
              setIsOpen(false);
              onUpdate();
            }}
            className="block px-4 py-2 text-left hover:bg-gray-100 w-full text-sm"
          >
            Detail
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
            className="block px-4 py-2 text-left hover:bg-gray-100 w-full text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
