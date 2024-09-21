import { useState } from "react";
import { useEffect } from "react";
import AdminContentBlock from "./AdminContentBlock";
import AdminBody from "./AdminBody";

export default function DashBoard() {
	const [penalties, setPenalties] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_URL}/groupmember/penalty`, {
                    headers: {
                        "Accept": "application/json",
                        "ngrok-skip-browser-warning": true,
                    },
                    method: "GET",
					body: {
						"groupId" : 1,
						"year": 2024,
						"month" : 9
					}
                });
				const res = await response.json();
				setJoinRequests(res.groupJoinResponses);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
	
	const renderPenalties = () => {
		return (
			<ul className="text-[20px]">{
				penalties.map(
				(item) =>(
				<li key={item.id} className="flex">
					<div className="w-[50%]">{item.member_name}</div>
					<div className="w-[30%]">{item.penalty}</div>
				</li>
				),
				)}
			</ul>
		)
	};
	return (
		<AdminBody title={"Dash Board"}>
			<AdminContentBlock title={"Penalty"} contents={renderPenalties}/>
		</AdminBody>
	);
}
