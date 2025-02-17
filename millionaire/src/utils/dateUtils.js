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

export {printDateFormat};
