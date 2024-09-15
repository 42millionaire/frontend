import { useState } from "react";

export default function DashBoard() {
	const [noticeContent, setNoticeContent] = useState("");
	const handleClick = () => {
		console.log("HELLO");
	};
	return (
		<div className="w-[55%] mt-[20px]">
			<h1 className="mb-[10px] text-[40px]">Notice Board</h1>
			<div className="w-[100%] mb-[50px]">
				<h1 className="text-[25px]">Notice</h1>
				<hr className="mb-[5px]" />
				<p>
					<textarea
						className="w-[100%] h-[300px] bg-black"
						name="notice"
						placeholder="Notice"
						value={noticeContent}
						maxLength={300}
						onChange={(e) => setNoticeContent(e.target.value)}
					/>
				</p>
				<div className="flex justify-end items-center mt-2">
					<span className="mr-4">{noticeContent.length} / 300</span>
					<button
						className="border-[2px] rounded-[10px] px-4 py-1 text-sm"
						onClick={handleClick}
					>
						Notify
					</button>
				</div>
			</div>
		</div>
	);
}
