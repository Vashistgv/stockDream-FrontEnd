import API from "@/utils/API";

export async function fetchAllGroups() {
  const res = await API.get(`/groups`);

  return res?.data || {};
}
