"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { Group, GroupWithQuotes } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface HeaderProps {
  onClose: () => void;
  isDark: boolean;
  groups: GroupWithQuotes[];
  activeGroup: GroupWithQuotes;
  onGroupSelected: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onClose,
  isDark,
  groups,
  activeGroup,
  onGroupSelected,
}) => (
  <div
    className={`chat-advisor-header flex justify-between items-center p-3 border-b ${
      isDark ? "dark border-gray-700" : "border-gray-200"
    }`}
    style={{ overflow: "visible" }}
  >
    <div className="chat-advisor-header-left flex items-center gap-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src="/avatar-advisor.png" alt="Advisor" />
        <AvatarFallback className="chat-advisor-avatar-fallback text-sm font-bold">
          AD
        </AvatarFallback>
      </Avatar>
      <div>
        <h3
          className={`chat-advisor-title font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Advisor
        </h3>
        <p
          className={`chat-advisor-subtitle text-sm ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <Select
            onValueChange={(value) => {
              console.log("selected", value);
              onGroupSelected(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Group" />
            </SelectTrigger>

            <SelectContent
              className="z-[9999] bg-white text-black border border-gray-200 rounded-md shadow-md"
              position="popper"
            >
              {groups.map((item) => (
                <SelectItem
                  className="hover:bg-gray-100 cursor-pointer"
                  key={item.group._id}
                  value={item.group._id}
                  // onChange={(value) => {
                  //   console.log("selected", item.group._id, value);
                  //   onGroupSelected(item.group._id);
                  // }}
                >
                  {item.group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </p>
      </div>
    </div>

    <div className="chat-advisor-header-right flex items-center gap-2">
      {/* <ThemeToggle isDark={isDark} /> */}

      <button
        onClick={onClose}
        aria-label="Close chat"
        className="chat-advisor-close-btn p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <X
          className="h-4 w-4"
          style={{ color: isDark ? "#f9fafb" : "#111827" }}
        />
      </button>
    </div>
  </div>
);

export default Header;
