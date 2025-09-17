"use client";

import { useEffect, useState } from "react";
import NewsSidebar from "@/components/dashboard/NewsFeed";
import DashboardContent from "@/components/dashboard/MainContent";
import LeaderboardSidebar from "@/components/dashboard/LeaderBoard";
import { GroupWithQuotes } from "@/types";
import { fetchAllGroups } from "@/lib/groupAPI";

export default function Dashboard() {
  const [activeGroup, setActiveGroup] = useState<GroupWithQuotes>(
    {} as GroupWithQuotes
  );
  const [groups, setGroups] = useState<GroupWithQuotes[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await fetchAllGroups();
      console.log("all groups", data);
      setGroups(data);
      if (data.length > 0) {
        setActiveGroup(data[0]);
      }
    })();
  }, []);
  return (
    <div className="main-layout">
      <NewsSidebar />
      <DashboardContent
        groups={groups}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
      />
      <LeaderboardSidebar />
    </div>
  );
}
