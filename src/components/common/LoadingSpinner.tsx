import React from "react";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Loading...",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 ${className}`}
    >
      <div
        className={`${sizeClasses[size]} border-2 border-[rgb(var(--color-border))] border-t-[rgb(var(--color-primary))] rounded-full animate-spin mb-4`}
      />
      {text && (
        <p className="text-[rgb(var(--color-text-secondary))] text-sm">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
