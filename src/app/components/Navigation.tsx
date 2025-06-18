"use client";
import React, { useState, useRef } from "react";
import { NavButton } from "./NavButton";
import { AddPageButton } from "./AddPageButton";

import clsx from "clsx";

const SmallPlusButton: React.FC<{ onClick: () => void; show?: boolean }> = ({
  onClick,
  show = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    tabIndex={0}
    aria-label="Add Page"
    className={clsx(
      "flex items-center justify-center bg-white border border-[#E1E1E1] shadow h-5 w-5 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-gray-50 transition duration-200 z-10",
      show
        ? "scale-100 opacity-100 pointer-events-auto"
        : "scale-75 opacity-0 pointer-events-none"
    )}
  >
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3.5" y="0" width="1" height="8" fill="#1A1A1A" />
      <rect x="0" y="3.5" width="8" height="1" fill="#1A1A1A" />
    </svg>
  </button>
);

const initialPages = ["Info", "Details", "Other", "Ending"];

const getDuplicateName = (pages: string[], base: string) => {
  // If "Page" not present, use " (Copy)" then increment numbers if needed
  const newName = base + " (Copy)";
  if (!pages.includes(newName)) return newName;
  let i = 2;
  while (pages.includes(base + ` (Copy ${i})`)) i++;
  return base + ` (Copy ${i})`;
};

const Navigation: React.FC = () => {
  const [pages, setPages] = useState(initialPages);
  const [activeIdx, setActiveIdx] = useState(0);
  const [renamingIdx, setRenamingIdx] = useState<number | null>(null);
  const [hoveredGap, setHoveredGap] = useState<number | null>(null); // index between
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (idx: number) => {
    dragItem.current = idx;
  };
  const handleDragEnter = (idx: number) => {
    dragOverItem.current = idx;
  };
  const handleDragEnd = () => {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from !== null && to !== null && from !== to) {
      const moved = [...pages];
      const [removed] = moved.splice(from, 1);
      moved.splice(to, 0, removed);
      setPages(moved);
      if (activeIdx === from) setActiveIdx(to);
      else if (from < activeIdx && to >= activeIdx)
        setActiveIdx((idx) => idx - 1);
      else if (from > activeIdx && to <= activeIdx)
        setActiveIdx((idx) => idx + 1);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleAddPageAt = (i: number) => {
    setPages((pages) => {
      const newPages = [...pages];
      newPages.splice(i, 0, `Page ${pages.length + 1}`);
      return newPages;
    });
  };

  const handleAddPage = () => {
    setPages((pages) => [...pages, `Page ${pages.length + 1}`]);
  };

  const handleSetFirstPage = (idx: number) => {
    setPages((pages) => {
      if (idx === 0) return pages; // already first
      const newPages = [...pages];
      const [removed] = newPages.splice(idx, 1);
      newPages.unshift(removed);
      return newPages;
    });
    setActiveIdx((prevIdx) =>
      prevIdx === idx ? 0 : prevIdx < idx ? prevIdx + 1 : prevIdx
    );
  };

  const handleRenamePage = (idx: number, newName: string) => {
    setPages((pages) => {
      const updated = [...pages];
      updated[idx] = newName.trim() || pages[idx];
      return updated;
    });
    setRenamingIdx(null);
  };

  const handleDeletePage = (idx: number) => {
    setPages((pages) => {
      const newPages = [...pages];
      newPages.splice(idx, 1);
      return newPages;
    });
    setRenamingIdx((n) => (n === idx ? null : n && n > idx ? n - 1 : n));
    setActiveIdx((curr) => {
      if (curr === idx) return Math.max(0, curr - 1);
      if (curr > idx) return curr - 1;
      return curr;
    });
  };

  // Duplicates the page at idx, sets new active and enters rename mode
  const handleDuplicatePage = (idx: number) => {
    setPages((pages) => {
      const newPages = [...pages];
      const name = getDuplicateName(pages, pages[idx]);
      newPages.splice(idx + 1, 0, name);
      return newPages;
    });
    setTimeout(() => {
      setActiveIdx(idx + 1);
      setRenamingIdx(idx + 1);
    }, 0);
  };

  return (
    <nav className="w-full flex justify-center mt-10">
      <div className="flex items-center select-none">
        {pages.map((label, idx) => (
          <div key={label + "-" + idx} className="flex items-center">
            <NavButton
              label={label}
              active={idx === activeIdx}
              isRenaming={renamingIdx === idx}
              onRename={() => setRenamingIdx(idx)}
              onRenameSave={(newName: string) => handleRenamePage(idx, newName)}
              onRenameCancel={() => setRenamingIdx(null)}
              onClick={() => setActiveIdx(idx)}
              onSetFirstPage={
                idx !== 0 ? () => handleSetFirstPage(idx) : undefined
              }
              onDelete={() => handleDeletePage(idx)}
              onDuplicate={() => handleDuplicatePage(idx)}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragEnter={() => handleDragEnter(idx)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            />
            {/* Split/merge dashed effect: only split on hover, else single line! */}
            {idx < pages.length - 1 && (
              <div
                className={clsx(
                  "relative flex items-center h-8 transition-all duration-200 group",
                  hoveredGap === idx + 1
                    ? "w-[56px] min-w-[28px]"
                    : "w-[28px] min-w-[28px]"
                )}
                onMouseEnter={() => setHoveredGap(idx + 1)}
                onMouseLeave={() => setHoveredGap(null)}
              >
                {hoveredGap !== idx + 1 ? (
                  <div className="border-t border-dashed border-[#C0C0C0] w-full h-0" />
                ) : (
                  <>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 border-t border-dashed border-[#C0C0C0] transition-all duration-200 w-[22px] h-0" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-[#C0C0C0] transition-all duration-200 w-[22px] h-0" />
                  </>
                )}
                <SmallPlusButton
                  onClick={() => handleAddPageAt(idx + 1)}
                  show={hoveredGap === idx + 1}
                />
              </div>
            )}
          </div>
        ))}
        {/* Dashed line before Add Page button */}
        <div className="flex items-center h-8">
          <div className="border-t border-dashed border-[#C0C0C0] w-[28px] h-0"></div>
        </div>
        <AddPageButton onClick={handleAddPage} />
      </div>
    </nav>
  );
};

export default Navigation;
