import { useEffect, useState } from "react";

const Authentication = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("../data/authentication.json", {
					headers: {
						"Content-Type": "application/json",
					},
				});
				const res = await response.json();
				setData(res.task);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const renderData = () => {
		return data.map(
			(item) =>
				item.status === "pend" && (
					<li key={item.id} className="flex">
						<div className="w-[35%] mr-[1%] whitespace-nowrap overflow-hidden text-ellipsis">
							{item.content}
						</div>
						<div className="w-[20%]">{item.member_name}</div>
						<div className="w-[33%]">{item.created_time}</div>
						<div className="w-[10%] text-center">✅ ❎</div>
					</li>
				),
		);
	};

	return (
		<div className="w-[65%] mt-[20px]">
			<h1 className="mb-[10px] text-[40px]">Authentication</h1>
			<div className="mb-[50px] w-[100%]">
				<h1 className="text-[25px]">Task</h1>
				<hr className="mb-[5px]"></hr>
				<ul className="text-[20px]">{renderData()}</ul>
			</div>
			<div className="w-[100%]">
				<h1 className="text-[25px]">Appeels</h1>
				<hr className="mb-[5px]"></hr>
				<ul className="text-[20px]">
					<li className="flex">
						<div className="w-[35%]">토익 단어 100개 외우기</div>
						<div className="w-[20%]">younghyle</div>
						<div className="w-[33%]">2024.09.03 23:02</div>
						<div className="w-[10%] text-center">✅ ❎</div>
					</li>
					<li className="flex">
						<div className="w-[35%]">편입수학 편미분</div>
						<div className="w-[20%]">phan</div>
						<div className="w-[33%]">2024.09.03 23:02</div>
						<div className="w-[10%] text-center">✅ ❎</div>
					</li>
					<li className="flex">
						<div className="w-[35%]">주지스 마스터</div>
						<div className="w-[20%]">hcho2</div>
						<div className="w-[33%]">2024.09.03 23:02</div>
						<div className="w-[10%] text-center">✅ ❎</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Authentication;
