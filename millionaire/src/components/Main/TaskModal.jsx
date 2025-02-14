import { X } from "lucide-react";
import { useState } from "react";
import AuthModal from "../AuthModal";

export default function TaskModal({ isOpen, onClose, task }) {
	const [showAuthModal, setShowAuthModal] = useState(false);

	if (!isOpen) return null;

	const isDueDateValid = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const dueDate = new Date(task.dueDate);
		dueDate.setHours(0, 0, 0, 0);

		return dueDate >= today;
	};

	const handleAuthClick = () => {
		if (isDueDateValid()) {
			setShowAuthModal(true);
		}
	};

	const handleAuthClose = () => {
		setShowAuthModal(false);
	};
	console.log(showAuthModal)
	return (
		<>
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
				<div className={"bg-white rounded-lg w-full max-w-md mx-4 relative" + (showAuthModal ? "hidden" : "")}>
					<button
						onClick={onClose}
						className="absolute right-4 top-4 p-1 hover:bg-gray-200 rounded-full transition-colors"
					>
						<X className="w-5 h-5 hover:text-black" />
					</button>

					<div
						className={`${task.type === "monthly" ? "bg-[#153E90]" : "bg-[#486EBA]"} p-6 rounded-t-lg`}
					>
						<div className="text-white">
							<div className="text-sm font-medium mb-1">
								Task {task.type?.slice(0, 19)}
							</div>
							<h2 className="text-xl font-bold">{task.content}</h2>
							<div>
								<span className="text-xs font-medium">
									Created at: {task.createdTime}
								</span>
							</div>
						</div>
					</div>

					<div className="p-6">
						<div className="space-y-4">
							<div>
								<div className="text-sm text-gray-500">Status</div>
								<div className="mt-1">
									<span
										className={`
                      px-2 py-1 rounded-full text-sm font-medium
                      ${
												task.status === "accept"
													? "bg-green-100 text-green-800"
													: task.status === "deny"
														? "bg-red-100 text-red-800"
														: task.status === "pend"
															? "bg-yellow-100 text-yellow-800"
															: "bg-gray-100 text-gray-800"
											}
                    `}
									>
										{task.status?.toUpperCase() || "PENDING"}
									</span>
								</div>
							</div>

							<div>
								<div className="text-sm text-gray-500">Due Date</div>
								<div className="font-medium text-gray-500">
									{new Date(task.dueDate).toLocaleDateString("ko-KR", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</div>
							</div>

							{/* 인증 버튼 추가 */}
							{isDueDateValid() && task.status !== "accept" && (
								<button
									onClick={handleAuthClick}
									className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									인증하기
								</button>
							)}
						</div>
					</div>
				</div>
				{/* AuthModal 조건부 렌더링 */}
				{showAuthModal && (
					<AuthModal task={task} onClose={handleAuthClose} />
				)}
			</div>
		</>
	);
}
