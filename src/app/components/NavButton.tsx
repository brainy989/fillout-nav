import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsMenu } from "./SettingsMenu";
import FileIcon from "./icons/FileIcon";
import InfoIcon from "./icons/InfoIcon";
import ThreeDotIcon from "./icons/ThreeDotIcon";
import EndingIcon from "./icons/EndingIcon";

export type NavButtonProps = {
  label: string;
  active: boolean;
  isRenaming?: boolean;
  onRename?: () => void;
  onRenameSave?: (newName: string) => void;
  onRenameCancel?: () => void;
  onClick: () => void;
  onSetFirstPage?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  draggable?: boolean;
};

export const NavButton: React.FC<NavButtonProps> = ({
  label,
  active,
  isRenaming = false,
  onRename,
  onRenameSave,
  onRenameCancel,
  onClick,
  onSetFirstPage,
  onDelete,
  onDuplicate,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  draggable = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [renameValue, setRenameValue] = useState(label);
  const menuRef = useRef<HTMLDivElement>(null);
  const dotBtnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRenameValue(label);
  }, [label]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        dotBtnRef.current &&
        !dotBtnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isRenaming]);

  // Tailwind class composition for dynamic state, using clsx
  const buttonClass = clsx(
    "flex items-center gap-[6px] transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 py-1 rounded-lg relative",
    active
      ? "bg-white border border-[0.5px] border-[#E1E1E1] text-[#1A1A1A] font-medium pl-[10px] pr-8 shadow-sm"
      : "bg-[#9DA4B226] border border-[0.5px] border-[#9DA4B226] text-[#677289] font-medium px-[10px]",
    isHovered && !isRenaming ? "bg-[#9DA4B259]" : "",
    draggable ? "cursor-grab" : "cursor-pointer"
  );
  const textClass = clsx(
    "text-sm",
    active ? "text-[#1A1A1A]" : "text-[#677289]"
  );
  const inputClass = clsx(
    "px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-900 text-sm w-28 focus:outline-none focus:ring-1 focus:ring-yellow-400 font-medium min-w-[60px]"
  );
  const dotBtnClass =
    "absolute top-1/2 right-2 -translate-y-1/2 p-1 rounded focus:outline-none";

  const renderIcon = () => {
    const iconColor = active ? "#F59D0E" : "#8C93A1";
    if (label === "Info") {
      return <InfoIcon color={iconColor} />;
    }
    if (label === "Ending") {
      return <EndingIcon color={iconColor} />;
    }
    return <FileIcon color={iconColor} />;
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (onRenameSave) onRenameSave(renameValue);
    } else if (e.key === "Escape") {
      if (onRenameCancel) onRenameCancel();
    }
  };
  const handleInputBlur = () => {
    if (onRenameSave) onRenameSave(renameValue);
  };

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={onClick}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={buttonClass}
        tabIndex={isRenaming ? -1 : 0}
        disabled={isRenaming}
      >
        {renderIcon()}
        {isRenaming ? (
          <input
            ref={inputRef}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className={inputClass}
            maxLength={100}
          />
        ) : (
          <span className={textClass}>{label}</span>
        )}
      </button>
      {active && (
        <button
          ref={dotBtnRef}
          type="button"
          aria-label="Open Menu"
          tabIndex={0}
          className={dotBtnClass}
          style={{ width: 24, height: 24 }}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ThreeDotIcon />
        </button>
      )}
      <AnimatePresence>
        {active && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 540,
              damping: 30,
              mass: 0.6,
              duration: 0.32,
            }}
            className="absolute top-full right-0 mt-2 z-30 origin-top-right"
            style={{ pointerEvents: menuOpen ? "auto" : "none" }}
          >
            <SettingsMenu
              menuRef={menuRef}
              onSetFirst={onSetFirstPage}
              onRename={onRename}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
