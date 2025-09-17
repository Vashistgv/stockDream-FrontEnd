import API from "@/utils/API";

export async function fetchAllGroups() {
  const res = await API.get(`/api/groups`);

  return res?.data || {};
}
