export const useGetData = () => {
    const monthInAYear = new Date().getMonth();
    const MONTH_YEAR__EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const MONTH_YEAR__UA = ["Січня", "Лютого", "Березеня", "Квітня", "Травеня", "Червеня", "Липня", "Серпеня", "Вересеня", "Жовтня", "Листопада", "Грудня"];
    const WEEK_DAYS__EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const WEEK_DAYS__UA = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
    const dayInAWeek = new Date().getDay();
    const currentDayEn = WEEK_DAYS__EN[dayInAWeek];
    const currentDayUa = WEEK_DAYS__UA[dayInAWeek];
    const currentDayOfMonth = new Date().getDate();
    const currentMonthNameEn = MONTH_YEAR__EN[monthInAYear];
    const currentMonthNameUa = MONTH_YEAR__UA[monthInAYear];

    return [currentDayEn, currentDayUa, currentDayOfMonth, currentMonthNameEn, currentMonthNameUa]
}