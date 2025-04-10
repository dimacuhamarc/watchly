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
      setIsTooltipClicked(false);
    }, 400);
  };

  return (
    <div className="tooltip tooltip-primary" data-tip={!isTooltipClicked ? tooltip : tooltipPressed}>
      <button
        className="tooltip flex h-8 w-8 items-center justify-center rounded-full text-slate-200/50 hover:bg-slate-900/50"
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
