import { Fragment, useState, useEffect } from "react";
import AdminContentBlock from "./AdminContentBlock";
import AdminBody from "./AdminBody";
import { getAPI } from "../apis/get.js";
import BASE_URL from "../constants/URL.js";

export default function DashBoard() {
	const [noticeContent, setNoticeContent] = useState("");

	useEffect(() => {
		fetchNotice();
	}, []);
	
	const fetchNotice = async () => {
		try {
			const data = await getAPI('group/notice/1');
			console.log(data);
			setNoticeContent(data.notice);
		} catch (error) {
			console.error(error);
		}
	};
	const handleClick = () => {
		try {
            const response = fetch(`${BASE_URL}/group/notice`, {
                headers: {
                    "Accept": "application/json",
					"Content-Type": "application/json",
                    "ngrok-skip-browser-warning": true,
                },
                method: "POST",
				body:JSON.stringify({
					"groupId" : 1,
					"notice" : noticeContent
				}),
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
	};

	const noticeBox = () =>{
		return (
			<Fragment>
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
			</Fragment>
		)
	}
	return (
		<AdminBody title={"Notice Board"}>
			<AdminContentBlock className={"w-[90%]"} title={"Notice"} contents={noticeBox}/>
		</AdminBody>
	);
}
