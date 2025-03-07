import { calcWeek, printDateFormat } from "../dateUtils";

function getTotalWeeksInMonth(year, month) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0); // 해당 월의 마지막 날짜
    // 첫 번째 월요일 찾기
    const firstMonday = new Date(firstDayOfMonth);
    firstMonday.setDate(1 + ((8 - firstDayOfMonth.getDay()) % 7));

    // 주차 계산: (마지막 날 - 첫 월요일) / 7 -> 올림 처리
    const totalWeeks = Math.ceil((lastDayOfMonth.getDate() - firstMonday.getDate() + 1) / 7);
    
    return totalWeeks;
}

const calcCards = (cards, selectedMonth) => {
	const weeklyCards = { 1: [], 2: [], 3: [], 4: [] };
	const monthlyCards = [];
	const imminentCards = [];
	const today = printDateFormat(null, false);

	cards.forEach((card) => {
		const dueDate = new Date(card.dueDate);
		const year = dueDate.getFullYear();
		const month = dueDate.getMonth(); // 0-based index
		
		let weekNumber = calcWeek(dueDate);
		weekNumber = weekNumber === 0 ? 1 : weekNumber;

		const lastWeek = getTotalWeeksInMonth(year, month);
		
		if (!weeklyCards[lastWeek]) {
			weeklyCards[lastWeek] = [];
		}

		if (today === printDateFormat(dueDate, false) && card.status === "none") {
			imminentCards.push(card);
		}

		if (card.type === "monthly") {
            monthlyCards.push(card);
        } else {
            if (card.type === "weekly" && selectedMonth < month + 1) {
                weekNumber = lastWeek;
            }

            if (!weeklyCards[weekNumber]) {
                weeklyCards[weekNumber] = [];
            }

            weeklyCards[weekNumber].push(card);
        }
	});

	return { weeklyCards, monthlyCards, imminentCards };

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
