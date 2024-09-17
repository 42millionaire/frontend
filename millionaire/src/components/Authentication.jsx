import { useEffect, useState } from "react";
import AdminContentBlock from "./AdminContentBlock";
import AdminBody from "./AdminBody";
import BASE_URL from "../constants/URL";

const Authentication = () => {
	const [data, setData] = useState([]);
	// const [appeals, setAppeals] = useState([]);
	// setAppeals(res.appeals);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_URL}/task/01`, {

					method: "GET"
				});
				const res = await response.json();
				setData(res.task);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
	
	const renderPendings = () => {
		return (
			<ul className="text-[20px]">{
				data.map(
				(item) =>
					item.status === "pend" && (
						<li key={item.id} className="flex hover:text-orange-400">
							<div className="w-[35%] mr-[1%] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
								{item.content}
							</div>
							<div className="w-[20%]">{item.member_name}</div>
							<div className="w-[33%]">{item.created_time}</div>
							<div className="w-[10%] text-center">✅ ❎</div>
						</li>
				),
				)}
			</ul>
		)
	};
	// const renderAppeals = () => {
	// 	return (
	// 		<ul className="text-[20px]">
	// 			{appeals.map(
	// 			(item) =>(
	// 					<li key={item.id} className="flex hover:text-orange-400">
	// 						<div className="w-[35%] mr-[1%] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
	// 							{item.content}
	// 						</div>
	// 						<div className="w-[20%]">{item.member_name}</div>
	// 						<div className="w-[33%]">{item.created_at}</div>
	// 						<div className="w-[10%] text-center">✅ ❎</div>
	// 					</li>
	// 				),
	// 			)}
	// 		</ul>
	// 	);
	// };

	return (
		<AdminBody title={"Authentication"}>
			<AdminContentBlock title={"Pendings"} contents={renderPendings}/>
			{/* <AdminContentBlock title={"Appeals"} contents={renderAppeals}/> */}
		</AdminBody>
	);
};

export default Authentication;
