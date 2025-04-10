"use client";

import React from "react";
import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  tooltipPressed?: string;
}

function ButtonWithTooltip({ children, onClick, tooltip, tooltipPressed }: ButtonProps) {
  const [isTooltipClicked, setIsTooltipClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onClick();
    setLoading(true);
    setIsTooltipClicked(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="tooltip" data-tip={!isTooltipClicked ? tooltip : tooltipPressed}>
      <button
        className="tooltip flex h-8 w-8 items-center justify-center rounded-full text-slate-900 hover:bg-slate-200"
        onClick={handleClick}
      >
        {!loading ? (
          children
        ) : (
          <span className="loading loading-spinner loading-sm"></span>
        )}
      </button>
    </div>
  );
}

export default ButtonWithTooltip;
