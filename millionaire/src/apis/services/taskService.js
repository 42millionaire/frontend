import { getAPI } from "../get";

export const fetchCards = async (groupId, memberId, year, month) => {
	const data = await getAPI("task", { groupId, memberId, year, month });
	return data.tasks;
};
