import { useState } from "react";
import AdminContentBlock from "./AdminContentBlock";
import AdminBody from "./AdminBody";

export default function DashBoard() {
	const [noticeContent, setNoticeContent] = useState("");
	const handleClick = () => {
		console.log("HELLO");
	};

	const noticeBox = () =>{
		return (
			<>
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
			</>
		)
	}
	return (
		<AdminBody title={"Notice Board"}>
			<AdminContentBlock className={"w-[80%]"} title={"Notice"} contents={noticeBox}/>
		</AdminBody>
	);
}
