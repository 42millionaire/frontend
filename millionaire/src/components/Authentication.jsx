import { useEffect, useState } from "react";
import AdminContentBlock from "./AdminContentBlock.jsx";
import AdminBody from "./AdminBody.jsx";
import { getAPI } from "../apis/get.js";
import Modal from "./Modal.jsx";
import Li from "./Li.jsx";
import BASE_URL from "../constants/URL.js";

const Authentication = () => {
	const [pend, setPend] = useState([]);
	const [appeal, setAppeal] = useState([]);
	const [pendModalContent, setPendModalContent] = useState(null);
	const [appealModalContent, setAppealModalContent] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		fetchPend();
	}, []);
	
	const fetchPend = async () => {
		try {
			const data = await getAPI('task/pend/1');
			setPend(data.tasks);
		} catch (error) {
			console.error(error);
		}
	};
	
	const pendYes = (taskId) => {
		try {
            const response = fetch(`${BASE_URL}/task/status`, {
                headers: {
                    "Accept": "application/json",
					"Content-Type": "application/json",
                    "ngrok-skip-browser-warning": true,
                },
                method: "PATCH",
				body:JSON.stringify({
					"taskId": taskId, // {} 안에 taskId만 전달
					"status": "accept"
				}),
            });
			const tmp = [];
			for (let i = 0; i < pend.length; i++) {
				if (pend[i].taskId !== taskId)
					tmp.push(pend[i]);
				setPend(tmp);
			}
            console.log(response);
        } catch (error) {
            console.error(error);
        }
	}

	const pendNo = (taskId) => {
		try {
            const response = fetch(`${BASE_URL}/task/status`, {
                headers: {
					"Accept": "application/json",
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": true,
                },
                method: "PATCH",
				body:JSON.stringify({
					"taskId" : taskId,
					"status" : "deny"
				}),
            });
            console.log(response);
			if (response.status === 200){
				const tmp = [];
				for (let i = 0; i < pend.length; i++) {
					if (pend[i].taskId !== taskId)
						tmp.push(pend[i]);
				}
				setPend(tmp);
			}
        } catch (error) {
            console.error(error);
        }
	}

	const renderPendings = () => {
		return (
			<ul>
				{pend.map(
					(item) =>(
						<Li key={item.taskId} item={item} openModal={fetchPendModal} yes={pendYes} no={pendNo} id={item.taskId}/>
					),
				)}
			</ul>
		);
	};

	useEffect(() => {
		fetchAppeal();
	}, []);

	const fetchAppeal = async () => {
		try {
			const data = await getAPI('appeal/1');
			setAppeal(data.appeals);
		} catch (error) {
			console.error(error);
		}
	};

	const appealYes = (appealId) => {
		try {
            const response = fetch(`${BASE_URL}/appeal`, {
                headers: {
                    "Accept": "application/json",
					"Content-Type": "application/json",
                    "ngrok-skip-browser-warning": true,
                },
                method: "PATCH",
				body:JSON.stringify({
					"appealId" : appealId,
					"status" : "accept"
				}),
            });
            console.log(response);
			const tmp = [];
			for (let i = 0; i < appeal.length; i++) {
				if (appeal[i].appealId !== appealId)
					tmp.push(appeal[i]);
				setAppeal(tmp);
			}
        } catch (error) {
            console.error(error);
        }
	}

	const appealNo = (appealId) => {
		try {
            const response = fetch(`${BASE_URL}/appeal`, {
                headers: {
                    "Accept": "application/json",
					"Content-Type": "application/json",
                    "ngrok-skip-browser-warning": true,
                },
                method: "PATCH",
				body:JSON.stringify({
					"appealId" : appealId,
					"status" : "deny"
				}),
            });
            console.log(response);
			const tmp = [];
			for (let i = 0; i < appeal.length; i++) {
				if (appeal[i].appealId !== appealId)
					tmp.push(appeal[i]);
				setAppeal(tmp);
			}
        } catch (error) {
            console.error(error);
        }
	}

	const renderAppeals = () => {
		return (
			<ul className="text-[17px]">
				{appeal.map(
					(item) =>(
						<Li key={item.taskId} item={item} openModal={fetchAppealModal} yes={appealYes} no={appealNo} id={item.appealId}/>
					),
				)}
			</ul>
		);
	};
	
	useEffect(()=>{
		if (pendModalContent !== null)
			setIsOpen(true);
	},[pendModalContent])

	const fetchPendModal = async (taskId, content, time) =>{
		try {
			const data = await getAPI(`verification/${taskId}`);
			console.log(data);
			setPendModalContent(
				<div className="text-black">
					<h1 className="mb-[10px] text-[20px]">{content}</h1>
					<div className="text-[12px]">created at: {data.createdTime}</div>
					<div className="text-[12px]">updated at: {data.updatedTime}</div>
					<hr className="mt-[10px] mb-[10px]"></hr>
					<div className="mt-[5px] text-black border border-black rounded-lg p-[5px] overflow-auto h-[400px]">
						<div className="mb-[10px]">{data.content}</div>
						{data.base64Images.map(
							(item) =>(
								<img src={`data:image/png;base64,${item}`}/>
							),
						)}
					</div>
				</div>
			);
		} catch (error) {
			console.error(error);
		}
	}
	
	useEffect(()=>{
		if (appealModalContent !== null)
			setIsOpen(true);
	},[appealModalContent])
	
	const fetchAppealModal = async (taskId, content, time) =>{
		try {
			const verifcation = await getAPI(`verification/${taskId}`);
			const task = await getAPI(`task/${taskId}`);
			console.log(verifcation);
			setAppealModalContent(
				<div className="text-black">
					<h1 className="mb-[10px] text-[20px]">이의제기내용: {content}</h1>
					<div className="text-[12px]">created at: {time}</div>
					<div className="text-[12px]">{task.memberName}</div>
					<div className="mt-[5px] text-black border border-black rounded-lg p-[5px] overflow-auto h-[400px]">
						<h1 className="mb-[10px] text-[20px]">{verifcation.title}</h1>
						<div className="text-[12px]">created at: {task.createdTime}</div>
						<div className="text-[12px]">updated at: {task.updatedTime}</div>
						<div className="text-[12px]">verificated at: {verifcation.updatedTime}</div>
						<div className="text-[12px]">due date: {task.dueDate}</div>
						<hr className="mt-[10px] mb-[10px]"></hr>
						<div>
							<div className="mb-[10px]">{verifcation.content}</div>
							{verifcation.base64Images.map(
								(item) =>(
									<img src={`data:image/png;base64,${item}`}/>
								),
							)}
						</div>
					</div>
				</div>
			);
		} catch (error) {
			console.error(error);
		}
	}
	
	const closeModal = () => {
		setIsOpen(false);
		setPendModalContent(null);
		setAppealModalContent(null);
	}
	
	return (
		<AdminBody title={"Authentication"}>
			<AdminContentBlock title={"인증 대기"} contents={renderPendings} />
			<AdminContentBlock title={"이의 제기"} contents={renderAppeals}/>
			<Modal isOpen={isOpen} onClose={closeModal}>{pendModalContent}{appealModalContent}</Modal>
		</AdminBody>
	);
};

export default Authentication;
