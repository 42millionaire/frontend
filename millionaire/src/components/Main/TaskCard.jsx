const TaskCard = ({ task }) => {
	const getBackgroundColor = () => {
		if (task.status === "accept") return "bg-green-600/80";
		else if (task.status === "deny") return "bg-red-600/80";
		else if (task.status === "pend") return "bg-yellow-600/80";
		else {
			return task.type === "monthly" ? "bg-[#153E90]/80" : "bg-[#486EBA]/80";
		}
	};

	const backgroundColor = getBackgroundColor();

	return (
		<div
			className={`p-4 m-2 rounded-lg ${backgroundColor} relative overflow-hidden`}
		>
			<div className="absolute inset-0 flex items-center justify-center text-white opacity-10 pointer-events-none">
				<div className="text-4xl font-bold uppercase whitespace-normal text-center">
					{task.type}
				</div>
			</div>
			<div className="relative z-10 text-white">
				<h3 className="font-bold">{task.content}</h3>
				<p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
			</div>
		</div>
	);
};

export default TaskCard;
