import { useState, useEffect } from "react";
import AdminContentBlock from "./AdminContentBlock";
import AdminBody from "./AdminBody";
import BASE_URL from "../constants/URL.js";

export default function MemberManage() {
	const [members, setMembers] = useState([]);
	const [joinRequests, setJoinRequests] = useState([]);

	const fetchMembers = async () => {
		try {
			const response = await fetch(`${BASE_URL}/groupmember/1`, {
				headers: {
					"Accept": "application/json",
					"ngrok-skip-browser-warning": true,
				},
				method: "GET",
			});
			const res = await response.json();
			setMembers(res.groupMembers);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchMembers();
	}, []);

	const gradeChange = async (memberId, status) => {
		try {
            const response = await fetch(`${BASE_URL}/groupmember`, {
                headers: {
                    "Accept": "application/json",
					"Content-Type": "application/json",
                    "ngrok-skip-browser-warning": true,
                },
                method: "PATCH",
				body:JSON.stringify({
					"groupId" : 1,
					"memberId" : memberId,
					"role" : status
				}),
            });
			if (response.ok){
				await fetchMembers();
			}
        } catch (error) {
            console.error(error);
        }
	}

	const memberDelete = (memberId) => {
		try {
            const response = fetch(`${BASE_URL}/groupmember`, {
                headers: {
                    "Accept": "application/json",
					"Content-Type": "application/json",
                    "ngrok-skip-browser-warning": true,
                },
                method: "DELETE",
				body:JSON.stringify({
					"groupId" : 1,
					"memberId" : memberId,
				}),
            });
			if (response.status === 200){
				setMembers();
			}
        } catch (error) {
            console.error(error);
        }
	}

	const renderMembers = () => {
		return (
			<ul className="text-[20px]">{
				members.map(
				(item) =>(
				<li key={item.id} className="flex m-2 hover:text-orange-400">
					<div className="w-[50%]">{item.name}</div>
					<div className="w-[20%]">{item.grade}</div>
					<button className="w-[9%] mr-2 px-1 bg-orange-400 hover:bg-orange-500 text-white text-[16px] rounded" onClick={()=>{gradeChange(item.memberId, "up")}}>승급</button>
					<button className="w-[9%] mr-2 px-1 bg-orange-500 hover:bg-orange-600 text-white text-[16px] rounded" onClick={()=>{gradeChange(item.memberId, "down")}}>강등</button>
            		<button className="w-[9%] mr-2 px-1 bg-orange-700 hover:bg-orange-800 text-white text-[16px] rounded" onClick={()=>{memberDelete(item.memberId)}}>탈퇴</button>
				</li>
				),
			)}
			</ul>
		)
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_URL}/groupjoin/1`, {
                    headers: {
                        "Accept": "application/json",
                        "ngrok-skip-browser-warning": true,
                    },
                    method: "GET",
                });
				const res = await response.json();
				setJoinRequests(res.groupJoinResponses);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
	
	const memberJoinOk = (memberId) => {
		try {
            const response = fetch(`${BASE_URL}/groupmember`, {
                headers: {
                    "Accept": "application/json",
					"Content-Type": "application/json",
                    "ngrok-skip-browser-warning": true,
                },
                method: "POST",
				body:JSON.stringify({
					"groupId" : 1,
					"memberId" : memberId,
				}),
            });
			if (response.status === 200){
				setMembers();
			}
        } catch (error) {
            console.error(error);
        }
	}

	const renderJoinRequests = () => {
		return (
			<ul className="text-[20px]">
				{joinRequests.map(
				(item) =>(
				<li key={item.id} className="flex m-2 hover:text-orange-400">
					<div className="w-[50%]">{item.name}</div>
					<div className="w-[40%]">{item.createdTime}</div>
					<button className="w-[10%] mr-2 px-1 bg-orange-400 hover:bg-orange-500 text-white text-[16px] rounded" onClick={()=>{memberJoinOk(item.memberId)}}>승인</button>
				</li>
				),
				)}
			</ul>
		)
	};
	return (
		<AdminBody title={"Member Management"}>
			<AdminContentBlock title={"Member"} contents={renderMembers}/>
			<AdminContentBlock title={"Join Request"} contents={renderJoinRequests}/>
		</AdminBody>
	);
}
