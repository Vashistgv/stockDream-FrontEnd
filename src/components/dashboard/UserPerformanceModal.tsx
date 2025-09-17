import { useEffect, useRef } from "react";

interface UserPerformanceModalProps {
  user: Object | null;
  onClose: () => void;
}

export default function UserPerformanceModal({
  user,
  onClose,
}: UserPerformanceModalProps) {
  const modalRef = useRef<HTMLElement | null>(null);

  // Close on background click
  useEffect(() => {
    function handleClick(e: any) {
      if (modalRef.current?.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-[rgb(var(--color-card))] max-w-md w-full p-6 rounded-xl shadow-xl relative"
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-[rgb(var(--color-primary))] text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex items-center gap-3 mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full border border-[rgb(var(--color-primary))]"
          />
          <div>
            <div className="text-xl font-bold text-[rgb(var(--color-primary))]">
              {user.name}
            </div>
            <div className="text-sm text-[rgb(var(--color-text-secondary))]">
              {user.group}
            </div>
          </div>
        </div>

        <div className="mb-2">
          <span className="font-semibold">Total Return:</span>
          <span className="text-[rgb(var(--color-success))] font-bold ml-2">
            {user.totalReturn}%
          </span>
        </div>

        {/* Simple SVG Line Chart - replace with chart lib if needed */}
        <div className="my-6">
          <div className="text-sm mb-2 text-[rgb(var(--color-text-secondary))]">
            Performance over weeks
          </div>
          <svg width="100%" height="70" viewBox="0 0 210 70">
            <polyline
              fill="none"
              stroke="rgb(45,212,191)"
              strokeWidth="4"
              points={user.performance
                .map((v, i) => `${i * 40 + 10},${70 - v * 3}`)
                .join(" ")}
            />
            {user.performance.map((v, i) => (
              <circle
                key={i}
                cx={i * 40 + 10}
                cy={70 - v * 3}
                r="4"
                fill="rgb(34,197,94)"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
