export default function TaskAddButton({ onAddTask }) {
	return (
		<div className="fixed bottom-4 right-4">
			<button
				onClick={onAddTask}
				className="w-40 h-12 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
			>
				Add Task
			</button>
		</div>
	);
}
