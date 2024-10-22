import { useState } from "react";
import { useEffect } from "react";
import PAGE_TITLES from "../constants/PAGE_TITLES.js";
import BASE_URL from "../constants/URL.js";

const Sidebar = ({ setPage }) => {
	const [groupName, setGroupName] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_URL}/group/1`, {
                    headers: {
                        "Accept": "application/json",
                        "ngrok-skip-browser-warning": true,
                    },
                    method: "GET",
                });
				const res = await response.json();
				setGroupName(res.groupName);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []); 
	return (
	<div className="w-[23%] mt-[20px] ml-[20px] mr-[10px]">
		<h1 className="mb-[50px] mt-[20px] text-[30px]">{groupName}</h1>
		<nav>
			<ul className="text-[20px]">
				{Object.entries(PAGE_TITLES).map(([key, title]) => (
					<li key={key} onClick={() => setPage(key)} className="mb-[20px] hover:text-orange-400 cursor-pointer  w-fit">
						{title}
					</li>
				))}
				<a href="/" className="hover:text-orange-400">Admin out</a>
			</ul>
		</nav>
	</div>
	)
};

export default Sidebar;
