function getTotalWeeksInMonth(year, month) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0); // 해당 월의 마지막 날짜

	console.log("getTotalweeksinmonth: ", firstDayOfMonth, ", ",lastDayOfMonth);
    // 첫 번째 월요일 찾기
    const firstMonday = new Date(firstDayOfMonth);
    firstMonday.setDate(1 + ((8 - firstDayOfMonth.getDay()) % 7));

    // 주차 계산: (마지막 날 - 첫 월요일) / 7 -> 올림 처리
    const totalWeeks = Math.ceil((lastDayOfMonth.getDate() - firstMonday.getDate() + 1) / 7);
    
    return totalWeeks;
}

const calcCards = (cards, selectedMonth) => {
	const weeklyCards = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
	const monthlyCards = [];

	cards.forEach((card) => {
		const dueDate = new Date(card.dueDate);
		const year = dueDate.getFullYear();
		const month = dueDate.getMonth(); // 0-based index
		const dayOfMonth = dueDate.getDate();

		const firstDayOfMonth = new Date(year, month, 1);
		const firstMonday = new Date(firstDayOfMonth);
		firstMonday.setDate(1 + ((8 - firstDayOfMonth.getDay()) % 7)); // 첫 월요일 찾기

		let weekNumber = Math.ceil((dayOfMonth - firstMonday.getDate() + 1) / 7);
		weekNumber = weekNumber < 1 ? 1 : weekNumber; // 최소 주차는 1부터 시작

		if (card.type === "monthly") {
			monthlyCards.push(card);
		} else if (card.type === "weekly" && selectedMonth < month + 1) {
			weekNumber = getTotalWeeksInMonth(year, selectedMonth);
			console.log("weeknumber: ", weekNumber);
			console.log("weekNumber: ", weekNumber);
			weeklyCards[weekNumber].push(card);
		} else {
			weeklyCards[weekNumber].push(card);
		}
	});

	return { weeklyCards, monthlyCards };

};

const sortCards = (cards, selectedMonth) => {
	const compareStatus = (a, b) => {
		if (a.status === "none" && b.status !== "none") return -1;
		if (a.status !== "none" && b.status === "none") return 1;
		return 0;
	};

	const compareDate = (a, b) => new Date(a.dueDate) - new Date(b.dueDate);

	const compareType = (a, b) => {
		if (a.type === "weekly" && b.type !== "weekly") return -1;
		if (a.type !== "weekly" && b.type === "weekly") return 1;
		return 0;
	};

	return cards.sort((a, b) => {
		if (a.type === b.type) {
			const statusComparison = compareStatus(a, b);
			return statusComparison !== 0 ? statusComparison : compareDate(a, b);
		}
		return compareType(a, b);
	});
};

export { calcCards, sortCards };
