import { useState } from "react";
import Authentication from "../components/Authentication";
import MemberManage from "../components/MemberManage";
import DashBoard from "../components/DashBoard";
import MainNotice from "../components/Main/MainNotice";
import Sidebar from "../components/Sidebar";

const PAGES = {
	AUTH: Authentication,
	MEMBER: MemberManage,
	DASH: DashBoard,
	NOTICE: Notice,
};

export default function Admin() {
	const [page, setPage] = useState("AUTH");
	const AdminBody = PAGES[page];

	return (
		<div className="flex text-gray-300">
			<Sidebar setPage={setPage} />
			<AdminBody />
		</div>
	);
}
