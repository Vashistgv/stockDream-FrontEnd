"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GroupHeader from "@/components/Group/GroupHeader";
import GroupStats from "@/components/Group/GroupStats";
import Leaderboard from "@/components/Group/Leaderboard";
import API from "@/utils/API";
import Link from "next/link";
import { Group, Member, GroupMember } from "@/types";

export default function GroupMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean>(false);
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
        setLoading(false);
        setIsAuth(true);
        console.log("groupmember error ", err);
      }
    }
    fetchGroup();
  }, [groupId]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-full border-1 ">
          <p className="text-center mt-10">
            You are not LogedIn Please{" "}
            <Link className="text-blue-500" href="/login">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    );
  }

  if (!group)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-full border-4 ">
          <p className="text-center mt-10">Group Not Found</p>
        </div>
      </div>
    );

  const members: Member[] = (group.members as any).map((m: any) => ({
    _id: m.userId._id,
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
          className={`w-full sm:w-[200px] font-semibold !py-4 !px-4 rounded-xl mt-6 transition-opacity
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
