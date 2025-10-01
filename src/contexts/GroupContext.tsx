import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Group } from "@/types"; // adjust path according to your project

interface GroupContextType {
  groups: Group[]; // all groups available
  selectedGroup: Group | null; // current selected group
  setSelectedGroup: (group: Group) => void;
  refreshGroups: () => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const refreshGroups = () => {
    fetch("/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data.groups));
  };

  useEffect(() => {
    refreshGroups();
  }, []);

  return (
    <GroupContext.Provider
      value={{ groups, selectedGroup, setSelectedGroup, refreshGroups }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};
