"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GroupHeader from "@/components/Group/GroupHeader";
import GroupStats from "@/components/Group/GroupStats";
import Leaderboard from "@/components/Group/Leaderboard";
import API from "@/utils/API";

interface Member {
  id: string;
  name: string;
  totalReturn: number;
  joinedAt: string;
}

interface GroupData {
  _id: string;
  name: string;
  entryFee: number;
  prizePool: number;
  currentMembers: number;
  maxMembers: number;
  members: {
    userId: { _id: string; username: string };
    joinedAt: string;
    currentReturn: number;
  }[];
}

export default function GroupMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [group, setGroup] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log("group", group);

  useEffect(() => {
    async function load() {
      const { id } = await params;
      setGroupId(id);
      setLoading(true);
    }
    load();
  }, [params]);

  useEffect(() => {
    if (!groupId) return;
    async function fetchGroup() {
      try {
        const response = await API.get(`/groups/${groupId}`);
        setGroup(response.data.data.group);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGroup();
  }, [groupId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!group) return <p className="text-center mt-10">Group not found</p>;

  const members: Member[] = group.members.map((m) => ({
    id: m.userId._id,
    name: m.userId.username,
    totalReturn: m.currentReturn,
    joinedAt: new Date(m.joinedAt).toLocaleDateString(),
  }));

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const alreadyJoined = group.members.some(
    (m: any) => m.userId._id === currentUser?._id
  );

  console.log("alreadyJoined", alreadyJoined, currentUser);

  return (
    <div
      className="content"
      style={{ marginTop: "4rem", minHeight: "calc(100vh - 4rem)" }}
    >
      <GroupHeader title={group.name} memberCount={group.currentMembers} />

      <GroupStats
        entryFee={group.entryFee}
        prizePool={group.prizePool}
        totalMembers={group.currentMembers}
        activeMembers={group.currentMembers} // or calculate separately
      />

      <Leaderboard members={members} />

      <div className="flex justify-center">
        <button
          onClick={() => router.push(`/join-group/${group._id}`)}
          disabled={alreadyJoined}
          className={`w-full sm:w-[200px] font-semibold py-4 px-6 rounded-xl mt-6 transition-opacity
      ${
        alreadyJoined
          ? "bg-gray-500 cursor-not-allowed opacity-60"
          : "bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white hover:opacity-90"
      }`}
        >
          {alreadyJoined ? "Already Joined" : "Join This Group"}
        </button>
      </div>
    </div>
  );
}
