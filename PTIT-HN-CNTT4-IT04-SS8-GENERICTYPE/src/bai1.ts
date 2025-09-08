enum WeekDays{
    Monday="Thu Hai",
    Tuesday="Thu Ba",
    Wednesday="Thu Tu",
    Thursday="Thu Nam",
    Saturday="Thu Bay",
    Sunday="Chu Nhat"
}

//ham generic in dsach 
function printList<T>(items:T[]):void {
    items.forEach(item =>console.log(item)); 
}
//lay tat ca gtri trong enum
const weekDaysList:string[]=Object.values(WeekDays);
printList<string>(weekDaysList);