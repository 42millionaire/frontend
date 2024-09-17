import { useState } from "react";
import { useEffect } from "react";
import AdminContentBlock from "./AdminContentBlock";
import AdminBody from "./AdminBody";

export default function MemberManage() {
	const [members, setMembers] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(BASE_URL);
				const res = await response.json();
				setMembers(res.groupmembers);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
	
	const renderMembers = () => {
		return (
			<ul className="text-[20px]">{
				members.map(
				(item) =>(
				<li key={item.id} className="flex hover:text-orange-400">
					<div className="w-[50%]">{item.member_name}</div>
					<div className="w-[20%]">{item.grade}</div>
					<div className="w-[10%] text-center">⬆️</div>
					<div className="w-[10%] text-center">⬇️</div>
					<div className="w-[10%] text-center">❌</div>
				</li>
				),
			)}
			</ul>
		)
	};

	const [joinRequests, setJoinRequests] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(BASE_URL);
				const res = await response.json();
				setJoinRequests(res.joinrequest);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
	
	const renderJoinRequests = () => {
		return (
			<ul className="text-[20px]">
				{joinRequests.map(
				(item) =>(
				<li key={item.id} className="flex hover:text-orange-400">
					<div className="w-[50%]">{item.member_name}</div>
					<div className="w-[40%]">{item.created_time}</div>
					<div className="w-[10%] text-center">✅</div>
				</li>
				),
				)}
			</ul>
		)
	};
	return (
		<AdminBody title={"Member Management"}>
			<AdminContentBlock title={"Members"} contents={renderMembers}/>
			<AdminContentBlock title={"Join Request"} contents={renderJoinRequests}/>
		</AdminBody>
	);
}
