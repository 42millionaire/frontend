import Authentication from "../components/Authentication";
import MemberManage from "../components/MemberManage";
import DashBoard from "../components/DashBoard";
import Notice from "../components/Notice";
import {useState} from 'react';

export default function Admin() {
	const [page, setPage] = useState("AUTH");
	let adminBody = null;

	if (page === "AUTH"){
		adminBody = Authentication();
	} else if (page === "MEMBER") {
		adminBody = MemberManage();
	} else if (page === "DASH") {
		adminBody = DashBoard();
	} else if (page === "NOTICE") {
		adminBody = Notice();
	}
	return (
		<div className="flex text-orange-400">
		<div className="flex-none w-[23%] mt-[20px] ml-[20px]">
			<h1 className="mb-[50px] text-[36px]">세후1억 해적단</h1>
			<nav>
				<ul className="text-[20px]">
					<li onClick={event=>{
						event.preventDefault();
						setPage("AUTH");
					}}>Authentication</li>
					<li onClick={event=>{
						event.preventDefault();
						setPage("MEMBER");
					}}>Member Management</li>
					<li onClick={event=>{
						event.preventDefault();
						setPage("DASH");
					}}>Dash Board</li>
					<li onClick={event=>{
						event.preventDefault();
						setPage("NOTICE");
					}}>Notice Board</li>
				</ul>
			</nav>
		</div>
		{adminBody}
		</div>
	);
}