const calcCards = (cards) => {
	const weeklyCards = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
	const monthlyCards = [];

	cards.forEach((card) => {
		const dueDate = new Date(card.dueDate);
		const dayOfMonth = dueDate.getDate();
		const firstDay = new Date(dueDate.getFullYear(), dueDate.getMonth(), 1);
		const firstSunDay = 1 + ((7 - firstDay.getDay()) % 7);
		const weekCalc = Math.floor((dayOfMonth - firstSunDay) / 7);
		const weekNumber = 1 + (weekCalc < 0 ? 0 : weekCalc + 1);

		if (card.type === "monthly") {
			monthlyCards.push(card);
		} else {
			weeklyCards[weekNumber].push(card);
		}
	});

	return { weeklyCards, monthlyCards };
};

const sortCards = (cards) => {
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
