const printDateFormat = (date = null, isHourPrint = true) => {
    let dateString = new Date();
    if (date !== null) 
        dateString =  new Date(date);

    const hourFormat = isHourPrint ? {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    } : {}

    return dateString.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        ...hourFormat
        });
}

const calcWeek = (dueDate) => {
    const dayOfMonth = dueDate.getDate();
    const year = dueDate.getFullYear();
	const month = dueDate.getMonth(); // 0-based index

    const firstDayOfMonth = new Date(year, month, 1);
    const firstMonday = new Date(firstDayOfMonth);
    firstMonday.setDate(1 + ((8 - firstDayOfMonth.getDay()) % 7)); // 첫 월요일 찾기

    const weekNumber = Math.ceil((dayOfMonth - firstMonday.getDate() + 1) / 7);
    return weekNumber < 1 ? 0 : weekNumber; // 최소 주차는 0부터 시작
}

export {printDateFormat, calcWeek};
