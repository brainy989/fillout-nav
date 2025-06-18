import React from "react";
import PlusIcon from "./icons/PlusIcon";

export const AddPageButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="
      flex items-center transition-colors duration-150 outline-none
      focus-visible:ring-2 focus-visible:ring-yellow-200
      bg-white border border-[0.5px] border-[#E1E1E1]
      text-sm text-[#1A1A1A] font-medium py-1 px-[10px]
      rounded-lg shadow-sm cursor-pointer
    "
  >
    <PlusIcon />
    <span className="ml-1 text-[#1A1A1A]">Add Page</span>
  </button>
);
