export default function Month({ selectedMonth, setSelectedMonth }) {
	const months = Array.from({ length: 12 }, (_, i) => i + 1);

	return (
		<div className="bg-[#1E293B] text-[#E2E8F0] flex items-center rounded-lg overflow-hidden mx-4">
			{months.map((month) => (
				<button
					key={month}
					className={`px-3 py-2 text-[30px] ${
						selectedMonth === month
							? "bg-[#0F52BA] text-white"
							: "bg-[#1E293B] hover:bg-[#334155]"
					}`}
					onClick={() => setSelectedMonth(month)}
				>
					{month}
				</button>
			))}
		</div>
	);
}
