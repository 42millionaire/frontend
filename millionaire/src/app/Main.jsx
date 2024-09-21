import { useEffect, useState } from "react";
import MainHeader from "../components/Main/MainHeader.jsx";
import MemberList from "../components/MemberList.jsx";
import Notice from "../components/Notice.jsx";
import useMainAPI from "../hooks/useMain.js";
import { getAPI } from "../apis/get.js";

export default function Main() {
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [cards, setCards] = useState([]);
	const { data: groupTitle } = useMainAPI(
		"group",
		(data) => data.groupResponses[0].groupName,
	);
	const { data: members } = useMainAPI("member", (data) => data.members);
	const { data: notice } = useMainAPI("group/notice/1", (data) => data.notice);

	useEffect(() => {
		fetchCards(1, 2, new Date().getFullYear(), selectedMonth);
		console.log(selectedMonth);
	}, [selectedMonth]);

	const fetchCards = async (groupId, memberId, year, month) => {
		const data = await getAPI("task", { groupId, memberId, year, month });
		setCards(data.tasks);
		return data;
	};

	return (
		<div className="text-white">
			<MainHeader
				groupTitle={groupTitle}
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
			/>
			<main className="flex flex-col w-fit pl-16 pt-24 gap-6">
				<MemberList members={members} />
				<Notice notice={notice} />
			</main>
		</div>
	);
}
