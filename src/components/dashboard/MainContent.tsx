"use client";

import React from "react";
import GroupCard from "./GroupCard";
import GroupDetails from "./GroupDetails";
import { GroupWithQuotes } from "@/types";

interface DashboardContentProps {
  groups: GroupWithQuotes[];
  activeGroup: GroupWithQuotes;
  setActiveGroup: (group: GroupWithQuotes) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  groups,
  activeGroup,
  setActiveGroup,
}) => {
  return (
    <div className="content ">
      <h1 className="page-title">Fantasy Stocks Dashboard</h1>

      <section className="mb-14 ">
        <h2 className="section-title">Available Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {groups.map((group) => (
            <GroupCard
              key={group.group._id}
              group={group.group}
              isActive={activeGroup.group._id === group.group._id}
              onClick={() => setActiveGroup(group)}
            />
          ))}
        </div>
      </section>

      {/* <section className="mt-14">
        <GroupDetails group={activeGroup} />
      </section> */}
    </div>
  );
};

export default DashboardContent;
