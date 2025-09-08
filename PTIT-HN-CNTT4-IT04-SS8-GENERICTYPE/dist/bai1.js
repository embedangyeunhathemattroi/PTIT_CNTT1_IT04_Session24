var WeekDays;
(function (WeekDays) {
    WeekDays["Monday"] = "Thu Hai";
    WeekDays["Tuesday"] = "Thu Ba";
    WeekDays["Wednesday"] = "Thu Tu";
    WeekDays["Thursday"] = "Thu Nam";
    WeekDays["Saturday"] = "Thu Bay";
    WeekDays["Sunday"] = "Chu Nhat";
})(WeekDays || (WeekDays = {}));
//ham generic in dsach 
function printList(items) {
    items.forEach(item => console.log(item));
}
//lay tat ca gtri trong enum
const weekDaysList = Object.values(WeekDays);
printList(weekDaysList);
