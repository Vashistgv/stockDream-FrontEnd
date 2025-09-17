"use client";

import { useRouter } from "next/navigation";

interface GroupHeaderProps {
  title: string;
  memberCount: number;
}

export default function GroupHeader({ title, memberCount }: GroupHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <button
        onClick={() => router.back()}
        className="mb-4 text-[rgb(var(--color-primary))] hover:opacity-80 font-medium"
      >
        ← Back to Dashboard
      </button>
      <h1 className="page-title">{title}</h1>
      <p className="text-[rgb(var(--color-text-secondary))]">
        {title} • {memberCount} members
      </p>
    </div>
  );
}
