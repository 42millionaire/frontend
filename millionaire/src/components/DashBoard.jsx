import { useState } from "react";
import { useEffect } from "react";
import AdminContentBlock from "./AdminContentBlock";
import AdminBody from "./AdminBody";
import BASE_URL from "../constants/URL.js";

export default function DashBoard() {
	const [penalties, setPenalties] = useState([]);
	const [dailyPenalty, setDailyPenalty] = useState("");
	const [weeklyPenalty, setWeeklyPenalty] = useState("");
	const [monthlyPenalty, setMonthlyPenalty] = useState("");
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth() + 1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_URL}/groupmember/penalty?groupId=1&year=${year}&month=${month}`, {
                    headers: {
                        "Accept": "application/json",
                        "ngrok-skip-browser-warning": true,
                    },
                    method: "GET",
                });
				const res = await response.json();
				setPenalties(res.members);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [month, year]);
	
	const renderPenalties = () => {
		return (
			<ul className="text-[20px]">{
				penalties.map(
				(item) =>(
				<li key={item.id} className="flex hover:text-orange-400">
					<div className="w-[80%]">{item.memberName}</div>
					<div className="w-[20%]">{item.penalty}</div>
				</li>
				),
				)}
			</ul>
		)
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_URL}/group/penalty/1`, {
                    headers: {
                        "Accept": "application/json",
                        "ngrok-skip-browser-warning": true,
                    },
                    method: "GET",
                });
				const res = await response.json();
				setDailyPenalty(res.dailyPenalty);
				setWeeklyPenalty(res.weeklyPenalty);
				setMonthlyPenalty(res.monthlyPenalty);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const eachPenalty = (title, fine, onchange) => {
		return (
			<li className="flex">
					<div className="w-[80%]">{title}</div>
					<div className="w-[20%]">
						<input
							className="w-[95%] bg-gray-200 text-right rounded-md text-gray-500 m-0.5"
							id="amount"
							type="number"
							value={fine}
							onChange={(e)=>{onchange(e.target.value)}}
							min="0"
							step="100"
						/>
					</div>
			</li>
		)
	};

	const renderPenaltyAmount = () => {
		return (
			<ul className="text-[20px]">
				{eachPenalty("Daily Penalty", dailyPenalty, setDailyPenalty)}
				{eachPenalty("Weekly Penalty", weeklyPenalty, setWeeklyPenalty)}
				{eachPenalty("Monthly Penalty", monthlyPenalty, setMonthlyPenalty)}
			</ul>
		)
	};

	const updatePenalties = () => {
		return (
			<button className="w-[90px] m-1 p-1 rounded-md bg-green-600 text-white hover:bg-green-700" onClick={buttonClick}>업데이트</button>
		)
	};

	const buttonClick = () => {
		try {
            const response = fetch(`${BASE_URL}/group/penalty`, {
                headers: {
                    "Accept": "application/json",
					"Content-Type": "application/json",
                    "ngrok-skip-browser-warning": true,
                },
                method: "POST",
				body:JSON.stringify({
					"groupId" : 1,
					"monthlyPenalty" : monthlyPenalty,
					"weeklyPenalty" : weeklyPenalty,
					"dailyPenalty" : dailyPenalty
				}),
            });
        } catch (error) {
            console.error(error);
        }
	};

	const monthSelector = () => {
		return (
			<div className="flex justify-between w-[180px]">
				<button className="font-bold hover:text-blue-400" onClick={()=>{setYear(year - 1)}}>{"<<"}</button>
				<button className="font-bold hover:text-gray-500" onClick={()=>{if(month===1){setYear(year-1);setMonth(12);}else{setMonth(month - 1)}}}>{"<"}</button>
				<p className="w-[45%] p-2 text-center">{year}-{month}</p>
				<button className="font-bold hover:text-orange-400" onClick={()=>{if(month===12){setYear(year + 1);setMonth(1)}else{setMonth(month + 1)}}}>{">"}</button>
				<button className="font-bold hover:text-green-400" onClick={()=>{setYear(year + 1)}}>{">>"}</button>
			</div>
		)
	}

	return (
		<AdminBody title={"Dash Board"}>
			<AdminContentBlock title={"벌금 액수 관리"} contents={renderPenaltyAmount} topbutton={updatePenalties}/>
			<AdminContentBlock title={"월별 벌금 현황"} contents={renderPenalties} topbutton={monthSelector}/>
		</AdminBody>
	);
}
