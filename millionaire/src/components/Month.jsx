export default function Month({ selectedMonth, setSelectedMonth }) {
	const months = Array.from({ length: 12 }, (_, i) => i + 1);

	return (
		<div className="flex items-center bg-gray-800 rounded-lg overflow-hidden mx-4">
			{months.map((month) => (
				<button
					key={month}
					className={`px-3 py-2 text-[30px] ${
						selectedMonth === month
							? "bg-blue-600 text-white"
							: "text-gray-300 hover:bg-gray-700"
					}`}
					onClick={() => setSelectedMonth(month)}
				>
					{month}
				</button>
			))}
		</div>
	);
}
