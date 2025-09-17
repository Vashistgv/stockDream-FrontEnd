import React from "react";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  action,
  icon,
}) => {
  const defaultIcon = (
    <svg
      className="w-12 h-12 text-[rgb(var(--color-text-secondary))]/50"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon */}
      <div className="w-20 h-20 bg-[rgb(var(--color-card))] border-2 border-dashed border-[rgb(var(--color-border))] rounded-full flex items-center justify-center mb-6">
        {icon || defaultIcon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-2 text-center">
        {title}
      </h3>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[rgb(var(--color-text-secondary))] text-center max-w-md mb-6">
          {subtitle}
        </p>
      )}

      {/* Action Button */}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
