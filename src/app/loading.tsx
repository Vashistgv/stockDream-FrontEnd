"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page title */}
      <Skeleton className="h-8 w-1/3" />

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>

      {/* Leaderboard items */}
      <div className="flex flex-col gap-4 mt-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-4 w-10" />
          </div>
        ))}
      </div>

      {/* Button */}
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}
