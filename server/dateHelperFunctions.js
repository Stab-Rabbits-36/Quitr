const formatDate = dateObj => {
    //converts date object to this format: '2022/09/22 06:00' (ex)
    const timeStamp = new Date(); //Oi, Remember that date object month is 0 based, so "09" is October
    let day = timeStamp.getUTCDate().toString();
    let month = (timeStamp.getUTCMonth() + 1).toString();
    const year = timeStamp.getUTCFullYear().toString();
    if (day.length < 2) day = `0${day}`;
    if (month.length < 2) month = `0${month}`;
    return `${year}/${month}/${day}`;
  };
  
const calculateDayDiff = (oldDate, newDate) => {
    //calculates difference down to the day & hour between formatted dates innit
    //returns an object!
    //format: (ex) '2022/09/22 06:00'
    const oldDateDay = Number(oldDate[8] + oldDate[9]);
    const newDateDay = Number(newDate[8] + newDate[9]);

    const oldDateMonth = Number(oldDate[5] + oldDate[6]);
    const newDateMonth = Number(newDate[5] + newDate[6]);

    const oldDateHour = Number(oldDate[11] + oldDate[12]);
    const newDateHour = Number(newDate[11] + newDate[12]);

    const hourDifference = newDateHour - oldDateHour;
    const daysDifference = newDateDay - oldDateDay;
    const monthDifference = newDateMonth - oldDateMonth;

    return {
        days: daysDifference + monthDifference * 30,
        hours: hourDifference,
    };
};

module.exports = {formatDate, calculateDayDiff};