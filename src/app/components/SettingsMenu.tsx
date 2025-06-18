import React from "react";
import FirstPageIcon from "./icons/FirstPageIcon";
import PencilIcon from "./icons/PencilIcon";
import ClipboardIcon from "./icons/ClipboardIcon";
import DuplicateIcon from "./icons/DuplicateIcon";
import TrashIcon from "./icons/TrashIcon";

export type SettingsMenuProps = {
  menuRef?: React.RefObject<HTMLDivElement | null>;
  onClose?: () => void;
  onSetFirst?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
};

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  menuRef,
  onSetFirst,
  onRename,
  onDelete,
  onDuplicate,
}) => (
  <div
    ref={menuRef}
    className="absolute z-30 top-full right-0 mt-2 min-w-[200px] rounded-lg shadow-lg bg-white border border-gray-200 py-1"
    tabIndex={-1}
  >
    {/* Title */}
    <div className="px-4 pb-1 pt-1 text-[16px] font-medium text-[#1A1A1A] select-none">
      Settings
    </div>
    {/* Divider */}
    <div className="border-t border-gray-200 my-1" />
    {/* Menu list */}
    <div className="flex flex-col gap-1 mx-1 pb-1">
      <button
        onClick={onSetFirst}
        className="flex items-center gap-1 w-full text-left px-3 py-1 rounded-md hover:bg-gray-100 text-sm text-[#1A1A1A] font-medium transition"
      >
        <FirstPageIcon />
        <span>Set as first page</span>
      </button>
      <button
        onClick={onRename}
        className="flex items-center gap-1 w-full text-left px-3 py-1 rounded-md hover:bg-gray-100 text-sm text-[#1A1A1A] font-medium transition"
      >
        <PencilIcon />
        <span>Rename</span>
      </button>
      <button className="flex items-center gap-1 w-full text-left px-3 py-1 rounded-md hover:bg-gray-100 text-sm text-[#1A1A1A] font-medium transition">
        <ClipboardIcon />
        <span>Copy</span>
      </button>
      <button
        onClick={onDuplicate}
        className="flex items-center gap-1 w-full text-left px-3 py-1 rounded-md hover:bg-gray-100 text-sm text-[#1A1A1A] font-medium transition"
      >
        <DuplicateIcon />
        <span>Duplicate</span>
      </button>
      {/* Divider */}
      <div className="border-t border-gray-200 my-1 mx-2" />
      {/* Delete bottom button */}
      <button
        onClick={onDelete}
        className="flex items-center gap-1 w-full text-left px-3 py-1 rounded-md hover:bg-red-50 text-sm text-red-600 font-medium transition"
      >
        <TrashIcon />
        <span>Delete</span>
      </button>
    </div>
  </div>
);
